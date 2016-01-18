module.exports = function(app) {
    var properties = {
      f1: { type: "string", required: true },
      otherF1: { type: "number" }
    };

    app.model('customModel', {
      properties: properties, 
      description: "customize model",
      plural: "customModels",
      dataSource: 'mongodb'
    });
}
