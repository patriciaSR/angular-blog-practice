const ObjectId = require('mongodb').ObjectId;

module.exports = class Posts {
  constructor(connection) {
    this.connection = connection;
    this.collection = this.connection.db().collection('posts');
  }

  addPost(post) {
    // Save resource
    return this.collection.insertOne(post);
  }

  getAllPosts() {
    // Find all resources
    return this.collection.find().toArray();
  }

  getUserPost(userID) {
    // Find resource by _id
    return this.collection.find({ userID: new ObjectId(userID) }).toArray();
  }

  getPost(id) {
    // Find resource by _id
    return this.collection.findOne({ _id: new ObjectId(id) });
  }

  updatePost(id, post) {
    // Create new object with needed fields and assign id
    return this.collection.updateOne({ _id: new ObjectId(id) }, { $set: post });
  }

  deletePost(id) {
    // Delete resource by _id
    return this.collection.deleteOne({ _id: new ObjectId(id) });
  }

  deleteAllPost() {
    // Delete resource by _id
    return this.collection.deleteMany();
  }
};
