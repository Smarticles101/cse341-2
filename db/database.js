const dotenv = require("dotenv");
const MongoClient = require("mongodb").MongoClient;

dotenv.config();

let db;

const init = (cb) => {
  if (db) {
    console.log("Database is already initialized!");
    return cb(null, db);
  }

  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      db = client;
      cb(null, db);
    })
    .catch((err) => {
      cb(err);
    });
};

const getDB = () => {
  if (!db) {
    throw Error("Database not initialized!");
  }
  return db;
};

module.exports = {
  getDB,
  init,
};
