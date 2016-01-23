module.exports = function(TestTable){
    TestTable.testDefaultFn = function(baseField2, baseField3, cb) {
        var data = {
            baseField2: baseField2,
            baseField3: baseField3
        }
        TestTable.create(data, function(err, res) {
            cb(null, res); 
        })
    };

    TestTable.remoteMethod(
        'testDefaultFn',
        {
            http: {path: '/testDefaultFn', verb: 'post'}, 
            accepts: [
                {arg: 'baseField2', type: 'string'},
                {arg: 'baseField3', type: 'string'}
            ],
            returns: {arg: 'res', type: 'string'}
        }
    );
}
