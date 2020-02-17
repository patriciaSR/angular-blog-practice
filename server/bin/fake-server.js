const MongoClient = require('mongodb').MongoClient;
const { main } = require('../appServer');
const util = require('util');
const path = require('path');

const exec = util.promisify(require('child_process').exec);

// Alternatively you can use CommonJS syntax:
// require('./commands')
async function run() {
  const dbName = 'blogDB-fake';
  const url = `mongodb://localhost:27017/${dbName}`;
  const cwd = path.resolve(__dirname, '..');

  await exec(`mongo ${dbName} --eval "printjson(db.dropDatabase())"`);
  await exec(`mongoimport --uri=${url} --collection=users --file=./tests/fixtures/DB/users.json`, { cwd });
  await exec(`mongoimport --uri=${url} --collection=posts --file=./tests/fixtures/DB/posts.json`, { cwd });
  await exec(`mongoimport --uri=${url} --collection=comments --file=./tests/fixtures/DB/comments.json`, { cwd });
  await exec(`mongoimport --uri=${url} --collection=offensiveWords --file=./tests/fixtures/DB/offensiveWords.json`, { cwd });

  const connection = await MongoClient.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  main(connection);
}

run();
