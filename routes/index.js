const routes = require("express").Router();

routes.use("/messages", require("./messages"));
routes.use("/users", require("./users"));
routes.use("/", require("./swagger"));
routes.use("/", require("./auth"));

module.exports = routes;
