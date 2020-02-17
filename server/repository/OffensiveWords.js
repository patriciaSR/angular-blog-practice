module.exports = class OffensiveWords {
  constructor(connection) {
    this.connection = connection;
    this.collection = this.connection.db().collection('offensiveWords');
  }

  addWord(newWord) {
    // Save resource
    return this.collection.insertOne(newWord);
  }

  addDefaultWords(defaultWords) {
    // Save default words
    return this.collection.insertMany(defaultWords);
  }

  getAllWords() {
    // Find all words
    return this.collection.find().toArray();
  }

  findWord(wordName) {
    // Find words by wordName
    return this.collection.findOne({ word: wordName });
  }

  updateWord(wordName, newWord) {
    // Create new object with needed fields and assign wordName
    return this.collection.updateOne({ word: wordName }, { $set: newWord });
  }

  deleteWord(wordName) {
    // Delete word by wordName
    return this.collection.deleteOne({ word: wordName });
  }
};
