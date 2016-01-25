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

    BaseTest.testLogin = function(email, password, ttl, cb) {
        var data = {
            email: email,
            password: password,
            ttl: ttl || 86400
        };
        BaseTest.app.models.User.login(data,'user',function(err, token) {
            if (err) return cb(err);
            cb(null, token); 
        });
    };

    BaseTest.remoteMethod(
        'testLogin',
        {
            http: {path: '/testLogin', verb: 'post'}, 
            accepts: [
                {arg: 'email', type: 'string'},
                {arg: 'password', type: 'string'},
                {arg: 'ttl', type: 'number'}
            ],
            returns: {type: 'array', root:true}
        }
    );

    BaseTest.testLogout = function(tokenId, cb) {
        BaseTest.app.models.User.logout(tokenId,function(err) {
            if (err) return cb(err);
            cb(null, "logout success"); 
        });
    };

    BaseTest.remoteMethod(
        'testLogout',
        {
            http: {path: '/testLogout', verb: 'get'}, 
            accepts: [
                {arg: 'tokenId', type: 'string', required:true}
            ],
            returns: {type: 'array', root:true}
        }
    );

    BaseTest.testDestoryToken = function(tokenId, cb) {
        var accessToken = new BaseTest.app.models.AccessToken({id:tokenId}); 
        accessToken.destroy();
        cb(null, "logout success"); 
    };

    BaseTest.remoteMethod(
        'testDestoryToken',
        {
            http: {path: '/testDestoryToken', verb: 'get'}, 
            accepts: [
                {arg: 'tokenId', type: 'string', required:true}
            ],
            returns: {type: 'array', root:true}
        }
    );
}
