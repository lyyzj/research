module.exports = function(BaseTest){
    BaseTest.testDefaultFn = function(baseField2, baseField3, cb) {
        var data = {
            baseField2: baseField2,
            baseField3: baseField3
        }
        BaseTest.create(data, function(err, res) {
            cb(null, res); 
        })
    };

    BaseTest.remoteMethod(
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
