const express = require("express");
const router = express.Router();

const messagesController = require("../controllers/messages");

router.get("/", messagesController.getMessages);

router.get("/:id", messagesController.getMessageById);

router.post("/", messagesController.createMessage);

module.exports = router;
