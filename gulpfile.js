var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var strip = require('gulp-strip-comments');

var pJson = require("./package.json");
var inject = require("gulp-inject-string");

gulp.task('scripts', function() {

    var versionNumber = pJson.version;

    gulp.src('src/ko-dropzone.js')
        .pipe(uglify({ preserveComments: "license" }))
        .pipe(rename('ko-dropzone.min.js'))
        .pipe(inject.replace("{{versionNumber}}", versionNumber))
        .pipe(gulp.dest('dist'));

    gulp.src('src/ko-dropzone.js')
      .pipe(inject.replace("{{versionNumber}}", versionNumber))
      .pipe(gulp.dest('dist'));

});

gulp.task('watch', function(){
  gulp.watch("src/kavie.js", ['scripts'])
})

gulp.task('default', ['scripts']);
