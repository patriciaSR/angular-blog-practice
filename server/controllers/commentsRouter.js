const express = require('express');
const passport = require('passport');

const commentsRouter = express.Router({ mergeParams: true });

const ObjectId = require('mongodb').ObjectId;

const repository = require('../repository');

const haveOffensiveWords = require('../utils/validator');


commentsRouter.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const comment = req.body;
  comment.userID = req.user._id;
  comment.postID = new ObjectId(req.params.id);
  comment.date = new Date();
  const { content, userID } = comment;

  const offensiveWords = await repository.offensiveWords.getAllWords();
  const notAllowedWords = haveOffensiveWords(content, offensiveWords);

  if (!content && !userID) {
    res.sendStatus(400);
  } else if (notAllowedWords.length !== 0) {
    const errorText = 'Your comment cannot contain offensive words';
    res.status(403).json({ errorText, notAllowedWords });
  } else {
    await repository.comments.addComment(comment);
    res.status(200).json(comment);
  }
});

commentsRouter.delete('/:commentID', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const postID = req.params.id;
  const commentID = req.params.commentID;
  const reqUserID = req.user._id.toString();

  const post = await repository.posts.getPost(postID);
  const postUserID = post.userID.toString();

  const comment = await repository.comments.findComment(commentID);

  if (!comment) {
    res.sendStatus(404);
  } else {
    const commentUserID = comment.userID.toString();

    if (req.user.role === 'admin' || reqUserID === postUserID || reqUserID === commentUserID) {
      const deletedComment = await repository.comments.deleteComment(commentID);

      if (!deletedComment) {
        res.sendStatus(404);
      } else {
        res.status(200).json(deletedComment);
      }
    } else {
      res.status(401).send('You are not allowed to delete this comment');
    }
  }
});

commentsRouter.put('/:commentID', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const commentID = req.params.commentID;
  const newComment = req.body.content;
  const reqUserID = req.user._id.toString();

  const comment = await repository.comments.findComment(commentID);

  if (!comment) {
    res.sendStatus(404);
  } else {
    const commentUserID = comment.userID.toString();

    const offensiveWords = await repository.offensiveWords.getAllWords();
    const notAllowedWords = haveOffensiveWords(newComment, offensiveWords);

    if (req.user.role === 'admin' || reqUserID === commentUserID) {
      if (notAllowedWords.length !== 0) {
        const errorText = 'Your comment cannot contain offensive words';
        res.status(403).json({ errorText, notAllowedWords });
      } else {
        const commentReq = req.body;
        commentReq.userID = req.user._id;
        commentReq.date = new Date();
        const { content, userID } = commentReq;

        if (!content && !userID) {
          res.sendStatus(400);
        } else {
          await repository.comments.updateComment(commentID, commentReq);
          commentReq._id = commentID;
          res.status(200).json(commentReq);
        }
      }
    } else {
      res.status(401).send('You are not allowed to edit this comment');
    }
  }
});

module.exports = commentsRouter;
