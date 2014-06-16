Data.addGame(0, {}, {
    match: {
        accuracy: 99,
        events: [
        /* time, side, type */
        [30, 'top', 'error'],
        [40, 'not', 'goal'],
        [50, 'not', 'goal'],
        [60, 'top', 'error'],
        ],
        possession: 1,
        teams: ['Mexico', 'Mexico'],
        ticket: ['January 1', 'Everywhere', 'Mexico'],
        score: [1, 0],
        shots: [
        /* goal, x, y */
        [false, 55, 60],
        [false, 45, 60],
        [true, 50, 50],
        ],
    },
    pics: {
        /* path, text, lift, size? */
        shot: ['shots/zeta1-sm.jpg', 'Shot of the Match'],
        fact: ['shots/czj1-sm.jpg', 'Catherine Z Jones'],
        player: ['jersey/ez_thanatos.png', 'Z. Jones Jersey'],
    },
    tweet: {
        text: [
        'Early morning flight to Chicago and on to champaign to shoot a wonderful movie:)',
        'more to come soon:) in the meantime make a stranger smile.',
        ],
        author: '@slappy_mcgee',
    },
    fact: {
        text: [
        'Catherine Zeta Jones (born 25 September 1969) is a Welsh actress,',
        'starring in the film adaptation of the musical Chicago (2002),',
        'a critical and commercial success.',
        ],
    },
    grouping: {
        /*         P, W, D, L, GD, PTS */
        Brazil:   [9, 9, 9, 9, 9, 9],
        Mexico:   [9, 9, 9, 9, 9, 9],
        Cameroon: [9, 9, 9, 9, 9, 9],
        Croatia:  [9, 9, 9, 9, 9, 9],
    },
});
