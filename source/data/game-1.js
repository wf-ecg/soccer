/*global define */
define({
  match: {
    accuracy: 80,
    events: [
      /* time, side, type */
      [13, 'top', 'error'],
      [30, 'not', 'error'],
      [57, 'top', 'warning'],
      [62, 'top', 'goal'],
      [80, 'not', 'warning'],
    ],
    possession: 58,
    teams: ['Mexico', 'Cameroon'],
    ticket: ['June 13', 'Arena da Dunas', 'Natal'],
    score: [1, 0],
    shots: [
      9,
      /* goal, x, y */
      [false, 100, 30],
      [false, 10, 90],
      [false, 80, 0],
      [false, 10, 20],
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
    author: '<a href="https://twitter.com/_CarneEstrada" target="twitter">@_CarneEstrada</a>',
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
    Brazil: [1, 1, 0, 0, 2, 3],
    Mexico: [1, 1, 0, 0, 1, 3],
    Cameroon: [1, 0, 0, 1, -1, 0],
    Croatia: [1, 0, 0, 1, -2, 0],
  },
});
