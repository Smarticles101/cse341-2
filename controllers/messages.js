const { ObjectId } = require("mongodb");
const db = require("../db/database");

const getMessages = (req, res) => {
  console.log(req)
  console.log("wtf")
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
  const session_user = req.session.passport?.user;

  /* #swagger.security = [{
            "oAuthSample": [
                "write_messages",
            ]
        }] */
  console.log(req);

  if (!session_user) {
    res.status(401).send("Unauthorized");
  }

  const message = {
    message: req.body.message,
    timestamp: new Date().toISOString(),
    senderId: session_user._id,
  };

  if (message.length < 1) {
    res.status(400).send("Message cannot be empty");
  } else if (message.length > 255) {
    res.status(400).send("Message cannot be longer than 255 characters");
  }

  db.getDB()
    .db()
    .collection("messages")
    .insertOne(message)
    .then((result) => {
      res.status(201).send(result);
    });
};

const updateMessage = (req, res) => {
  const id = new ObjectId(req.params.id);
  const session_user = req.session.passport?.user;

  /* #swagger.security = [{
            "oAuthSample": [
                "modify_messages",
            ]
        }] */

  if (!session_user) {
    res.status(401).send("Unauthorized");
  }

  const message = {
    message: req.body.message,
    edited: true,
  };

  if (message.length < 1) {
    res.status(400).send("Message cannot be empty");
  } else if (message.length > 255) {
    res.status(400).send("Message cannot be longer than 255 characters");
  }

  db.getDB()
    .db()
    .collection("messages")
    .updateOne({ _id: id, senderId: session_user._id }, { $set: message })
    .then((result) => {
      res.status(204).send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const deleteMessage = (req, res) => {
  const id = new ObjectId(req.params.id);
  const session_user = req.session.passport?.user;

  /* #swagger.security = [{
            "oAuthSample": [
                "delete_messages",
            ]
        }] */

  if (!session_user) {
    res.status(401).send("Unauthorized");
  }

  db.getDB()
    .db()
    .collection("messages")
    .deleteOne({ _id: id, senderId: session_user._id })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

module.exports = {
  getMessages,
  getMessageById,
  createMessage,
  updateMessage,
  deleteMessage,
};
