'use strict'

var gulp = require("gulp");
var wrench = require("wrench");

/* 遍历gulp目录下的文件，根据gulp命令后的参数来require对应的任务*/
wrench.readdirSyncRecursive('./gulp').filter(function(file) {
  return (/\.(js|coffee)$/i).test(file);
}).map(function(file) {
  require('./gulp/' + file);
});

/* 默认任务是先做clean操作后，然后进行build*/
gulp.task('default', ['clean'], function() {
    gulp.start("build");        
});
