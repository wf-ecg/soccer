/*global require, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  CHANGED 2018-02-23
  NOTE: config and bootstrap
  - extend jquery
  - identify Msie
  - initialize dbug and main
  TODO: keep simple

 */
require.config({
  baseUrl: 'scripts',
  paths: {
    jquery: '../vendors/jquery/jquery.min',
    lodash: '../vendors/lodash.js/lodash.min',
    bondo: '../vendors/babel/polyfill.min',
    //
    beacon: 'libs/ecg-beacon',
    dialog: 'libs/dialog',
    jqxtn: 'libs/jq-xtn',
    modal: 'libs/modal',
    stats: 'libs/ecg-stats',
    //
    main: '_main',
    model: '_model',
    ui: 'libs/ui',
    util: 'libs/util',
    util_d: 'libs/util-dim',
    util_x: 'libs/util-xtra',
    games: '../data',
  },
  shim: {
    _main: {
      // deps: ['bondo'],
    },
  },
  urlArgs: '0', // cache BUST
  waitSeconds: 33,
});

var HOSTS = {
  loc: 'http://localhost',
  mac: 'http://10.94.211.93',
  dev: 'http://10.94.211.163',
  ecg: 'http://ecgsolutions.hosting.wellsfargo.com/marketing',
  adhocEnet: 'http://10.94.210.233',
  adhocWifi: 'http://11.112.37.111',
  macLaptop: 'http://c02q9bb1g8wn.local',
  pulseWifi: 'http://172.25.77.160',
};

require(['jquery', 'libs/dbug'], function ($, Dbug) {
  var W = window;
  W._dbug = Dbug('2020/01/01');
  W._host = (W._dbug > 1) ? HOSTS.loc : HOSTS.ecg;
  W._msie = ~W.navigator.userAgent.indexOf('rident');

  // - - - - - - - - - - - - - - - - - -
  // ESTABLISH BASELINES
  if (W._msie) {
    $('html').addClass('msie'); // debug IE less
    require(['bondo']);
  }

  if (W._dbug > 1 || W.location.hostname === 'localhost') {
    $('html').addClass('debug');
  } else if (W._dbug === 1) {
    // W._dbug.mute(); // stop applying to console
  } else if (W._dbug < 1) {
    W._dbug.silent(); // stop most of console
  }

  // - - - - - - - - - - - - - - - - - -
  /// CUSTOMIZATIONS
  require(['model', 'main'], function (Model, Main) {

    // lazily init
    Model.readFrom('data/index.html', Main.init);

    // expose for debug
    if (W._dbug > 0) W.Main = Main;
  });

});
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
