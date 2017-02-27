/*jslint white:false */
/*global require, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var W = (W && W.window || window),
  C = (W.C || W.console || {});

W._dbug = Number(new Date('2017/02/21') > new Date());
W.SHIET = {
  trident: W.navigator.userAgent.indexOf('rident') + 1,
};

require.config({
  baseUrl: 'scripts',
  paths: {
    lib: 'libs',
    jquery: '../vendors/jquery/jquery',
    lodash: '../vendors/lodash.js/lodash.underscore',
    //
    beacon: 'libs/ecg-beacon',
    jqxtn: 'libs/jq-xtn',
    stats: 'libs/ecg-stats',
    //
    main: '_main',
    data: 'libs/data',
    util: 'libs/util',
    ui: 'libs/ui',
    //
  },
  shim: {
    main: {
      deps: ['util', 'data',
        'accuracy',
        'handlers',
        'possession',
        'rankings',
        'shotsfaced',
        'timeline',
      ],
    },
  },
});

require(['jqxtn', 'data'], function ($) {
  var loc = W.location.hostname === 'localhost';

  // ESTABLISH BASELINES

  try {
    if (W.SHIET.trident) { // debug IE less
      $('html').addClass('msie');
      W._dbug -= 1;
    } else if (loc) {
      $('html').addClass('debug');
      W._dbug += 1;
    }
  } catch (err) {
    C.error('config', err);
  }

  /// CUSTOMIZED INIT

  require(['main', '../data/g2', '../data/g1'], function (Main, Data) {

    $(Main.init);

    if (W._dbug > 0)
      W.Main = Main; // expose
  });

});
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
