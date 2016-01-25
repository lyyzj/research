module.exports = function(Todo) {

    Todo.testAclOwnerFind = function(tokenId, userId, todoName, cb) {
        var where = {
            userId: userId
        }
        Todo.find({where:where}, function(err, todo) {
            if (err) return cb(err);
            cb(null, todo); 
        })
    };

    Todo.remoteMethod(
        'testAclOwnerFind',
        {
            http: {path: '/testAclOwnerFind', verb: 'get'}, 
            accepts: [
                {arg: 'access_token', type: 'string', required:true},
                {arg: 'userId', type: 'string'},
                {arg: 'todoName', type: 'string'}
            ],
            returns: {type: 'array', root:true}
        }
    );

    Todo.testCreateRole = function(roleName, cb) {
        var Role = Todo.app.models.Role;
        Role.create({name:roleName}, function(err,res) {
            if (err)  return cb(err);
            cb(null, res);
        })
    };

    Todo.remoteMethod(
        'testCreateRole',
        {
            http: {path: '/testCreateRole', verb: 'get'}, 
            accepts: [
                {arg: 'roleName', type: 'string', required:true}
            ],
            returns: {type: 'array', root:true}
        }
    );

    Todo.testCreateRoleUser = function(roleId, userId, cb) {
        var RoleMapping = Todo.app.models.RoleMapping;
        var Role = Todo.app.models.Role;
        Role.findById(roleId, function(err,role) {
            if (err)  return cb(err);
            role.principals.create({
                principalType:RoleMapping.USER,
                principalId:userId
            }, function(err, principal) {
                if (err) return cb(err); 
                cb(null, principal);
            })
        })
    };

    Todo.remoteMethod(
        'testCreateRoleUser',
        {
            http: {path: '/testCreateRoleUser', verb: 'get'}, 
            accepts: [
                {arg: 'roleId', type: 'string', required:true},
                {arg: 'userId', type: 'string', required:true}
            ],
            returns: {type: 'array', root:true}
        }
    );

}
