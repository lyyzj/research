module.exports = function(Product1) {
    //Product1.validatesUniquenessOf('productNo', {message:"productNo 不唯一"});

    Product1.validate('productName', function(err) {
        if (this.productName == "xx") {
            err(); 
        }
    }, {message: "productName 不能为xx"})
    /*
    Product1.validate('productNo', customValid, {message: "productNo 不能为xx"});

    function customValid(err) {
        if (this.productNo == 'xx') {
            err();
        }
    }
    */


    
    //在函数内进行实时的增加验证
    Product1.testValidate = function(productName, productNo, productNumber, cb) {

        Product1.validatesNumericalityOf('productNumber', {int:true,message:{int:"productNumber is not int!!"}});
        var data = {
            productName:productName,
            productNo:productNo,
            productNumber:productNumber 
        }
        Product1.create(data, function(err, res) {
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

    Product1.remoteMethod(
        'testValidate',
        {
            http: {path: '/testValidate', verb: 'post'}, 
            accepts: [
                {arg: 'productName', type: 'string'},
                {arg: 'productNo', type: 'string'},
                {arg: 'productNumber', type: 'string'},
            ],
            returns: {arg: 'res', type: 'string'}
        }
    );
    //异步提交
    Product1.testValidateAsync = function(productName, productNo, productNumber, cb) {
        Product1.validateAsync('productNo', customValid, {message: "productNo 不能为xxx 在异步中"});

        function customValid(err, done) {
            var productNo = this.productNo;
            process.nextTick(function () {
                if (productNo === 'xxx') err();
                done();
                /*
                if (productNo === 'xxx') {
                    err();
                } else {
                    done();
                }
                */
            }); 
        }

        /*
        Product1.validate('productNo', customValid, {message: "productNo 不能为xx"});

        function customValid(err) {
            console.log(this.productNo);//success
            if (this.productNo == 'xx') {
                err();
            }
        }
        */

        var data = {
            productName:productName,
            productNo:productNo,
            productNumber:productNumber 
        }
        var product = new Product1(data);
        product.isValid(function(valid) {
                console.log(valid);
                if (!valid) {
                    cb(null, product.errors); 
                } else{
                    product.save(function(err, res) {
                        cb(null, product); 
                    });
                }
            })
    };

    Product1.remoteMethod(
        'testValidateAsync',
        {
            http: {path: '/testValidateAsync', verb: 'post'}, 
            accepts: [
                {arg: 'productName', type: 'string'},
                {arg: 'productNo', type: 'string'},
                {arg: 'productNumber', type: 'string'},
            ],
            returns: {arg: 'res', type: 'string'}
        }
    );
}
