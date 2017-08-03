/*jshint esversion: 6 */

const gulp = require('gulp'),
  modernizr = require('gulp-modernizr'); // Detects old/new browsers, adjusts to their features

gulp.task('modernizr', () => {
  return gulp.src(['./app/resources/styles/**/*.css', './app/resources/scripts/**/*.js'])
    .pipe(modernizr({
      "options": [
        "setClasses"
      ]
    }))
    .pipe(gulp.dest('./app/temp/scripts/'));
});
