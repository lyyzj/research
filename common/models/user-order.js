module.exports = function(UserOrder) {
    UserOrder.testCreateOrder = function(access_token, orderNo, orderPrice, userId, cb) {
        var data = {
            orderNo: orderNo,
            orderPrice: orderPrice || 100,
            userId: userId
        };
        UserOrder.create(data,function(err, res) {
            if (err) return cb(err);
            cb(null, res); 
        });
    };

    UserOrder.remoteMethod(
        'testCreateOrder',
        {
            http: {path: '/testCreateOrder', verb: 'get'}, 
            accepts: [
                {arg: 'access_token', type: 'string', require:true},
                {arg: 'orderNo', type: 'string'},
                {arg: 'orderPrice', type: 'number'},
                {arg: 'userId', type: 'string'},
            ],
            returns: {type: 'array', root:true}
        }
    );

    UserOrder.testUpdateOrder = function(access_token, orderId, orderPrice, cb) {
        UserOrder.findById(orderId, function(err, order) {
            order.orderPrice = orderPrice || 0;         
            order.save(function(err, res) {
                if (err) return cb(err);
                cb(null, res); 
            });
        })
    };

    UserOrder.remoteMethod(
        'testUpdateOrder',
        {
            http: {path: '/testUpdateOrder', verb: 'get'}, 
            accepts: [
                {arg: 'access_token', type: 'string', require:true},
                {arg: 'orderId', type: 'string'},
                {arg: 'orderPrice', type: 'number'}
            ],
            returns: {type: 'array', root:true}
        }
    );
}
