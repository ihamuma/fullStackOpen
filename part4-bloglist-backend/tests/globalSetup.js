const { MongoMemoryServer } = require("mongodb-memory-server");

module.exports = async () => {
  const mongod = await MongoMemoryServer.create();
  process.env.TEST_MONGODB_URI = mongod.getUri();
  process.env.SECRET = "test-secret";
  global.__MONGOSERVER = mongod;
};
