module.exports = function(OperationHook) {
   OperationHook.observe("access", function(ctx, next) {
        console.log("access", ctx.query.where);
        console.log("access", ctx.Model.modelName);
        next();
   });
   OperationHook.observe("loaded", function(ctx, next) {
        console.log("loaded",ctx.Model.modelName);
        next();
   });

    OperationHook.testOperationHook = function(id, cb) {
        OperationHook.findById(id, function(err, res) {
            cb(null, res);
        })
    }

    OperationHook.remoteMethod(
        'testOperationHook',
        {
            http:{path: '/testOH', verb:'get'},
            accepts: [
                {arg:'id', type: 'string'}
            ],
            returns: {arg:'array', type: 'string', root:true},//参数arg在root为true的时候不起作用
            description:[
                'test operation hoook'
            ],
        }
    );


    
   OperationHook.observe("before save", function (ctx, next) {
        console.log("before save", ctx.instance);
        if (ctx.instance.createAt === undefined || ctx.instance.createAt === '') {
            ctx.instance.createAt = new Date();
        }
        next();
   });

    OperationHook.testBeforeSave = function(data,cb) {
        OperationHook.create(data, function(err, res) {
            cb(null, res);
        })
    }

    OperationHook.remoteMethod(
        'testBeforeSave',
        {
            http:{path: '/testBS', verb:'post'},
            accepts: [
                {arg:'data', type: 'object', http:{source:'body'}}
            ],
            returns: {arg:'array', type: 'string', root:true},//参数arg在root为true的时候不起作用
            description:[
                'test before save'
            ],
        }
    );

   OperationHook.observe("after save", function saveCreateAt(ctx, next) {
        console.log("after save", ctx.instance);
        //next(new Error("test after save error"));
        next();
   });

    OperationHook.testAfterSave = function(f1, f2, fd, cb) {
        var data = {
            hookField1: f1,
            hookField2: f2,
            createAt: fd
        }
        OperationHook.create(data, function(err, res) {
            if (err) {
                cb(err, res);
            } else {
                cb(null, res);
            }
        })
    }

    OperationHook.remoteMethod(
        'testAfterSave',
        {
            http:{path: '/testAS', verb:'post'},
            accepts: [
                {arg:'f1', type: 'string'},
                {arg:'f2', type: 'number'},
                {arg:'createAt', type: 'string'}
            ],
            returns: {arg:'array', type: 'string', root:true},//参数arg在root为true的时候不起作用
            description:[
                'test after save'
            ],
        }
    );
   
    OperationHook.observe("before delete", function(ctx, next) {
        console.log("before delete", ctx.where); 
        var id = ctx.where.id; 
        OperationHook.findById(id, function(err, res) {
            if (res.hookField2 == 2) {
                next(new Error("not delete id:" + id));
            } else {
                next();
            }
        });
    });

    OperationHook.observe("persist", function(ctx, next) {
        console.log("persist", ctx.data);
        console.log("id:", ctx.data.id);
        console.log("id:", ctx.currentInstance.id);
        next();
    })

}
