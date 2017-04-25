var gulp = require('gulp');

var jshint  = require('gulp-jshint');
var sass    = require('gulp-sass');
var concat  = require('gulp-concat');
var uglify  = require('gulp-uglify');
var rename  = require('gulp-rename');
var replace = require('gulp-replace');

gulp.task('polymer-build', function() {
    console.log('polyBuild');
});

gulp.task('replace', function(){
  gulp.src([
      '/build/default/index.html',
      '/build/default/src/*.html',
      '/build/default/src/**/*.html'
    ])
    .pipe(replace('/src/', 'src/'))
    .pipe(replace('../images/items', '/android_asset/www/images/items'))
    .pipe(replace('https://api.', 'http://api.'))
    .pipe(replace('.custom-background{background-color:#33485c;}', '.custom-background{background-color:#33485c;margin-top:64px;}'))
    .pipe(gulp.dest('/build/default'));
});

gulp.task('build-cordova', ['polymer-build', 'replace']);
