const express = require('express');

const offensiveRouter = express.Router();

const repository = require('../repository');

offensiveRouter.post('/', async (req, res) => {
  const newWord = req.body;
  newWord.word = newWord.word.toLowerCase();
  const { word, level } = newWord;

  const isWordIncluded = await repository.offensiveWords.findWord(word);

  if (!word || !level) {
    res.status(400).json('Fill required fields');
  } else if (isWordIncluded) {
    res.status(400).json('This word already exist on DB');
  } else if (level <= 0 || level > 5) {
    res.status(400).json('Select a word level between 1 and 5');
  } else {
    await repository.offensiveWords.addWord(newWord);
    res.status(200).json(newWord);
  }
});

offensiveRouter.get('/', async (req, res) => {
  const allWords = await repository.offensiveWords.getAllWords();
  res.status(200).json(allWords);
});

offensiveRouter.delete('/:wordName', async (req, res) => {
  const wordName = req.params.wordName;
  const word = await repository.offensiveWords.deleteWord(wordName);

  if (!word) {
    res.sendStatus(404);
  } else {
    res.status(200).json(word);
  }
});

offensiveRouter.put('/:wordName', async (req, res) => {
  const wordName = req.params.wordName;
  const findWord = await repository.offensiveWords.findWord(wordName);

  if (!findWord) {
    res.sendStatus(404);
  } else {
    const wordReq = req.body;
    const { word, level } = wordReq;

    if (!word || !level) {
      res.status(400).send('Fill required fields');
    } else if (level <= 0 || level > 5) {
      res.status(400).send('Select a word level between 1 and 5');
    } else {
      await repository.offensiveWords.updateWord(wordName, wordReq);
      res.status(200).json(wordReq);
    }
  }
});

module.exports = offensiveRouter;
