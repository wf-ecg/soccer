/*jslint es5:true, white:false */
/*global define */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
define(['libs/util-xtra', 'data', 'accuracy', 'possession', 'rankings', 'shotsfaced', 'timeline'], function (
  U, Data, accuracy, possession, rankings, shotsfaced, timeline) {
  'use strict';

  var W = (W && W.window || window);
  var C = (W.C || W.console || {});
  var self;
  var El = {
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

  function _revMenu() {
    U.picker.menu(El.menu, Data.games);
    El.menu.val(Data.current);
  }

  function renderGame(num) {
    var game, stats;

    try {
      game = Data.game(num);
      stats = game.match;

      _revMenu();

      $('section div').hide().fadeIn();

      shotsfaced.init(stats.shots);
      timeline.init(stats.events);
      accuracy.init(stats.accuracy);
      rankings.init(game.grouping);
      possession.init('.donut', stats.possession);

      /// TOP
      El.top //
        .find('.team_left').text(stats.teams[0]).end() //
        .find('.team_right').text(stats.teams[1]);
      El.score //
        .find('.center').text(stats.score.join('-')).end() //
        .find('.left img').attr({
          src: `./images/flags/${Data.team(stats.teams[0]).flag}`,
          alt: stats.teams[0],
        }).end() //
        .find('.right img').attr({
          src: `./images/flags/${Data.team(stats.teams[1]).flag}`,
          alt: stats.teams[1],
        });
      El.ticket //
        .find('.date').text(stats.ticket[0]).end() //
        .find('.stadium').text(stats.ticket[1]).end() //
        .find('.city').text(stats.ticket[2]);

      // TWEET
      El.tweet.find('p') //
        .html(game.tweet.text.join(' ')).end() //
        .find('.author').html(game.tweet.author);

      // Did you know
      El.fact.find('p') //
        .html(game.fact.text.join(' '));

      // Jersey
      El.player.find('img').first() //
        .attr({
          src: `./images/${game.pics.player[0]}`,
          alt: game.pics.player[1],
        });

      // SHOT of the match
      El.shot.find('img.fill').first() //
        .attr({
          src: `./images/${game.pics.shot[0]}`,
          alt: game.pics.shot[1],
        });

      // FACT pic
      El.factpic.find('img.fill') //
        .attr({
          src: `./images/${game.pics.fact[0]}`,
          alt: game.pics.fact[1],
        }).end() //
        .find('h3').text(`${game.pics.fact[1].match(/\S+\ ?\w*/)}`);

      // cleanup
      $('img.fill.raise').remove();
      $('.fill').lifter();
      $('img').each(function (i, e) {
        var img = $(e);
        img.attr('title', img.attr('alt'));
      });

      // info stuff
      var src = JSON.stringify(Data.games, function (k, v) {
        return (v && v.join && typeof v[1] !== 'object') ? v.join('|') : v;
      }, 4);

      El.menu.attr('title', src).parent() //
        .off('dblclick').on('dblclick', function () {
          var tab = W.open('?');
          tab.document.write(`<pre>${src}</pre>`);
          tab.document.title = 'Raw data for games';
        }).attr('title', 'Double-click for more info.') //
        .hide().fadeIn(3333);

      U.initFinish();
    } catch (err) {
      C.error(err, game, num);
    }
  }

  function _init() {
    if (self.inited) {
      return 'was inited';
    }

    self.inited = true;
    $.reify(El);
    renderGame(1);

    El.menu.change(function (evt) {
      renderGame($(evt.target).val());
    });
    return self;
  }

  self = {
    Data: Data,
    U: U,
    updateMenu: _revMenu,
    init: _init,
  };

  return self;
});
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*


 */
