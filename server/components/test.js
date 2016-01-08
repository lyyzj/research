module.exports = function (loopbackApplication, options) {
    loopbackApplication.use(options.path, function(req, res, next) {
        console.log(loopbackApplication);
        res.send('test components');
    })
}
