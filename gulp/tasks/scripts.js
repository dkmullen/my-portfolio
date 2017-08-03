/*jshint esversion: 6 */

const gulp = require('gulp'),
  webpack = require('webpack');
  /* Webpack allows us to write js for the browser in modules, then transpiles
     them together into one file.*/
gulp.task('scripts', ['modernizr'], (callback) => {
  webpack(require('../../webpack.config.js'), (err, stats) => {
    if (err) {
      console.log(err.toString());
    }
    console.log(stats.toString());
    callback();
  });
});
