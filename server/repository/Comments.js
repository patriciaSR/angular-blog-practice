const ObjectId = require('mongodb').ObjectId;

module.exports = class Comments {
  constructor(connection) {
    this.connection = connection;
    this.collection = this.connection.db().collection('comments');
  }

  addComment(comment) {
    // Save resource
    return this.collection.insertOne(comment);
  }

  getCommentsPost(postID) {
    // Find comment's Post by postID
    return this.collection.find({ postID: new ObjectId(postID) }).toArray();
  }

  findComment(id) {
    // Find comment by _id
    return this.collection.findOne({ _id: new ObjectId(id) });
  }

  updateComment(id, comment) {
    // Create new object with needed fields and assign id
    return this.collection.updateOne({ _id: new ObjectId(id) }, { $set: comment });
  }

  deleteComment(id) {
    // Delete comment by _id
    return this.collection.deleteOne({ _id: new ObjectId(id) });
  }

  deleteComentsPostById(postID) {
    // Delete all comments's post by postID
    return this.collection.deleteMany({ postID });
  }
};
