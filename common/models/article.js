module.exports = function(Article) {

    Article.testFind = function(filter, cb) {
        Article.find(filter, function(err, res) {
            cb(null, res);
        }) 
    };
    Article.remoteMethod(
        "testFind",
        {
            http: {path:"/testFind", verb:"post"},
            accepts: [
                {arg:"filter", type:"object", http:{source:'body'}}
            ],
            returns: {type:"array", root:true}
        }
    ); 


    Article.testFindById = function(id, cb) {
        var where = {id:id};
        var fields = {id:true,title:true}
        Article.findById(id, {
            fields:fields
        }, function(err, res) {
            cb(null, res);
        }) 
    };
    Article.remoteMethod(
        "testFindById",
        {
            http: {path:"/testFindById", verb:"get"},
            accepts: [
                {arg:"id", type:"string"}
            ],
            returns: {arg:"msg", type:"array"}
        }
    ); 
};
