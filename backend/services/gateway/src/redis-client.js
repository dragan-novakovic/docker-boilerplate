const redis = require("redis");
const { promisify } = require("util");
const client = redis.createClient(process.env.REDIS_URL);

module.exports = {
  getAsync: promisify(client.get).bind(client),
  setAsync: promisify(client.set).bind(client),
  keysAsync: promisify(client.keys).bind(client),
  hmsetAsync: promisify(client.hmset).bind(client),
  hgetallAsync: promisify(client.hgetall).bind(client),
  ...client
};
