/*jslint es5:true, white:false */
/*global define */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
define(['util', 'data', 'accuracy', 'possession', 'rankings', 'shotsfaced', 'timeline'], function (
  U, Data, accuracy, possession, rankings, shotsfaced, timeline) {
  'use strict';

  var W = (W && W.window || window);
  var C = (W.C || W.console || {});

  // var Test = $.Callbacks();
  var init;

  function kicker(num) {
    var div, datg, datm, flag1, flag2, tmp, menu;

    // U.pre('fire tests');    Test.fire();
    try {
      div = $('.top');
      datg = Data.game(num);
      menu = $('#GameNum');

      if (!init.inited) {
        U.picker.menu(menu, Data.games);
        init.inited = true;
      }

      menu.val(Data.current);

      $('section div').hide().fadeIn();

      datm = datg.match;
      flag1 = Data.team(datm.teams[0]).flag;
      flag2 = Data.team(datm.teams[1]).flag;

      shotsfaced.init(datm.shots);
      timeline.init(datm.events);
      accuracy.init(datm.accuracy);
      rankings.init(datg.grouping);
      possession.init('.donut', datm.possession);

      /// TOP
      div.find('.score .center').text(datm.score.join('-'));
      div.find('.score .left img').attr({
        src: './images/flags/' + flag1,
        alt: datm.teams[0],
      });
      div.find('.score .right img').attr({
        src: './images/flags/' + flag2,
        alt: datm.teams[1],
      });
      $('.team_left').text(datm.teams[0]);
      $('.team_right').text(datm.teams[1]);
      div.find('.ticket .date').text(datm.ticket[0]);
      div.find('.ticket .stadium').text(datm.ticket[1]);
      div.find('.ticket .city').text(datm.ticket[2]);

      // TWEET
      div = $('.thetweet');
      div.find('p').html(datg.tweet.text.join(' '));
      div.find('.author').html(datg.tweet.author);

      // Did you know
      div = $('.thefact');
      div.find('p').html(datg.fact.text.join(' '));

      // Jersey
      div = $('.theplayer');
      tmp = datg.pics.player;
      div.find('img').first().attr({
        src: './images/' + tmp[0],
        alt: tmp[1],
      });

      // SHOT of the match
      div = $('.theshot');
      tmp = datg.pics.shot;
      div.find('img.fill').first().attr({
        src: './images/' + tmp[0],
        alt: tmp[1],
      });

      // FACT pic
      div = $('.factpic');
      tmp = datg.pics.fact;
      div.find('img.fill').attr({
        src: './images/' + tmp[0],
        alt: tmp[1],
      });
      div.find('h3').text(tmp[1].split(' ').slice(0, 2).join(' '));

      // cleanup
      $('img.fill.raise').remove();
      $('.fill').lifter();

      $('img').each(function () {
        var me = $(this);
        me.attr('title', me.attr('alt'));
      });

      var src = JSON.stringify(Data.games, function (k, v) {
        return (v && v.join && typeof v[1] !== 'object') ? v.join('...') : v;
      }, 4);
      menu.attr('title', src);

      menu.parent().off('dblclick').on('dblclick', function () {
        var w = W.open('?');
        w.document.write('<pre>' + src + '</pre>');
        w.document.title = 'Raw data for games';
      }).attr('title', 'Double-click for more info.').hide().fadeIn(3333);

      U.initFinish();
    } catch (err) {
      C.error(err);
    }
  }

  init = function () {
    kicker();
    $('#GameNum').change(function () {
      kicker($(this).val());
    });
  };

  return {
    Data: Data,
    U: U,
    init: init,
  };
});
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*


 */
