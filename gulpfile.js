var gulp = require('gulp');

var replace = require('gulp-replace');
var run     = require('gulp-run');

gulp.task('polymer-build', function() {
    return run('polymer build').exec();
});

gulp.task('cordova-replace', function() {
  return gulp.src([
      './build/default/service-worker.js',
      './build/default/index.html',
      './build/default/**/*.html'
    ])
    .pipe(replace("ga('send', 'pageview');", 'ga("send", "pageview");</script><script type="text/javascript" charset="utf-8">function onLoad() { document.addEventListener("deviceready", onDeviceReady, false);} function onDeviceReady() { window.ga.startTrackerWithId("UA-97747072-1"); }'))
    .pipe(replace('</head><body><recipes-wild>', '</head><body onload="onLoad()"><recipes-wild>'))
    .pipe(replace('<a href="https://play.google.com/store/apps/details?id=com.pepocivs.recipesofthewild" target="_blank"><img class="see-on-store" src="../images/google_play.png"></a>', ''))
    .pipe(replace('/src/', 'src/'))
    .pipe(replace('../../images/rupee_wh.png', '/android_asset/www/images/rupee_wh.png'))
    .pipe(replace('../../images/pira.svg', '/android_asset/www/images/pira.svg'))
    .pipe(replace('../../images/', '/android_asset/www/images/'))
    .pipe(replace('../images/', '/android_asset/www/images/'))
    .pipe(replace('https://api.', 'http://api.'))
    .pipe(replace('.custom-background{background-color:#33485c;}', '.custom-background{background-color:#33485c;margin-top:64px;}'))
    .pipe(gulp.dest('./build/default'));
});


gulp.task('cordova-build', gulp.series('polymer-build', 'cordova-replace'));
