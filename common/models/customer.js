module.exports = function(Customer) {
    //url : http://172.17.5.22:3100/api/Customers?filter[fields][cutName]=true&filter[fields][address]=true
    Customer.showFields = function(cb) {
        var fields = {cutName:true,address:true};
        Customer.find({fields:fields}, function(err, res) {
            cb(null, res);
        })
    }
    
   Customer.remoteMethod(
    'showFields',
    {
        http:{path:'/showFields', verb:'get'},
        returns: {arg:'msg', type:'string'}
    }
   ); 
    //url : http://172.17.5.22:3100/api/Customers?filter[fields][cutName]=false&filter[fields][address]=true&filter[fields][id]=true
    Customer.excludeFields = function(cb) {
        var fields = {cutName:false, address:true, id:true};
        Customer.find({fields:fields}, function(err, res) {
            cb(null, res);
        })
    }
    
   Customer.remoteMethod(
    'excludeFields',
    {
        http:{path:'/excludeFields', verb:'get'},
        returns: {arg:'msg', type:'string'}
    }
   ); 

    Customer.testInclude = function(cid,cb) {
        var fields = {cutName:true, address:true, id:true};
        Customer.find({
            fields:fields,
            where:{id:cid},
            include:['orders']
        }, function(err, res) {
            cb(null, res);
        })
    }
    
   Customer.remoteMethod(
    'testInclude',
    {
        http:{path:'/testInclude', verb:'get'},
        accepts:[
            {arg: 'cid', type: 'string'} 
        ],
        returns: {arg:'msg', type:'string'}
    }
   ); 
    Customer.testComplexInclude = function(cid,cb) {
        var fields = {cutName:true, address:true, id:true};
        Customer.find({
            fields:fields,
            where:{id:cid},
            include: {
                relation:'orders',
                scope:{
                    fields:{orderNo:true, productName:true, productNumber:true},
                    limit:1
                }
            }
        }, function(err, res) {
            cb(null, res);
        })
    }
    
   Customer.remoteMethod(
    'testComplexInclude',
    {
        http:{path:'/testComplexInclude', verb:'get'},
        accepts:[
            {arg: 'cid', type: 'string'} 
        ],
        returns: {arg:'msg', type:'string'}
    }
   ); 


}
