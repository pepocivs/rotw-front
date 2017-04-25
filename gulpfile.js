var gulp = require('gulp');

var replace = require('gulp-replace');
var run     = require('gulp-run');

gulp.task('set-analytics', function() {
    run('git checkout feature/cordova-analytics').exec();
});
gulp.task('polymer-build', function() {
    run('polymer build').exec();
});

gulp.task('replace', function(){
  gulp.src([
      './build/default/service-worker.js',
      './build/default/index.html',
      './build/default/**/*.html'
    ])
    .pipe(replace('/src/', 'src/'))
    .pipe(replace('../images/items', '/android_asset/www/images/items'))
    .pipe(replace('https://api.', 'http://api.'))
    .pipe(replace('.custom-background{background-color:#33485c;}', '.custom-background{background-color:#33485c;margin-top:64px;}'))
    .pipe(gulp.dest('./build/default'));
});

gulp.task('build-cordova', ['set-analytics', 'polymer-build', 'replace']);
