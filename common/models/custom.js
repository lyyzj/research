async = require("async");
module.exports = function(Custom) {

    Custom.testHasMany = function(orderId, cb) {
        console.log(Custom.prototype.orders);
        Custom.prototype.orders({where:{id:orderId}}, function(err, res) {
            cb(null, res);
        })
    }
    
    Custom.remoteMethod(
        'testHasMany',
        {
            http: {path: '/testHasMany', verb: 'get'}, 
            accepts: [
                {arg: 'orderId', type: 'string'}
            ],
            returns: {arg: 'msg', type: 'string'}
        }
    );

    //测试embedsOne
    Custom.testEmbedsOne = function(customerName, cb) {
        Custom.create({customerName:customerName}, function(err, custom) {
            var addInfo = {
               addressName: customerName + "测试的地址" 
            }
            custom.address.create(addInfo, function(err, res) {
                cb(null, custom);
            });
        }) 
    }
    
    Custom.remoteMethod(
        'testEmbedsOne',
        {
            http: {path: '/testEmbedsOne', verb: 'post'}, 
            accepts: [
                {arg: 'customerName', type: 'string'}
            ],
            returns: {arg: 'msg', type: 'string'}
        }
    );
    //测试embedsMany
    Custom.testEmbedsManyWithPersistent = function(customerName, cb) {
        var emails = [
            {
               label: customerName + "张三1",
               address: "湖北荆州"
            }, 
            {
               label: customerName + "李四1",
               address: "上海"
            }
        ];
        Custom.create({customerName:customerName}, function(err, custom) {
            async.each(emails, function(item, done) {
               custom.email.create(item, done);
            }, function(err) {
                cb(null, custom);
            }); 
        }) 
    }
    
    Custom.remoteMethod(
        'testEmbedsManyWithPersistent',
        {
            http: {path: '/testEmbedsManyWithPersistent', verb: 'post'}, 
            accepts: [
                {arg: 'customerName', type: 'string'}
            ],
            returns: {arg: 'msg', type: 'string'}
        }
    );

    Custom.testReferencesMany = function(customerName, cb) {
        var books = [
            {bookName:customerName + "书本1"},
            {bookName:"book2"}
        ];
        Custom.create({customerName:customerName}, function(err, custom) {
            async.each(books, function(item, done) {
                custom.books.create(item, done); 
            }, function(err) {
                var content;
                if (err) {
                    content = "fail";
                } else {
                    content = "success";
                }
                cb(null, custom);
            })
        })  
    }

    Custom.remoteMethod(
        'testReferencesMany',
        {
            http: {path: '/testReferencesMany', verb: 'post'}, 
            accepts: [
                {arg: 'customerName', type: 'string'} 
            ],
            returns: {arg: 'msg', type: 'string'}
        }
    );

    //测试embedsMany
    Custom.testEmbedsManyNoPersistent = function(customerName, cb) {
        var boxes = [
            {
               width: "170",
               boxName: customerName + "盒子一"
            }, 
            {
               width: "200",
               boxName: customerName + "box2"
            }
        ];
        Custom.create({customerName:customerName}, function(err, custom) {
            async.each(boxes, function(item, done) {
               custom.boxs.create(item, function(err, res) {
                    if (err) {
                        cb(null, err);
                    }
               });
            }, function(err) {
                cb(null, custom);
            }); 
        }) 
    }
    
    Custom.remoteMethod(
        'testEmbedsManyNoPersistent',
        {
            http: {path: '/testEmbedsManyNoPersistent', verb: 'post'}, 
            accepts: [
                {arg: 'customerName', type: 'string'}
            ],
            returns: {arg: 'msg', type: 'string'}
        }
    );
}
