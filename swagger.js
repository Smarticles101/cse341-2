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
      tokenUrl: "/auth_callback",
      flow: "accessCode",
    },
  },
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
