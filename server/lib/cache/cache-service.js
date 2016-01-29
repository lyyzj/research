var cacheFactory = require("./cache-factory");

module.exports = CacheService;

function CacheService(options) {
    if (!(this instanceof CacheService)) {
        return new CacheService(options);
    }

    this.cache = cacheFactory(options);
};

CacheService.prototype.set = function(cacheKey, data, ttl) {
    return this.cache.set(cacheKey, data, ttl);
};

CacheService.prototype.get = function(cacheKey) {
    return this.cache.get(cacheKey);
};

CacheService.prototype.del = function(cacheKey) {
    return this.cache.del(cacheKey);
};

CacheService.prototype.close = function() {
    this.cache.close();
};
