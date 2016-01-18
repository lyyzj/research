module.exports = function(Customer1) {
    Customer1.testApplyDelete = function(cid, cb) {
        Customer1.deleteById(cid, function(err, res) {
            cb(null, res);
        })
    };

    Customer1.remoteMethod(
        'testApplyDelete',
        {
            http: {path: '/testApplyDelete', verb: 'get'}, 
            accepts: [
                {arg: 'cid', type: 'string'}
            ],
            returns: {arg: 'res', type: 'string'}
        }
    );
}
