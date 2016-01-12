module.exports = function(BelongTo) {

    BelongTo.testBelongTo = function(id, cb) {
        var belongTo = BelongTo.prototype;
        console.log(belongTo.testUser);
        /*
        belongTo.testUser(function(err, res) {
            console.log(err);
            cb(null, res);
        })
        */
    }
    
    BelongTo.remoteMethod(
        'testBelongTo',
        {
            http: {path: '/testBelongTo', verb: 'get'}, 
            accepts: [
                {arg: 'id', type: 'string'}
            ],
            returns: {arg: 'msg', type: 'string'}
        }
    );
}
