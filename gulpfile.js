/*jshint esversion: 6 */

const gulp = require('gulp'),
  watch = require('gulp-watch'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  cssvars = require('postcss-simple-vars'),
  nested = require('postcss-nested');

gulp.task('default', () => {
  console.log("Here is my default task.");
});

gulp.task('html', () => {
  console.log('Imagine a useful html task here');
});

gulp.task('styles', () => {
  return gulp.src('./app/resources/styles/styles.css')
    .pipe(postcss([nested, cssvars, autoprefixer]))
    .pipe(gulp.dest('./app/temp/styles.css'));
});

gulp.task('watch', () => {
  watch('./app/index.html', () => {
    gulp.start('html');
  });
  watch('./app/resources/styles/**/*.css', () => {
    gulp.start('styles');
  });
});
