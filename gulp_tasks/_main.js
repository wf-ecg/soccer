/**
 * Gulp (_main.js)
 * --------------------------------------------------
 */

'use strict';

global.console.log(`
GULPFILE  2017-08-08  (sourcing all task files)
`);

// Dependencies
var gulp /*       */ = require('gulp');
var plumber /*    */ = require('gulp-plumber');
var gutil /*      */ = require('gulp-util');

// Error handling
var gulp_src = gulp.src;

gulp.src = function () {
  return gulp_src.apply(gulp, arguments)
    // Catch errors
    .pipe(plumber(function (error) {
      gutil.log(gutil.colors.red('Error (' + error.plugin + '): ' + error.message));
      this.emit('end');
    }));
};
