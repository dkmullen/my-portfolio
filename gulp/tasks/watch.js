/*jshint esversion: 6 */

const gulp = require('gulp'),
  watch = require('gulp-watch'), // monitor changes to files and react
  browserSync = require('browser-sync').create(); // Browser auto refresh, sync across many screens

gulp.task('watch', () => {
  /* Sets up a web server to serve, reload our page, with other nifty features */
  browserSync.init({
    notify: false, // turn off notification in top corner
    server: {
      baseDir: 'app'
    }
  });

  // On changes to index.html, redisplay the page w/o a full reload */
  watch('./app/index.html', () => {
    browserSync.reload();
  });

  // On changes to any css file under /styles, run the styles task, above
  watch('./app/resources/styles/**/*.css', () => {
    gulp.start('cssInject');
  });

  // On changes to any js file in this path, run the scripts task, above
  watch('./app/resources/scripts/**/*.js', () => {
    gulp.start('scriptsRefresh');
    });
}); // End of watch task

/* Below, styles is a dependency, meaning cssInject won't run till styles
    runs and updates the css */
gulp.task('cssInject', ['styles'], () => {
  return gulp.src('./app/temp/styles/styles.css')
    .pipe(browserSync.stream());
});

gulp.task('scriptsRefresh', ['scripts'], () => {
  browserSync.reload();
});
