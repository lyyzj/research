//利用mixins对CRUD操作做缓存更新操作
var cacheService = require("../lib/cache/cache-service.js");
var cacheCfg = {provider:'redis',host:'127.0.0.1', port:6370};
var cache = cacheService(cacheCfg);
module.exports = function(Model, options) {

    Model.observe('before save', function(ctx, next) {
        console.log("Todo before save, modelName:%s", ctx.Model.modelName);
        next();
    }); 

    Model.observe('after save', function(ctx, next) {
        console.log("Todo after save ,modelName:%s, instance:%j", ctx.Model.modelName, ctx.instance);
        /*
        var cacheKey = ctx.instance.id;
        cache.get(cacheKey).then(function(res) {
            //如果缓存存在更新对应的缓存
            if (res)  {
                if (ctx.instance.isCache) {
                    cache.set(cacheKey, ctx.instance, ctx.instance.cacheTime);
                }
            } else {
                if (ctx.instance.isCache) {
                    cache.set(cacheKey, ctx.instance, ctx.instance.cacheTime);
                }
            }
        });
        */
        next();
    });

    Model.on('attached',function(){
        /*
        var find = Model.find;
        Model.find = function(filter, cb) {
            var cacheKey = Model.modelName + '-all';
            if(filter) {
              cacheKey  = Model.modelName + '-' + JSON.stringify(filter);
            }
            console.log(cacheKey );
            cache.get(cacheKey)
            .then(function(res) {
                if (res) {
                    console.log("data from cache in mixin", res);
                    process.nextTick(function() {
                        cb(null, res);
                    });
                } else {
                    find.call(Model, filter, function(err, results) {
                        console.log("data from database in mixin", results);
                        if (!err) {
                            //重新更新缓存
                            cache.set(cacheKey, results, 20);
                        }
                        cb(null, results);
                    });
                }
            });
        }
        */

        var findById = Model.findById;
        Model.findById = function(id, filter, cb) {
            var cacheKey = Model.modelName + '-' + id;
            cache.get(cacheKey)
            .then(function(res) {
                if (res) {
                    console.log("findById data from cache in mixin", res);
                    process.nextTick(function() {
                        cb(null, res);
                    });
                } else {
                    findById.call(Model, id, filter, function(err, results) {
                        console.log("findById data from database in mixin", results);
                        if (!err) {
                            //重新更新缓存
                            cache.set(cacheKey, results, 20);
                        }
                        cb(null, results);
                    });
                }
            });
        }

    });
};
