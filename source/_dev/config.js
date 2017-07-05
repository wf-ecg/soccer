/*jslint white:false */
/*global require, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
require.config({
  baseUrl: 'scripts',
  paths: {
    lib: 'libs',
    jquery: '../vendors/jquery/jquery.min',
    lodash: '../vendors/lodash.js/lodash.min',
    //
    beacon: 'libs/ecg-beacon',
    jqxtn: 'libs/jq-xtn',
    stats: 'libs/ecg-stats',
    //
    main: '_main',
    util: 'libs/util',
    ui: 'libs/ui',
  },
  shim: {
    _main: {
      // deps: ['slick'],
    },
  },
});

require(['lib/jq-xtn', 'lib/dbug'], function ($, Dbug) {
  var W = window;
  W._dbug = Dbug('2017/07/25');
  W._dbug.reduceBy(1);
  W._msie = ~W.navigator.userAgent.indexOf('rident');

  // - - - - - - - - - - - - - - - - - -
  // ESTABLISH BASELINES
  if (W._msie) {
    $('html').addClass('msie'); // debug IE less
  }
  if (W._dbug > 1) {
    $('html').addClass('debug');
  }

  // - - - - - - - - - - - - - - - - - -
  /// CUSTOMIZED INIT
  require(['data', 'main'], function (Data, Main) {
    require.config({
      paths: {
        games: '../data',
      },
    });
    Data.readFrom('data/index.html', Main.init);

    if (W._dbug > 0) W.Main = Main; // expose
  });

});
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
