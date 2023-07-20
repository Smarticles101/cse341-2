const { ObjectId } = require("mongodb");
const db = require("../db/database");
const passport = require("passport");

const getUsers = (req, res) => {
  const session_user = req.session.passport?.user;
  db.getDB()
    .db()
    .collection("users")
    .find()
    .toArray()
    .then((data) => {
      res.status(200).send(
        data.map((user) => {
          // only return non-sensitive information

          if (session_user && user._id === session_user.id) {
            return user;
          }
          return {
            _id: user._id,
            name: user.name,
            avatar: user.avatar,
          };
        })
      );
    });
};

const getUserById = (req, res) => {
  const id = new ObjectId(req.params.id);
  const session_user = req.session.passport?.user;

  db.getDB()
    .db()
    .collection("users")
    .find({ _id: id })
    .toArray()
    .then((data) => {
      res.status(200).send(
        data.map((user) => {
          if (session_user && user._id === session_user.id) {
            return user;
          }
          return {
            _id: user._id,
            name: user.name,
            avatar: user.avatar,
          };
        })[0]
      );
    });
};

const modifyUser = (req, res) => {
  const id = new ObjectId(req.params.id);
  const session_user = req.session.passport?.user;

  /* #swagger.security = [{
            "oAuthSample": [
                "modify_account",
            ]
        }] */

  if (!session_user || id !== session_user.id) {
    res.status(401).send("Unauthorized");
  }

  const user = {
    name: req.body.name,
    avatar: req.body.avatar,
  };

  if (user.name.length < 1) {
    res.status(400).send("Name cannot be empty");
  } else if (user.name.length > 255) {
    res.status(400).send("Name cannot be longer than 255 characters");
  }

  db.getDB()
    .db()
    .collection("users")
    .updateOne({ _id: id }, { $set: user })
    .then((result) => {
      res.status(201).send(result);
    });
};

const deleteUser = (req, res) => {
  const id = new ObjectId(req.params.id);
  const session_user = req.session.passport?.user;

  /* #swagger.security = [{
            "oAuthSample": [
                "delete_account",
            ]
        }] */

  if (!session_user || id !== session_user.id) {
    res.status(401).send("Unauthorized");
  }

  db.getDB()
    .db()
    .collection("users")
    .deleteOne({ _id: id })
    .then((result) => {
      res.status(201).send(result);
    });
};

module.exports = {
  getUsers,
  getUserById,
  modifyUser,
  deleteUser,
};
