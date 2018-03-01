/*global define, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  CHANGED 2018-01-25
  IDEA    Hook up various sub systems
  NOTE    bind events, store configs
  TODO    ???

 */
define(['jqxtn', 'uxtra', 'model', 'accuracy', 'possession', 'rankings', 'shotsfaced', 'timeline',
], function ($, UT, Model, Accuracy, Possession, Rankings, Shotsfaced, Timeline) {
  'use strict';

  var API, EL;
  var NOM = 'Main';
  var C = console;
  var W = window;
  C.debug(NOM, 'loaded');

  // - - - - - - - - - - - - - - - - - -

  function _revMenu() {
    UT.picker.menu(EL.menu, Model.games);
    EL.menu.val(Model.current);
  }

  function renderGame(num) {
    var game, stats;

    try {
      game = Model.getGame(num);
      stats = game.match;

      _revMenu();

      $('section div').hide().fadeIn();

      Shotsfaced.init(stats.shots);
      Timeline.init(stats.events);
      Accuracy.init(stats.accuracy);
      Rankings.init(game.grouping);
      Possession.init('.donut', stats.possession);

      /// TOP
      EL.top //
        .find('.team_left').text(stats.teams[0]).end() //
        .find('.team_right').text(stats.teams[1]);
      EL.score //
        .find('.center').text(stats.score.join('-')).end() //
        .find('.left img').attr({
          src: './images/flags/' + Model.getTeam(stats.teams[0]).flag,
          alt: stats.teams[0],
        }).end() //
        .find('.right img').attr({
          src: './images/flags/' + Model.getTeam(stats.teams[1]).flag,
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

      // cleanup
      $('img.fill.raise').remove();
      $('.fill').lifter();
      $('img').each(function (i, e) {
        var img = $(e);
        img.attr('title', img.attr('alt'));
      });

      // info stuff
      var src = JSON.stringify(Model.games, function (k, v) {
        return (v && v.join && typeof v[1] !== 'object') ? v.join('|') : v;
      }, 4);

      EL.menu.attr('title', src).parent() //
        .off('dblclick').on('dblclick', function () {
          var tab = W.open('?');
          tab.document.write(`<pre>${src}</pre>`);
          tab.document.title = 'Raw data for games';
        }).attr('title', 'Double-click for more info.') //
        .hide().fadeIn(3333);

      UT.initFinish();
    } catch (err) {
      C.error(NOM, err, game, num);
    }
  }

  // - - - - - - - - - - - - - - - - - -

  EL = {
    fact: '.thefact',
    factpic: '.factpic',
    menu: '#GameNum',
    player: '.theplayer',
    score: '.top .score',
    shot: '.theshot',
    ticket: '.top .ticket',
    top: '.top',
    tweet: '.thetweet',
  };
  API = Object.create({
    Model: Model,
    Accuracy: Accuracy,
    Possession: Possession,
    Rankings: Rankings,
    Shotsfaced: Shotsfaced,
    Timeline: Timeline,
  });

  // - - - - - - - - - - - - - - - - - -
  // PAGE LOADED

  function init() {
    $.reify(EL);
    renderGame(1);

    EL.menu.change(function (evt) {
      renderGame($(evt.target).val());
    });

    // if (C > 0) { require(['_tests']); }
    C.warn(NOM, 'inited @ ' + W._dbug, API);
    API.init = 'INITED';
  }

  $.extend(API, {
    init: init,
    //
    _: NOM,
    EL: EL,
    UT: UT,
  });

  return API;
});
/*



 */
