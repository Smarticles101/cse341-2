const routes = require("express").Router();
const passport = require("passport");

routes.get("/auth", passport.authenticate("google", { scope: ["profile", "email"] }));
routes.get("/auth_callback", passport.authenticate("google", { failureRedirect: "/auth" }), (req, res) => {
    res.sendStatus(200);
});
routes.get("/logout", (req, res) => {
    req.logout(() => res.redirect("/"));
});

module.exports = routes;