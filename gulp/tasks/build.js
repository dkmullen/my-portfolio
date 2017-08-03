/*jshint esversion: 6 */

const gulp = require('gulp'),
  imagemin = require('gulp-imagemin'), // minify images
  del = require('del'), // to repeatedly delete working files b4 rebuilding them
  usemin = require('gulp-usemin'), // on build, redirects CSS and JS links in HTML to build versions
  rev = require('gulp-rev'), // adds a hash after filenames to force browser refresh for new files
  cssnano = require('gulp-cssnano'), // minify css
  uglify = require('gulp-uglify'), // minify js
  browserSync = require('browser-sync').create();

gulp.task('previewDist', () => {
  browserSync.init({
    server: {
      baseDir: 'docs'
    }
  });
});

gulp.task('deleteDistFolder', ['icons'], () => {
  return del('./docs');
});

gulp.task('copyGeneralFiles', ['deleteDistFolder', 'icons'], () => {
  let pathsToCopy = [
    './app/**/*',
    '!./app/index.html',
    '!./app/resources/images/**',
    '!./app/resources/styles/**',
    '!./app/resources/scripts/**',
    '!./app/temp',
    '!./app/temp/**',
  ];
  return gulp.src(pathsToCopy)
    .pipe(gulp.dest('./docs'));
});

gulp.task('optimizeImages', ['deleteDistFolder'], () => {
  return gulp.src(['./app/resources/images/**/*',
    '!./app/resources/images/icons',
    '!./app/resources/images/icons/**/*'])
    .pipe(imagemin({
      progressive: true,
      interlaced: true,
      multipass: true
    }))
    .pipe(gulp.dest('./docs/resources/images'));
});

gulp.task('useminTrigger', ['deleteDistFolder'], () => {
  gulp.start('usemin');
});

gulp.task('usemin', ['styles', 'scripts'], () => {
  return gulp.src('./app/index.html')
    .pipe(usemin({
      css: [() => {return rev()}, () => {return cssnano()}],
      js: [() => {return rev()}, () => {return uglify()}]
    }))
    .pipe(gulp.dest('./docs'));
});

gulp.task('build', ['deleteDistFolder', 'copyGeneralFiles', 'optimizeImages', 'useminTrigger']);
