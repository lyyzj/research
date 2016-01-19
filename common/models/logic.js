module.exports = function(Logic) {
    Logic.testRemoteMethod = function(baseField2, cb) {
        Logic.validatesInclusionOf("baseField2", {in:['bf22', 'bf33']});
        var data = {
            baseField2: baseField2 
        }; 
        Logic.create(data, function(err, res) {
            if (res.isValid()) {
                cb(null, res);
            } else {
                cb(null, res.errors)
            }
        });
    }

    Logic.remoteMethod(
        'testRemoteMethod',
        {
            http:{path: '/testRm', verb:'get', status:201},
            accepts: [
                {arg:'baseField2', type: 'string'}
            ],
            returns: {arg: 'res', type: 'string'},
            description:[
                'test descr1',
                'test descr2'
            ],
            notes:['note1', 'note2']
        }
    );
    //尝试错误代码
    Logic.testErrorStatus = function(baseField2, cb) {
        Logic.validatesInclusionOf("baseField2", {in:['bf22', 'bf33']});
        var data = {
            baseField2: baseField2 
        }; 
        Logic.create(data, function(err, res) {
            if (res.isValid()) {
                cb(null, res);
            } else {
                cb(res.errors, "error");
            }
        });
    }

    Logic.remoteMethod(
        'testErrorStatus',
        {
            http:{verb:'get', errorStatus:401},
            accepts: [
                {arg:'baseField2', type: 'string'}
            ],
            returns: {arg: 'res', type: 'string'},
            description:[
                'test descr1',
                'test descr2'
            ],
            notes:['note1', 'note2']
        }
    );

    //设置设置为静态
    Logic.prototype.testStaticMethod = function(baseField2, cb) {
        var data = {
            baseField2: baseField2 
        }; 
        Logic.create(data, function(err, res) {
            cb(null, res);
        });
    }

    Logic.remoteMethod(
        'testStaticMethod',
        {
            http:{path: '/testStatic', verb:'get'},
            accepts: [
                {arg:'baseField2', type: 'string'}
            ],
            returns: {arg: 'res', type: 'string'},
            isStatic:false
        }
    );

    //不设置returns
    Logic.testNoReturn = function(baseField2, cb) {
        var data = {
            baseField2: baseField2 
        }; 
        Logic.create(data, function(err, res) {
            cb(null, res);
        });
    }

    Logic.remoteMethod(
        'testNoReturn',
        {
            http:{path: '/testNoReturn', verb:'get'},
            description:['no returns'],
            accepts: [
                {arg:'baseField2', type: 'string'}
            ]
        }
    );
}
