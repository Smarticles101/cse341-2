const db = require("../db/database");

const createUserIfNotExists = async (profile) => {
  const data = await db
    .getDB()
    .db()
    .collection("users")
    .find({ provider_id: profile.id, provider: profile.provider })
    .toArray();
  if (data.length === 0) {
    const user = {
      provider_id: profile.id,
      name: profile.displayName,
      email: profile.emails[0].value,
      avatar: profile.photos[0].value,
      provider: profile.provider,
      dateRegistered: new Date().toISOString(),
    };

    const result = await db.getDB().db().collection("users").insertOne(user);
    return { ...user, _id: result.insertedId };
  } else {
    return data[0];
  }
};

module.exports = {
  createUserIfNotExists,
};
