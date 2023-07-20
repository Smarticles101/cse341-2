const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users");

router.get("/", usersController.getUsers);

router.get("/:id", usersController.getUserById);

router.put("/:id", usersController.modifyUser);

router.delete("/:id", usersController.deleteUser);

module.exports = router;
