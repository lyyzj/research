module.exports = function(ArticleUser) {
    ArticleUser.testFind = function(filter, cb) {
        ArticleUser.find(filter, function(err, res) {
            cb(null, res);
        }) 
    };
    ArticleUser.remoteMethod(
        "testFind",
        {
            http: {path:"/testFind", verb:"post"},
            accepts: [
                {arg:"filter", type:"object",http:{source: 'body'}}
            ],
            returns: {type:"array", root:true}
        }
    ); 


    ArticleUser.testFindByUserId = function(where, cb) {
        console.log(where);
        //var where = {id:userId};
        var fields = {id:true};
        var filter = {
                    where:where,
                    fields:fields,
                    include:"articles"
                };
        var cacheKey =  'ArticleUser-' + JSON.stringify(filter);
        console.log(cacheKey);
        cache.get(cacheKey)
        .then(function(res) {
            if (res) {
                console.log("data from cache in mixin", res);
                process.nextTick(function() {
                    cb(null, res);
                });
            } else {
                ArticleUser.find(filter, function(err, results) {
                    console.log("data from database in mixin", results);
                    if (!err) {
                        //重新更新缓存
                        cache.set(cacheKey, results, 20);
                    }
                    cb(null, results);
                }) 
            }
        });
    };
    ArticleUser.remoteMethod(
        "testFindByUserId",
        {
            http: {path:"/testFindByUserId", verb:"post"},
            accepts: [
                {arg:"where", type:"object",http:{source: 'body'}}
            ],
            returns: {arg:"msg", type:"array"}
        }
    ); 
};
