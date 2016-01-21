module.exports = function(Model, options) {
    Model.defineProperty('createAt', {
        type: 'Date',
        defaultFn: 'now'
    });
    Model.defineProperty('testOpt', {
        type: 'Number',
        default: options.test + 1
    });
}
