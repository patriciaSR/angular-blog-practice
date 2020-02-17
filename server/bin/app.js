const MongoClient = require('mongodb').MongoClient;

const { main } = require('../appServer');

async function run() {
  const url = 'mongodb://localhost:27017/blogDB';
  const connection = await MongoClient.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  main(connection);
}

run();
