/*

 r.js -o build/dist.js

 * http://requirejs.org/docs/optimization.html
 *
 * See: https://github.com/jrburke/r.js/blob/master/build/example.build.js for an example build script
 *
 * If you specify just the name (with no includes/excludes) then all modules are combined into the "main" file.
 * You can include/exclude specific modules though if needed (this helps with 'lazy loading' scripts)
 *
 * You can also set optimize: "none" (defaults to uglifyjs).
 *
 * Node: if you set relative paths then do them relative to the baseUrl
 */
({
  baseUrl: 'scripts',
  appDir: '../build',
  dir: '../dist',
  mainConfigFile: 'config.js',

  /*
   * The below 'paths' object is useful for when using plugins/named module paths.
   * If you use plugins or named modules in your code then don't forget to specify the same paths again in your build script.
   * Otherwise your build script wont be able to find your plugins/named modules and will generate an error when building.
   */
  paths: {
    // ven: '../vendors',
    // jquery: '../vendors/jquery/jquery.min',
    // lodash: '../vendors/lodash.js/lodash.min',
    stats: 'libs/ecg-stats',
  },
  deps: ['../rtree'],
  // optimize: 'none',
  uglify: {
    mangle: false
  },
  useStrict: true,
  // findNestedDependencies: true,
  modules: [{
    name: 'stats',
    exclude: ['jquery', 'lodash'],
  }, {
    name: '_main',
    exclude: ['jquery', 'lodash'],
  }],
});
