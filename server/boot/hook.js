module.exports = function(app) {
    var remotes = app.remotes();
    remotes.after('LogicArg.*', function(ctx, next) {
        ctx.result = {
            fdata:ctx.result 
        };  
        next();
    });
}
