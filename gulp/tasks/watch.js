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

  // On changes to index.html, redisplay the page w/o a full reload
  watch('./app/index.html', () => {
    browserSync.reload();
  });

  // On changes to any css file under /styles, run the cssInject task, below
  watch('./app/resources/styles/**/*.css', () => {
    gulp.start('cssInject');
  });

  // On changes to any js file in this path, run the scriptsRefresh task, below
  watch('./app/resources/scripts/**/*.js', () => {
    gulp.start('scriptsRefresh');
    });
}); // End of watch task

/* On change to styles, inject it straigt into the browser via browserSync
   w/out a refresh (but wait for styles tasks in styles module to run ) */
gulp.task('cssInject', ['styles'], () => {
  return gulp.src('./app/temp/styles/styles.css')
    .pipe(browserSync.stream());
});

/* On change to js files, refresh the browser via browserSync (but
    wait for scripts tasks in scripts module to run ) */
gulp.task('scriptsRefresh', ['scripts'], () => {
  browserSync.reload();
});
