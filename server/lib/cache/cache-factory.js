module.exports = function(options) {
    return require('./providers/' + options.provider)(options);
}
