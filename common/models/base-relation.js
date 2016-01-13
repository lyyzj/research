module.exports = function(BaseRelation){
    //测试protect的属性
    BaseRelation.testProtected = function(rid, cb) {
        BaseRelation.find({include:"baseTests"}, function(err, res) {
            cb(null, res); 
        })
    };

    BaseRelation.remoteMethod(
        'testProtected',
        {
            http: {path: '/testProtected', verb: 'get'}, 
            accepts: [
                {arg: 'rid', type: 'string'}
            ],
            returns: {arg: 'res', type: 'string'}
        }
    );
}
