module.exports = function(LogicArg) {
    //测试返回参数的属性root为true的时候，如果你想返回的是一个非json的数据，比如数组
    LogicArg.testRoot = function(b2, cb) {
        var data = {
            b2: b2 
        }; 
        LogicArg.create(data, function(err, res) {
            //var msg = {msg:res};
            var msg = [];
            msg.push(res);
            msg.push(1);
            cb(null, msg);
        });
    }

    LogicArg.remoteMethod(
        'testRoot',
        {
            http:{path: '/testRoot', verb:'get'},
            accepts: [
                {arg:'b2', type: 'string'}
            ],
            returns: {arg:'array', type: 'array', root:true},//参数arg在root为true的时候不起作用
            description:[
                'test root return array'
            ],
        }
    );
    //返回一个kv的json
    LogicArg.testRoot2 = function(b2, cb) {
        var data = {
            b2: b2 
        }; 
        LogicArg.create(data, function(err, res) {
            cb(null, res);
        });
    }

    LogicArg.remoteMethod(
        'testRoot2',
        {
            http:{path: '/testRoot2', verb:'get'},
            accepts: [
                {arg:'b2', type: 'string'}
            ],
            returns: {arg:'array', type: 'array', root:true},//参数arg在root为true的时候不起作用
            description:[
                'test root return json formal'
            ],
        }
    );


    //使用http的body
    LogicArg.testBody = function(data, cb) {
        console.log(data);
        LogicArg.create(data, function(err, res) {
            cb(null, res);
        });
    }

    LogicArg.remoteMethod(
        'testBody',
        {
            http:{path: '/testBody', verb:'post'},
            accepts: [
                {arg:'data', type: 'object', http:{source: 'body'}}
            ],
            returns: {arg:'array', type: 'array'},
            description:[
                'test http body'
            ],
        }
    );

    //使用http的form,query,path
    LogicArg.testform = function(data, cb) {
        console.log(data.params);
        /*
        LogicArg.create(data, function(err, res) {
            cb(null, res);
        });
        */
        cb(null, "success");
    }

    LogicArg.remoteMethod(
        'testform',
        {
            http:{path: '/testform', verb:'post'},
            accepts: [
                {arg:'req', type: 'object', http:{source: 'context'}}
            ],
            returns: {arg:'array', type: 'array'},
            description:[
                'test http body'
            ],
        }
    );
    //使用自定义函数
    LogicArg.testfunc = function(data, cb) {
        console.log(data);
        var data = {
            b2: data.b2
        }; 
        LogicArg.create(data, function(err, res) {
            cb(null, res);
        });
    }

    LogicArg.remoteMethod(
        'testfunc',
        {
            http:{path: '/testfunc', verb:'post'},
            accepts: [
                {
                    arg:'data', type: 'object', http:function(ctx) {
                        var req = ctx.req;  
                        //console.log(req.params);
                        //console.log(req.query);
                        //console.log(req.body);
                        return req.body;
                    }
                }
            ],
            returns: {arg:'array', type: 'array'},
            description:[
                'test http body'
            ],
        }
    );

    //高级使用
    LogicArg.testAdv = function(cid, cb) {
        LogicArg.find({where:{id:cid}}, function(err, res) {
            cb(null, res);
        });
    }

    LogicArg.remoteMethod(
        'testAdv',
        {
            http:{path: '/testAdv/:cid', verb:'get'},
            accepts: [
                {
                    arg:'cid', type: 'string'
                }
            ],
            returns: {type: 'array', root:true},
            description:[
                'test adv use'
            ]
        }
    );
}
