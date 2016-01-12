module.exports = function(TestTodo) {

    TestTodo.createRelation = function(test, cb) {
        var TestUser = TestTodo.app.models.TestUser;
        //试验代码的时候需要去掉json中的属于关系配置
        TestTodo.belongsTo(TestUser, {as: 'testUser', foreignKey:'testUserId'});
        TestUser.find({include:'testtodos'}, function(err, res) {
            cb(null, res);
        })
    }
    
    TestTodo.remoteMethod(
        'createRelation',
        {
            http: {path: '/createRelation', verb: 'get'}, 
            accepts: [
                {arg: 'test', type: 'string'}
            ],
            returns: {arg: 'msg', type: 'string'}
        }
    );
}
