var gulp = require('gulp'),
    gutil = require('gulp-util'),
    path = require('path'),
    less = require('gulp-less'),
    browserify = require('browserify'),
    transform = require('vinyl-transform'),
    sourcemaps = require('gulp-sourcemaps'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    uglify = require('gulp-uglify'),
    stringify = require('stringify'),
    babelify = require('babelify'),
    reactify = require('reactify');

var onError = function(err) {
    console.error(err.message);
}

gulp.task('javascript', function () {
  // set up the browserify instance on a task basis
  var b = browserify({
    entries: './src/js/inject.js',
    debug: true
  }).transform(babelify)
  .transform(reactify);

  return b.bundle()
    .pipe(source('inject.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .pipe(uglify())
        .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('mv-html', function() {
  gulp.src('src/override.html')
  .pipe(gulp.dest('dist/'));
});

gulp.task('less', function() {
  gulp.src('src/style/less/style.less')
  .pipe(less({style: 'compressed' }).on('error', gutil.log))
  .pipe(gulp.dest('dist/css/'))
});

gulp.task('watch', function() {
  gulp.watch(['src/**/*.js'], [
    'javascript'
  ]);
  gulp.watch(['src/**/*.less'], [
    'less'
  ]);
  gulp.watch(['src/**/*.html'], [
    'mv-html'
  ]);
});

gulp.task('dist', ['less', 'mv-html', 'javascript'], function() {
  console.log( "Dist built @ " + new Date());
});

gulp.task('default', ['dist', 'watch'], function() {
  console.log("Watching Source files");
});