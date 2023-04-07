const { ObjectId } = require("mongodb");
const db = require("../db/database");

const getMessages = (req, res) => {
  db.getDB()
    .db()
    .collection("messages")
    .find()
    .toArray()
    .then((data) => {
      res.status(200).send(data);
    });
};

const getMessageById = (req, res) => {
  const id = new ObjectId(req.params.id);

  db.getDB()
    .db()
    .collection("messages")
    .find({ _id: id })
    .toArray()
    .then((data) => {
      res.status(200).send(data[0]);
    });
};

const createMessage = (req, res) => {
  const message = {
    message: req.body.message,
    timestamp: new Date().toISOString(),
  };

  db.getDB()
    .db()
    .collection("messages")
    .insertOne(message)
    .then((result) => {
      res.status(201).send(result);
    });
};

module.exports = {
  getMessages,
  getMessageById,
  createMessage,
};
