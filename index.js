const db = require("./db/database");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const { createUserIfNotExists } = require("./db/users");

const app = express();
const port = process.env.PORT || 3000;

// initialize the database
db.init((err, db) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Database initialized!");
});

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// import the routes
const routes = require("./routes");

app.use(bodyParser.json());

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "bananas",
  })
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

app.use(passport.initialize());
app.use(passport.session());

const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const GOOGLE_CLIENT_ID =
  "626433925888-fh18snt1vaactbd9lnjrujjvv2fi0ft5.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";
const callbackURL =
  process.env.NODE_ENV == "production"
    ? "https://cse341-2-y9s3.onrender.com/auth_callback"
    : "http://localhost:3000/auth_callback";
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: callbackURL,
    },
    function (accessToken, refreshToken, profile, done) {
      userProfile = profile;
      createUserIfNotExists(userProfile).then((user) => {
        done(null, user);
      });
    }
  )
);

// use the routes
app.use("/", routes);

// start the server
app.listen(port, () => {
  console.log(`app listening at ${port}`);
});
