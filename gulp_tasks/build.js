/*global process */
/**
 * Task: Build
 * --------------------------------------------------
 * 2017-05-15
 */

// Dependencies
var gulp /*   */ = require('gulp');
var runSeq /* */ = require('run-sequence');

// Task
gulp.task('build', function (cb) {

  // Run tasks synchronously
  return runSeq(
    ['assets'], ['scripts'], ['styles'], ['views'],
    cb
  );
});
