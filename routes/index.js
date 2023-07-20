const routes = require("express").Router();
const passport = require("passport");

routes.use("/messages", require("./messages"));
routes.use("/users", require("./users"));
routes.use("/", require("./swagger"));
routes.get("/auth", passport.authenticate("google", { scope: ["profile", "email"] }));
routes.get("/auth_callback", passport.authenticate("google", { failureRedirect: "/auth" }), (req, res) => {
    res.sendStatus(200);
});

module.exports = routes;
