module.exports = function(Orderer) {
    //url : http://172.17.5.22:3100/api/Orderers?filter[fields][productName]=false&filter[where][OrderNo]=1
    Orderer.whereSimple = function(orderNo, cb) {
        var where = {orderNo:orderNo};
        var fields = {productName:false};
        Orderer.find({
                fields:fields,
                where:where
            }, function(err, res) {
            cb(null, res);
        })
    }
    
   Orderer.remoteMethod(
    'whereSimple',
    {
        http:{path:'/whereSimple', verb:'get'},
        accepts : {
            arg:'orderNo', type: 'string'
        },
        returns: {arg:'msg', type:'string'}
    }
   ); 


    Orderer.whereUpdate = function(orderNo, price, cb) {
        var where = {orderNo:orderNo};
        var data = {price:price};
        Orderer.updateAll(where, data, function(err, res) {
            cb(null, res);
        })
    }
    
   Orderer.remoteMethod(
    'whereUpdate',
    {
        http:{path:'/whereUpdate', verb:'post'},
        accepts : [
            {arg:'orderNo', type: 'string'},
            {arg:'price', type: 'number'}
        ],
        returns: {arg:'msg', type:'string'}
    }
   ); 

    //url : http://172.17.5.22:3100/api/Orderers?filter[where][and][0][productName]=产品二&filter[where][and][1][orderNo]=2
    Orderer.whereOpAnd = function(productName, productNumber, cb) {
        var where = {and:[{productName:productName}, {productNumber:productNumber}]};
        Orderer.find({
                where:where
            }, function(err, res) {
            cb(null, res);
        })
    }
    
   Orderer.remoteMethod(
    'whereOpAnd',
    {
        http:{path:'/whereOpAnd', verb:'post'},
        accepts : [
            {arg:'productName', type: 'string'},
            {arg:'productNumber', type: 'string'}
        ],
        returns: {arg:'msg', type:'string'}
    }
   ); 

    //url : http://172.17.5.22:3100/api/Orderers?filter[where][or][0][productName]=产品二&filter[where][or][1][orderNo]=1
    Orderer.whereOpOr = function(productName, productNumber, cb) {
        var where = {or:[{productName:productName}, {productNumber:productNumber}]};
        Orderer.find({
                where:where
            }, function(err, res) {
            cb(null, res);
        })
    }
    
   Orderer.remoteMethod(
    'whereOpOr',
    {
        http:{path:'/whereOpOr', verb:'post'},
        accepts : [
            {arg:'productName', type: 'string'},
            {arg:'productNumber', type: 'string'}
        ],
        returns: {arg:'msg', type:'string'}
    }
   ); 
    //复杂的不建议使用rest风格
    Orderer.whereOpAndOr = function(price, productName, productNumber, cb) {
        var where = {and:[
            {price:price},
            {or:[{productName:productName}, {productNumber:productNumber}]},
            ]};
        Orderer.find({
                where:where
            }, function(err, res) {
            cb(null, res);
        })
    }
    
   Orderer.remoteMethod(
    'whereOpAndOr',
    {
        http:{path:'/whereOpAndOr', verb:'post'},
        accepts : [
            {arg:'price', type: 'number'},
            {arg:'productName', type: 'string'},
            {arg:'productNumber', type: 'string'}
        ],
        returns: {arg:'msg', type:'string'}
    }
   ); 

    //url : http://172.17.5.22:3100/api/Orderers?filter[where][price][gt]=500
    //url : http://172.17.5.22:3100/api/Orderers?filter[where][price][between][0]=500&filter[where][price][between][1]=1000
    Orderer.whereGtAndLtBetween = function(price, op, price2, cb) {
        var where = {};
        if (op == "gt") {
            where = {price:{gt:price}};
        } else if(op == "gte"){
            where = {price:{gte:price}};
        } else if(op == "lt"){
            where = {price:{lt:price}};
        } else if(op == "lte"){
            where = {price:{lte:price}};
        } else if(op == "between"){
            where = {price:{between:[price, price2]}};
        }
        var fields = {productName:false};
        Orderer.find({
                fields:fields,
                where:where
            }, function(err, res) {
            cb(null, res);
        })
    }
    
   Orderer.remoteMethod(
    'whereGtAndLtBetween',
    {
        http:{path:'/whereGtAndLtBetween', verb:'get'},
        accepts : [
            {arg:'price', type: 'number'},
            {arg:'op', type: 'string'},
            {arg:'price2', type: 'number'}
        ],
        returns: {arg:'msg', type:'string'}
    }
   ); 

    //url : http://172.17.5.22:3100/api/Orderers?filter={"where":{"price":{"inq":[105,500]}}}
    Orderer.whereInqAndNin = function(price1, price2, op, cb) {
        var where = {};
        price2 = price2 || 0;
        if (op == "inq") {
            where = {price:{inq:[price1, price2]}};
        } else if(op == "nin"){
            where = {price:{nin:[price1, price2]}};
        }
        Orderer.find({
                where:where
            }, function(err, res) {
            cb(null, res);
        })
    }
    
   Orderer.remoteMethod(
    'whereInqAndNin',
    {
        http:{path:'/whereInqAndNin', verb:'get'},
        accepts : [
            {arg:'price1', type: 'number'},
            {arg:'price2', type: 'number'},
            {arg:'op', type: 'string'}
        ],
        returns: {arg:'msg', type:'string'}
    }
   ); 

    Orderer.whereLikeAndNlike = function(productName, op, cb) {
        var where = {};
        if (op == "like") {
            where = {productName:{like:productName + '%'}};
        } else if(op == "nlike"){
            where = {productName:{nlike:productName}};
        }
        Orderer.find({
                where:where
            }, function(err, res) {
            cb(null, res);
        })
    }
    
   Orderer.remoteMethod(
    'whereLikeAndNlike',
    {
        http:{path:'/whereLikeAndNlike', verb:'get'},
        accepts : [
            {arg:'productName', type: 'string'},
            {arg:'op', type: 'string'}
        ],
        returns: {arg:'msg', type:'string'}
    }
   ); 
}
