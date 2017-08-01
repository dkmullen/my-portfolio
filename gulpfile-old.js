/*jshint esversion: 6 */

const gulp = require('gulp'),
  watch = require('gulp-watch'), // monitor changes to files and react
  postcss = require('gulp-postcss'), // main package to add post-processing to css
  autoprefixer = require('autoprefixer'), // adds vendor prefixes when needed
  cssvars = require('postcss-simple-vars'), // processes vars into valid css
  nested = require('postcss-nested'), // processes nested css into valid css
  cssImport = require('postcss-import'), // Allows for importing css as modules
  mixins = require('postcss-mixins'), // mixins are reusable bits of code
  hexrgba = require('postcss-hexrgba'), // allows use of hex variables w/in rgba brackets
  browserSync = require('browser-sync').create(); // Browser auto refresh, sync across many screens

gulp.task('default', () => {
  console.log("Here is my default task.");
});

gulp.task('html', () => {
  console.log('Imagine a useful html task here');
});

/* Sets up a web server to serve, reload our page, with other nifty features */
browserSync.init({
  server: {
    baseDir: 'app'
  }
});

// On changes to index.html, redisplay the page w/o a full reload */
watch('./app/index.html', () => {
  browserSync.reload();
});

gulp.task('styles', () => {
  return gulp.src('./app/resources/styles/styles.css') // Get this file...
    // ...run it thru these...
    .pipe(postcss([cssImport, mixins, cssvars, nested, hexrgba, autoprefixer]))
    .on('error', function(errorInfo) { // this crashes w/ fat-arrow function
      console.log(errorInfo.toString());
      this.emit('end'); // End this task gracefully on error
    })
    .pipe(gulp.dest('./app/temp/styles')); // ...then put it here.
});

gulp.task('watch', () => {
  watch('./app/index.html', () => {
    gulp.start('html');
  });
  watch('./app/resources/styles/**/*.css', () => {
    gulp.start('styles');
  });
});
