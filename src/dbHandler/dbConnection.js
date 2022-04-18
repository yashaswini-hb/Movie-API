const MongoClient = require("mongodb").MongoClient;
const config = require("../config");

// Connection URL
let url = "";

if (config.mongoDbIsAuth === "true") {
  url = `mongodb://${encodeURIComponent(
    config.mongoDbUserName
  )}:${encodeURIComponent(config.mongoDbPassword)}@${config.mongoDbHost}:${
    config.mongoDbPort
  }?authSource=admin`;
} else {
  url = `mongodb://${config.mongoDbHost}:${config.mongoDbPort}`;
}

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
// Create a new MongoClient
const client = new MongoClient(url, options);

module.exports = client;
