/*global define, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  CHANGED 2018-03-13
  IDEA    Hook up various sub systems
  NOTE    bind events, store configs
  TODO    ???

 */
define([
  'jqxtn', 'util_x', 'model', 'accuracy', 'possession', 'rankings', 'shotsfaced', 'timeline',
], function ($, U, Model, Accuracy, Possession, Rankings, Shotsfaced, Timeline) {
  'use strict';

  var API, EL;
  var [NOM, C, W] = ['Main', console, window];
  C.debug(NOM, 'loaded');

  // - - - - - - - - - - - - - - - - - -

  API = Object.create({
    init: null,
    _: NOM,
    Model: Model,
    Accuracy: Accuracy,
    Possession: Possession,
    Rankings: Rankings,
    Shotsfaced: Shotsfaced,
    Timeline: Timeline,
  });

  EL = Object.create({
    dial: '.donut',
    fact: '.the-fact',
    factpic: '.the-portrait',
    main: 'main',
    menu: '#GameNum',
    page: 'html',
    player: '.the-player',
    score: '.the-top .score',
    shot: '.the-photo',
    ticket: '.the-top .ticket',
    tweet: '.the-tweet',
  });

  // - - - - - - - - - - - - - - - - - -

  function updatePicker(num) {
    U.picker(EL.menu, Model.games);
    EL.menu.val(num);
    EL.main.hide().fadeTo(333, 1);
  }

  function initModules(game, stats) {
    var colors = Model.getColors();

    Shotsfaced.load(stats.shots);
    Timeline.load(stats.events);
    Accuracy.load(stats.accuracy, colors);
    Rankings.load(game.grouping);
    Possession.load(EL.dial, stats, colors);
  }

  function updateDisplay(game, stats) {
    /// general
    EL.main //
      .find('.team_left').text(stats.teams[0]).end() //
      .find('.team_right').text(stats.teams[1]);

    /// TOP
    EL.score //
      .find('.center').text(stats.score.join('-')).end() //
      .find('.left img').attr({
        src: `./images/flags/${Model.getTeam(stats.teams[0]).flag}`,
        alt: stats.teams[0],
      }).end() //
      .find('.right img').attr({
        src: `./images/flags/${Model.getTeam(stats.teams[1]).flag}`,
        alt: stats.teams[1],
      });
    EL.ticket //
      .find('.date').text(stats.ticket[0]).end() //
      .find('.stadium').text(stats.ticket[1]).end() //
      .find('.city').text(stats.ticket[2]);

    // TWEET
    EL.tweet.find('p') //
      .html(game.tweet.text.join(' ')).end() //
      .find('.author').html(game.tweet.author);

    // Did you know
    EL.fact.find('p') //
      .html(game.fact.text.join(' '));

    // Jersey
    EL.player.find('img').first() //
      .attr({
        src: `./images/${game.pics.player[0]}`,
        alt: game.pics.player[1],
      });

    // SHOT of the match
    EL.shot.find('img.fill').first() //
      .attr({
        src: `./images/${game.pics.shot[0]}`,
        alt: game.pics.shot[1],
      });

    // FACT pic
    EL.factpic.find('img.fill') //
      .attr({
        src: `./images/${game.pics.fact[0]}`,
        alt: game.pics.fact[1],
      }).end() //
      .find('h3').text(`${game.pics.fact[1].match(/\S+ ?\w*/)}`);
  }

  function exposeModel(game) {
    var bigsrc = U.stringify(Model.games);
    var lilsrc = U.stringify(game);

    EL.menu.attr('title', lilsrc).parent() //
      .off('dblclick').on('dblclick', function () {
        var tab = W.open('?');
        tab.document.write(`<pre>${bigsrc}</pre>`);
        tab.document.title = 'Raw data for games';
      }).attr('title', 'Double-click for more info.') //
      .hide().fadeIn(999);
  }

  function renderGame(num) {
    var game, stats;

    try {
      W.localStorage.game = num;
      game = Model.getGame(num);
      stats = game.match;

      initModules(game, stats);
      updateDisplay(game, stats);
      updatePicker(num);
      exposeModel(game);

      U.addPicLifters(['sm', 'md']);
      U.attributeTitles('img');

      U.initFinish();
    } catch (err) {
      C.error(NOM, err, game, num);
    }
  }

  // - - - - - - - - - - - - - - - - - -
  // PAGE LOADED

  function bind() {
    $.reify(EL);
    $.inlineSvgs();
    $.pubEscape();
    $.watchInputDevice();
    $.adaDebug();

    EL.page.finishLoading();
    // $('.ghost *').greeker();
  }

  function init() {
    bind(); // get the page viewable first

    var game = Number(W.localStorage.game || 1);
    renderGame(game);

    EL.menu.change(function (evt) {
      renderGame($(evt.target).val());
    });

    API.init = 'INITED';
    C.warn(NOM, 'inited @ ' + W._dbug, API);
    // if (W._dbug > 0) { require(['_tests']); }
  }

  $.extend(API, {
    init: init,
    //
    EL: EL,
    U: U,
  });

  return API;
});
/*



 */
