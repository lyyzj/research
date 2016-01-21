module.exports = function(Model, options) {
    Model.observe("before save", function(ctx, next) {

        if (ctx.instance) {
            //create
            if (ctx.instance.updateAt === undefined || ctx.instance.updateAt === '') {
                ctx.instance.updateAt = new Date();
            }
        } else {
            //update
            if (ctx.data.updateAt === undefined || ctx.data.updateAt === '') {
                ctx.data.updateAt = new Date();
            }
            ctx.data.isModify = true;
        }
        next();
    });
}
