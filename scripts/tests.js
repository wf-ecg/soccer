/*jslint es5:true, white:false */
/*globals C, D, W, $,
    Data, Utils */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/// shorthand
var U = Utils;

var Test = $.Callbacks();

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

function kicker(num) {
    var div, datg, datm, flag1, flag2, tmp, menu;

    // U.pre('fire tests');    Test.fire();

    div = $('.top');
    datg = Data.game(num);
    menu = $('#GameNum');

    if (!this.inited) {
        U.picker.menu(menu, Data.games);
        this.inited = true;
    }

    menu.val(Data.current);

    $('section div').hide().fadeIn();

    datm = datg.match;
    flag1 = Data.team(datm.teams[0]).flag;
    flag2 = Data.team(datm.teams[1]).flag;

    Face.init(datm.shots);
    Line.init(datm.events);
    Bars.init(datm.accuracy);
    Circ.init('.preset2');
    Circ.svg.changed(-100 / 5);
    Circ.svg.changed(datm.possession / 5);
    U.tabler.set(datg.grouping).fillup();

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
    div.find('.teams .team_left').text(datm.teams[0]);
    div.find('.teams .team_right').text(datm.teams[1]);
    div.find('.ticket .date').text(datm.ticket[0]);
    div.find('.ticket .stadium').text(datm.ticket[1]);
    div.find('.ticket .city').text(datm.ticket[2]);

    // TWEET
    div = $('.tweet');
    div.find('p').text(datg.tweet.text.join(' '));
    div.find('.author').text(datg.tweet.author);

    // Did you know
    div = $('.facts');
    div.find('p').text(datg.fact.text.join(' '));

    // Jersey
    div = $('.player');
    tmp = datg.pics.player;
    div.find('img').first().attr({
        src: './images/' + tmp[0],
        alt: tmp[1],
    });

    // SHOT of the match
    div = $('.shot');
    tmp = datg.pics.shot;
    div.find('img.fill').first().attr({
        src: './images/' + tmp[0],
        alt: tmp[1],
    });

    // FACT pic
    div = $('.pic');
    tmp = datg.pics.fact;
    div.find('img.fill').attr({
        src: './images/' + tmp[0],
        alt: tmp[1],
    });
    div.find('h3').text(tmp[1].split(' ').slice(0, 2).join(' '));

    // cleanup
    $('img.fill.float').remove();
    $('.fill').lifter();

    $('img').each(function () {
        var me = $(this);
        me.attr('title', me.attr('alt'));
    });

    var src = JSON.stringify(Data.games, function (k, v) {
        return (v && v.join && typeof v[1]!=='object') ? v.join('...') : v;
    }, 4);
    menu.attr('title', src);

    menu.parent().off('dblclick').on('dblclick', function () {
        var w = W.open('?');
        w.document.write('<pre>' + src + '</pre>');
        w.document.title = 'Raw data for games';
    }).attr('title', 'Double-click for more info.')
}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

$(function () {
    kicker();
    $('#GameNum').change(function () {
        kicker($(this).val());
    });
});

/*


*/
