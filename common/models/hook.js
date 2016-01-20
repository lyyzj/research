module.exports = function(Hook) {
    Hook.testRemoteHook = function(data, cb) {
        console.log(data);
        Hook.create(data, function(err, res) {
            cb(null, res);
        })
    }

    Hook.remoteMethod(
        'testRemoteHook',
        {
            http:{path: '/testRH', verb:'post'},
            accepts: [
                {arg:'data', type: 'object', http:{source:'body'}}
            ],
            returns: {arg:'array', type: 'string', root:true},//参数arg在root为true的时候不起作用
            description:[
                'test remote hoook'
            ],
        }
    );
    /*
    Hook.beforeRemote('find', function(ctx, input, next) {
        console.log(input);
        next(new Error('must be logged in to update'));
    });
    */

    Hook.beforeRemote('testRemoteHook', function(ctx, input, next) {
        console.log(input);
        ctx.req.body.hookField2 = ctx.req.body.hookField2 + 1;
        ctx.req.body.createAt = new Date();
        next();
    });


    Hook.afterRemote('testRemoteHook', function(ctx, output, next) {
        console.log(output);
        console.log(ctx.result);
        ctx.result = {id:123};
        next();
    });

    Hook.beforeRemote('**', function(ctx, input, next) {
        console.log("match invoke");
        next();
    });
}
