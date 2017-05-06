'use strict';
const redis = require('redis'),
  bluebird = require('bluebird'),
  fakeredis = require('fakeredis'),
  logger = require("./../utils/handleLogger");

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

bluebird.promisifyAll(fakeredis.RedisClient.prototype);
bluebird.promisifyAll(fakeredis.Multi.prototype);
/**
 * If Redis server presents then create client to connect to it else create fakeRedis
 * @param config
 * @returns {Promise}
 */
module.exports = function connectRedis(config = {}) {
  return new Promise(function (resolve, reject) {
    let client = redis.createClient(config);

    client.on('error', function (err) {
      logger.warn("Could not connect to redis server. ArrowJS used fakeredis");
      resolve(fakeredis.createClient);
      return client.quit()
    })

    return client.getAsync("demo").then(function () {
      resolve(redis.createClient);
    }).catch(function (err) {
      resolve(fakeredis.createClient);
    })
  })
};
