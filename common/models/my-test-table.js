module.exports = function(MyTestTable){
    MyTestTable.testIdInjection = function(test1, test2, cb) {
        MyTestTable.create({test1:test1,test2:test2}, function(err, res) {
            cb(null, res); 
        })
    };

    MyTestTable.remoteMethod(
        'testIdInjection',
        {
            http: {path: '/testIdInjection', verb: 'get'}, 
            accepts: [
                {arg: 'test1', type: 'string'},
                {arg: 'test2', type: 'string'} 
            ],
            returns: {arg: 'res', type: 'string'}
        }
    );
}
