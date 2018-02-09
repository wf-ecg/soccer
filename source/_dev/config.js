/*global require, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  revised 2017-11-22

  NOTE: config and bootstrap
  - extend jquery
  - identify Msie
  - initialize dbug and main

  TODO: keep simple

 */
require.config({
  baseUrl: 'scripts',
  paths: {
    lib: 'libs',
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
    ui: 'libs/ui',
    util: 'libs/util',
    uxtra: 'libs/util-xtra',
    games: '../data',
  },
  shim: {
    _main: {
      deps: ['bondo'],
    },
  },
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

require(['jquery', 'lib/dbug'], function ($, Dbug) {
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
    W._dbug.mute(); // stop applying to console
  } else {
    W._dbug.silent(); // stop most of console
  }

  // - - - - - - - - - - - - - - - - - -
  /// CUSTOMIZATIONS
  require(['model', 'main'], function (Model, Main) {

    // lazily init
    Model.readFrom('data/index.html', Main.init);

    // expose for debug
    if (W._dbug > -1) W.Main = Main;
  });

});
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
