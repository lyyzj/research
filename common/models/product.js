module.exports = function(Product) {
    Product.validatesAbsenceOf('productName1', {message: "productName1 can't set!!"});
    Product.validatesPresenceOf('productName', {message: "productName can't blank!!"});
    Product.validatesPresenceOf('price', {message: "price can't blank!!"});

    Product.validatesExclusionOf('property', {in:['test1', 'test2'],message:"property value is not in (test1, test2)"});
    Product.validatesInclusionOf('property', {in:['pro1', 'pro2'],message:"property value is in (pro1, pro2)"});

    Product.validatesFormatOf('price', {with:/\d/,message:"price value is not number"});
    Product.validatesLengthOf('productName', {min:3, max:10, message:{min:"productName length is less 3!!",max:"productName length is than 10"}});
    Product.validatesLengthOf('price', {is:2,message:{is:"price length is invalid!!"}});


    //Product.validatesNumericalityOf('productNumber', {int:true,message:{int:"productNumber is invalid!!"}});
    Product.validatesNumericalityOf('productNumber', {message:{number:"productNumber is invalid!!"}});

    Product.validatesUniquenessOf('property');
    
    //验证一个不能插入的属性，对于象mongo这样的数据结构比较有效
    Product.testValidatesAbsence = function(productName1, productNo, cb) {
        var data = {
            productName1:productName1,
            productNo: productNo
        }
        Product.create(data, function(err, res) {
            res.isValid(function(valid) {
                    console.log(valid);
                    if (!valid) {
                        cb(null, err); 
                    } else{
                        cb(null, res); 
                    }
                })
        })
    };

    Product.remoteMethod(
        'testValidatesAbsence',
        {
            http: {path: '/testValidatesAbsence', verb: 'post'}, 
            accepts: [
                {arg: 'productName1', type: 'string'},
                {arg: 'productNo', type: 'string'}
            ],
            returns: {arg: 'res', type: 'string'}
        }
    );
    //保存到model的属性必须要含有的
    Product.testValidatesPresenceOf = function(productName, price, productNo, cb) {
        var data = {
            productName:productName,
            productNo: productNo,
            price:price
        }
        Product.create(data, function(err, res) {
            res.isValid(function(valid) {
                    console.log(valid);
                    if (!valid) {
                        cb(null, err); 
                    } else{
                        cb(null, res); 
                    }
                })
        })
    };

    Product.remoteMethod(
        'testValidatesPresenceOf',
        {
            http: {path: '/testValidatesPresenceOf', verb: 'post'}, 
            accepts: [
                {arg: 'productName', type: 'string'},
                {arg: 'price', type: 'string'},
                {arg: 'productNo', type: 'string'}
            ],
            returns: {arg: 'res', type: 'string'}
        }
    );

    //属性值不能有规定的值
    Product.testValidatesExclusionOf = function(productName, price, property, cb) {
        var data = {
            productName:productName,
            property: property,
            price:price
        }
        Product.create(data, function(err, res) {
            res.isValid(function(valid) {
                    console.log(valid);
                    if (!valid) {
                        cb(null, err); 
                    } else{
                        cb(null, res); 
                    }
                })
        })
    };

    Product.remoteMethod(
        'testValidatesExclusionOf',
        {
            http: {path: '/testValidatesExclusionOf', verb: 'post'}, 
            accepts: [
                {arg: 'productName', type: 'string'},
                {arg: 'price', type: 'string'},
                {arg: 'property', type: 'string'},
            ],
            returns: {arg: 'res', type: 'string'}
        }
    );

    //属性值只能有规定的值
    Product.testValidatesInclusionOf = function(productName, price, property, cb) {
        var data = {
            productName:productName,
            property: property,
            price:price
        }
        Product.create(data, function(err, res) {
            res.isValid(function(valid) {
                    console.log(valid);
                    if (!valid) {
                        cb(null, err); 
                    } else{
                        cb(null, res); 
                    }
                })
        })
    };

    Product.remoteMethod(
        'testValidatesInclusionOf',
        {
            http: {path: '/testValidatesInclusionOf', verb: 'post'}, 
            accepts: [
                {arg: 'productName', type: 'string'},
                {arg: 'price', type: 'string'},
                {arg: 'property', type: 'string'},
            ],
            returns: {arg: 'res', type: 'string'}
        }
    );


    //属性值格式匹配
    Product.testValidatesFormatOf = function(productName, property, price, cb) {
        var data = {
            productName:productName,
            price:price,
            property: property
        }
        Product.create(data, function(err, res) {
            res.isValid(function(valid) {
                    console.log(valid);
                    if (!valid) {
                        cb(null, err); 
                    } else{
                        cb(null, res); 
                    }
                })
        })
    };

    Product.remoteMethod(
        'testValidatesFormatOf',
        {
            http: {path: '/testValidatesFormatOf', verb: 'post'}, 
            accepts: [
                {arg: 'productName', type: 'string'},
                {arg: 'property', type: 'string'},
                {arg: 'price', type: 'string'},
            ],
            returns: {arg: 'res', type: 'string'}
        }
    );
    //属性值长度判断
    Product.testValidatesLengthOf = function(productName, property, price, cb) {
        var data = {
            productName:productName,
            price:price,
            property: property
        }
        Product.create(data, function(err, res) {
            res.isValid(function(valid) {
                    console.log(valid);
                    if (!valid) {
                        cb(null, err); 
                    } else{
                        cb(null, res); 
                    }
                })
        })
    };

    Product.remoteMethod(
        'testValidatesLengthOf',
        {
            http: {path: '/testValidatesLengthOf', verb: 'post'}, 
            accepts: [
                {arg: 'productName', type: 'string'},
                {arg: 'property', type: 'string'},
                {arg: 'price', type: 'string'},
            ],
            returns: {arg: 'res', type: 'string'}
        }
    );


    //数字和整数的验证
    Product.testValidatesNumericalityOf = function(productName, property, price, productNumber, cb) {
        var data = {
            productName:productName,
            price:price,
            property: property,
            productNumber:productNumber 
        }
        Product.create(data, function(err, res) {
            res.isValid(function(valid) {
                    console.log(valid);
                    if (!valid) {
                        cb(null, err); 
                    } else{
                        cb(null, res); 
                    }
                })
        })
    };

    Product.remoteMethod(
        'testValidatesNumericalityOf',
        {
            http: {path: '/testValidatesNumericalityOf', verb: 'post'}, 
            accepts: [
                {arg: 'productName', type: 'string'},
                {arg: 'property', type: 'string'},
                {arg: 'price', type: 'string'},
                {arg: 'productNumber', type: 'string'},
            ],
            returns: {arg: 'res', type: 'string'}
        }
    );
}
