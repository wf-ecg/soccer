Data.addGame(1, {
    match: {
        accuracy: 70,
        events: [
        /* time, side, type */
        [10, 'top', 'error'],
        [35, 'top', 'error'],
        [40, 'not', 'goal'],
        [55, 'not', 'warning'],
        [70, 'top', 'goal'],
        [80, 'top', 'warning'],
        ],
        possession: 66,
        teams: ['Mexico', 'Cameroon'],
        ticket: ['June 13', 'Arena da Dunas', 'Natal'],
        score: [2, 0],
        shots: [
        /* goal, x, y */
        [false, 100, 30],
        [false, 10, 90],
        [false, 80, 0],
        [true, 10, 20],
        [true, 80, 70],
        ],
    },
    pics: {
        /* path, text, lift, size? */
        shot: ['shots/badass1-sm.jpg', 'Shot of the Match'],
        fact: ['shots/hugo1-sm.jpg', 'Hugo Sanchez 1970, Mexico'],
        player: ['jersey/g_d_santos.png', 'G. Dos Santos Jersey'],
    },
    tweet: {
        text: [
        'Mexico is up 2-0, but I think the team is going to see this game as a loss.',
        'One guy indefinitely out and Rafa Marquez is questionable.',
        ],
        author: '@_CarneEstrada',
    },
    fact: {
        text: [
        'In 1970, Mexico hosted the World Cup and kicked off their',
        'campaign with a scoreless draw against the Soviet Union.',
        'This was followed by a win over El Salvador (4–0).',
        ],
    },
    grouping: {
        /*        P, W, D, L, GD, Pts */
        Brazil:   [1, 1, 0, 0, 2, 3],
        Mexico:   [1, 1, 0, 0, 1, 3],
        Cameroon: [1, 0, 0, 1,-1, 0],
        Croatia:  [1, 0, 0, 1,-2, 0],
    },
});
