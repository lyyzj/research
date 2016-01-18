module.exports = function(app) {
    var Customer1 = app.models.Customer1;
    Customer1.deleteById = function(id, cb) {
        console.log("delete id:%s", id);
        Customer1.update({id:id}, {deleted:true}, cb);
    }
}
