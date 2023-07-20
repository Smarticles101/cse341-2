const router = require("express").Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("../swagger.json");

const options = {
  swaggerOptions: {
    oauth: {
      clientId:
        "626433925888-fh18snt1vaactbd9lnjrujjvv2fi0ft5.apps.googleusercontent.com",
      clientSecret: "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",
      scopes: ["profile", "email"],
    },
  },
};
router.get("/api-docs", swaggerUi.setup(swaggerDoc, options));
router.use("/api-docs", swaggerUi.serve);

module.exports = router;
