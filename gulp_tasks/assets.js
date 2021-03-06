/*global process */
/**
 * Task: Assets
 * --------------------------------------------------
 * 2017-05-15
 */

// Dependencies
var gulp /*     */ = require('gulp');
var minimist /* */ = require('minimist');
var runSeq /*   */ = require('run-sequence');
var changed /*  */ = require('gulp-changed');
//var copy         = require('gulp-copy');
var imagemin       = require('gulp-imagemin');

// Build options
var options = minimist(process.argv.slice(2), {
  string: ['env'],
  default: {
    env: 'dev',
  },
});

// Task
gulp.task('assets', function (cb) {

  // Run tasks synchronously
  return runSeq(
    ['data'], ['fonts'], ['images'], ['media'], ['misc'], ['vendors'],
    cb
  );
});

// Data
gulp.task('data', function () {
  return gulp.src('./source/data/**/*')
    .pipe(changed('./build/data'))
    .pipe(gulp.dest('./build/data'));
});

// Fonts
gulp.task('fonts', function () {
  return gulp.src('./source/fonts/**/*')
    .pipe(changed('./build/fonts'))
    .pipe(gulp.dest('./build/fonts'));
});

// Images
gulp.task('images', function () {
  return gulp.src(['./source/images/**/*', '!./source/images/**/*.psd'])
    .pipe(changed('./build/images'))
    .pipe(imagemin({
      optimizationLevel: 3,
      progressive: true,
      svgoPlugins: [{ removeViewBox: false }],
    }))
    .pipe(gulp.dest('./build/images'));

});

// Media
gulp.task('media', function () {
  return gulp.src('./source/media/**/*')
    .pipe(changed('./build/media'))
    .pipe(gulp.dest('./build/media'));
});

// Misc
let opts = {
  dot: true,
};
gulp.task('misc', function () {
  return gulp.src(
    [
      './source/_' + options.env + '/**/*',
      './source/_all/**/*',
    ], opts)
    .pipe(changed('./build'))
    .pipe(gulp.dest('./build'));
});

// Vendors
gulp.task('vendors', function () {
  return gulp.src('./source/vendors/**/*')
    .pipe(changed('./build/vendors'))
    .pipe(gulp.dest('./build/vendors'));
});
