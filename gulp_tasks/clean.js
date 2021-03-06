/*global process */
/*eslint no-console: 'off' */
/**
 * Task: Clean
 * --------------------------------------------------
 * 2017-05-15
 */

// Dependencies
var gulp /* */ = require('gulp');
var del /*  */ = require('del');

// Task
gulp.task('clean', function (cb) {
  // Beware: The glob pattern ** matches all children and the parent.
  del(['./.sass-cache/*', './build/**', '!./build']).then(paths => {
    console.log('Deleted files and folders:', '\n', paths);
  }).then(cb);
});
