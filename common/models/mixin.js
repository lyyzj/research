module.exports = function(Mixin) {
    Mixin.testUpdateMixin = function(id, testOpt, cb) {
        Mixin.updateAll({id:id}, {testOpt:testOpt}, function(err, res) {
            if (err) {
                cb(err, res); 
            } else {
                cb(null, res); 
            }
        })
    };

    Mixin.remoteMethod(
        'testUpdateMixin',
        {
            http: {path: '/testUM', verb: 'post'}, 
            accepts: [
                {arg: 'id', type: 'string'},
                {arg: 'opt', type: 'number'}
            ],
            returns: {arg: 'res', type: 'string', root:true}
        }
    );
}
