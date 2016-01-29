return;
var cacheService = require("../lib/cache/cache-service.js");
var cacheCfg = {provider:'redis',host:'127.0.0.1', port:6370};
var cache = cacheService(cacheCfg);
module.exports = function(app) {

    var Article = app.models.Article;
    var aFind = Article.find;
    Article.find = function(filter, cb) {
        console.log("cb:",cb);
        var cacheKey = 'Article-all';
        if(filter) {
          cacheKey = 'Article-' + JSON.stringify(filter);
        }
        console.log("find cache key:", cacheKey);
        cache.get(cacheKey)
        .then(function(res) {
            if (res) {
                console.log("Article data from cache, %j", res);
                process.nextTick(function() {
                    cb(null, res);
                });
            } else {
                aFind.call(Article, filter, function(err, results) {
                    console.log("Article data from database, %j", results);
                    if (!err) {
                        //重新更新缓存
                        cache.set(cacheKey, results, 30);
                    }
                    cb(null, results);
                });
            }
        });
    } 
    /*
    var aFindById = Article.findById;
    Article.findById = function(id, filter, cb) {
        console.log("id cb:",cb);
        var cacheKey = 'Article-' + id + '-' + JSON.stringify(filter);
        console.log("findById cache key:", cacheKey);
        cache.get(cacheKey)
        .then(function(res) {
            if (res) {
                console.log("Article id data from cache, %j", res);
                process.nextTick(function() {
                    cb(null, res);
                });
            } else {
                aFindById.call(Article, id, filter, function(err, results) {
                    console.log(err);
                    console.log("Article id data from database, %j", results);
                    if (!err) {
                        //重新更新缓存
                        cache.set(cacheKey, results, 30);
                    }
                    cb(null, results);
                });
            }
        });
    } 
    */

    var ArticleUser = app.models.ArticleUser;
    var auFind = ArticleUser.find;
    ArticleUser.find = function(filter, cb) {
        var cacheKey = 'ArticleUser-all';
        if(filter) {
          cacheKey = 'ArticleUser-' + JSON.stringify(filter);
        }
        console.log("find cache key:", cacheKey);
        cache.get(cacheKey)
        .then(function(res) {
            if (res) {
                console.log("ArticleUser data from cache, %j", res);
                process.nextTick(function() {
                    cb(null, res);
                });
            } else {
                auFind.call(ArticleUser, filter, function(err, results) {
                    console.log("ArticleUser data from database, %j", results);
                    if (!err) {
                        //重新更新缓存
                        cache.set(cacheKey, results, 30);
                    }
                    cb(null, results);
                });
            }
        });
    } 
}
