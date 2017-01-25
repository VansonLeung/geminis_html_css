var gulp = require('gulp');
var sass = require('gulp-sass');
var merge = require('merge-stream');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var headerfooter = require('gulp-headerfooter');
var runSequence = require('run-sequence');

gulp.task('styles', function() {
  var sassStream;

  sassStream = gulp.src('css/scss/**/*.scss')
      .pipe(sass({
        errLogToConsole: true
      }));

  //merge the two streams and concatenate their contents into a single file
  return merge(sassStream)
      .pipe(concat('app.css'))
      .pipe(gulp.dest('./dist/css/'));
});


gulp.task('mergehtml', function() {

  gulp.src('./html/**/*.html')
      .pipe(headerfooter.header('./html_partials/header.html'))
      .pipe(headerfooter.footer('./html_partials/footer.html'))
      .pipe(gulp.dest('./dist/html/'));
});


//Watch task
gulp.task('default',function() {
  gulp.src('calendarjquerycss3/**/*')
      .pipe(gulp.dest('./dist/calendarjquerycss3/'));
  gulp.src('fonts/**/*')
      .pipe(gulp.dest('./dist/fonts/'));
  gulp.src('images/**/*')
      .pipe(gulp.dest('./dist/images/'));
  gulp.src('js/**/*')
      .pipe(gulp.dest('./dist/js/'));
  gulp.src('slick/**/*')
      .pipe(gulp.dest('./dist/slick/'));
  runSequence('styles', 'mergehtml');
  gulp.watch('css/scss/**/*.scss',['styles']);
  gulp.watch('html/**/*.html',['mergehtml']);
  gulp.watch('html_partials/**/*.html',['mergehtml']);
});