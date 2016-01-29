var redisLib = require("redis");
var qLib = require("q");
var redisClient;

module.exports = function(options) {
    return new RedisCacheProvider(options);
}

/**
 * 初始话redis
 *
 * @param options $options
 * @access public
 * @return void
 */
function RedisCacheProvider(options) {
    this.options = options;
    options.host = options.host || "127.0.0.1";
    options.port = options.port || 6379;

    this.redisClient = redisLib.createClient(options);
    if (options.password) {
        $this.redisClient.auth(options.password);
    }
}

/**
 * 设置值 
 */
RedisCacheProvider.prototype.set = function(cacheKey, data, ttl) {
    ttl = ttl || this.options.ttl || 60;
    this.redisClient.setex(cacheKey, ttl, JSON.stringify({data:data}));

    return qLib.when(data);
}

/**
 * 获取值 
 */
RedisCacheProvider.prototype.get = function(cacheKey) {
    var deferred = qLib.defer(); 
    this.redisClient.get(cacheKey, function(err, res) {
        if (err || !res)  {
            deferred.resolve(false);
        } else {
            deferred.resolve(JSON.parse(res).data); 
        }
    });

    return deferred.promise;
}

/**
 * 删除某个值 
 */
RedisCacheProvider.prototype.del = function(cacheKey) {
    this.redisClient.del(cacheKey);

    return qLib.when(cacheKey);
}

/**
 * 关闭redis连接 
 */
RedisCacheProvider.prototype.close = function() {
    this.redisClient.quit();
}
