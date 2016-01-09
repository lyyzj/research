#!/usr/bin/env node

//1对多的查询时，对protected的属性的测试，结果正确, 属性会被隐藏不显示
var app = require("../server.js");

var BaseRelation = app.models.BaseRelation;

BaseRelation.find({include:"baseTests"}, function(err, res) {
    console.log(res[0].toJSON().baseTests);
})

