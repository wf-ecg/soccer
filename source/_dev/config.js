/*jslint white:false */
/*global require, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var W = (W && W.window || window),
    C = (W.C || W.console || {});

W._dbug = Number(new Date('2017/01/01') > new Date());
W.SHIET = {
  trident: W.navigator.userAgent.indexOf('rident') + 1,
};

require.config({
  baseUrl: 'scripts',
  paths: {
    lib: 'libs',
    jquery: '../vendors/jquery/jquery',
    lodash: '../vendors/lodash.js/lodash',
    //
    beacon: 'libs/ecg-beacon',
    jqxtn: 'libs/jq-xtn',
    stats: 'libs/ecg-stats',
    //
  },
  shim: {
    jqmobi: {
      deps: ['jquery'],
      exports: '$',
    },
  },
});

require(['jqxtn'], function ($) {
  var loc = W.location.hostname === 'localhost';

  // ESTABLISH BASELINES

  try {
    if (W.SHIET.trident) { // debug IE less
      $('html').addClass('msie');
      W._dbug -= 1;
    } else if (loc) {
      W._dbug += 1;
    }
  } catch (err) {
    C.error('config', err);
  }

  /// CUSTOMIZED INIT

  require(['_main'], function (Main) {

    $(Main.init);

    if (W._dbug > 0)
      W.Main = Main; // expose
  });

});
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
