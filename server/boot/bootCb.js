function testCb() {
    console.log("call testCb function");
}
module.exports = function(app, testCb) {
    setTimeout(function() {
        console.log("async hello world"); 
        testCb();
    }, 3000);
}
