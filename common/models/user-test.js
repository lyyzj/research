module.exports = function(userTest) {

    userTest.testCreateUser = function(username, email, password, cb) {
        var data = {
            username: username,
            email: email,
            password: password
        };
        var user = userTest.app.models.User;
        user.create(data,function(err, res) {
            if (err) return cb(err);
            cb(null, res); 
        });
    };

    userTest.remoteMethod(
        'testCreateUser',
        {
            http: {path: '/testCreateUser', verb: 'post'}, 
            accepts: [
                {arg: 'username', type: 'string', required:true},
                {arg: 'email', type: 'string', required:true},
                {arg: 'password', type: 'string', required:true}
            ],
            returns: {type: 'array', root:true}
        }
    );
    
    userTest.testCreateRole = function(roleName, cb) {
        var Role = userTest.app.models.Role;
        Role.create({name:roleName}, function(err,res) {
            if (err)  return cb(err);
            cb(null, res);
        })
    };

    userTest.remoteMethod(
        'testCreateRole',
        {
            http: {path: '/testCreateRole', verb: 'get'}, 
            accepts: [
                {arg: 'roleName', type: 'string', required:true}
            ],
            returns: {type: 'array', root:true}
        }
    );


    userTest.testAddUserToRole = function(userId, roleId, cb) {
        var RoleMapping = userTest.app.models.RoleMapping;
        var Role = userTest.app.models.Role;
        Role.findById(roleId, function(err,role) {
            if (err)  return cb(err);
            if (!role) return cb(null, "no match roleId");
            role.principals.create({
                principalType:RoleMapping.USER,
                principalId:userId
            }, function(err, principal) {
                if (err) return cb(err); 
                cb(null, principal);
            })
        })
    };

    userTest.remoteMethod(
        'testAddUserToRole',
        {
            http: {path: '/testAddUserToRole', verb: 'post'}, 
            accepts: [
                {arg: 'userId', type: 'string', required:true},
                {arg: 'roleId', type: 'string', required:true}
            ],
            returns: {type: 'array', root:true}
        }
    );


    userTest.testLogin = function(email, password, ttl, cb) {
        var data = {
            email: email,
            password: password,
            ttl: ttl || 86400
        };
        var user = userTest.app.models.User;
        user.login(data,'user',function(err, token) {
            if (err) return cb(err);
            cb(null, token); 
        });
    };

    userTest.remoteMethod(
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

    userTest.testLogout = function(tokenId, cb) {
        var user = userTest.app.models.User;
        user.logout(tokenId,function(err) {
            if (err) return cb(err);
            cb(null, "logout success"); 
        });
    };

    userTest.remoteMethod(
        'testLogout',
        {
            http: {path: '/testLogout', verb: 'get'}, 
            accepts: [
                {arg: 'tokenId', type: 'string', required:true}
            ],
            returns: {type: 'array', root:true}
        }
    );

    userTest.testDestoryToken = function(tokenId, cb) {
        var accessToken = new userTest.app.models.AccessToken({id:tokenId}); 
        accessToken.destroy();
        cb(null, "logout success"); 
    };

    userTest.remoteMethod(
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

