const db = require("../db/database");

const createUserIfNotExists = (profile) => {
  db.getDB()
    .db()
    .collection("users")
    .find({ provider_id: profile.id, provider: profile.provider })
    .toArray()
    .then((data) => {
      if (data.length === 0) {
        const user = {
          provider_id: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          avatar: profile.photos[0].value,
          provider: profile.provider,
          dateRegistered: new Date().toISOString(),
        };

        db.getDB()
          .db()
          .collection("users")
          .insertOne(user)
          .then((result) => {
            return result;
          });
      }
    });
};

module.exports = {
    createUserIfNotExists,
};
