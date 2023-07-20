const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    version: "1.0.0",
    title: "Messages API",
    description: "API for users to leave and manage messages",
  },
  host: "cse341-2-y9s3.onrender.com",
  schemes: ["https"],
  securityDefinitions: {
    oAuthSample: {
      type: "oauth2",
      authorizationUrl: "/auth",
      flow: "implicit",
      scopes: {
        write_messages: "write messages",
        modify_messages: "edit your own messages",
        delete_messages: "delete your own messages",
        modify_account: "edit your account",
        delete_account: "delete your account",
      },
    },
  },
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
