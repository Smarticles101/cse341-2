const routes = require("express").Router();

routes.use("/messages", require("./messages"));
routes.use("/", require("./swagger"));

module.exports = routes;
