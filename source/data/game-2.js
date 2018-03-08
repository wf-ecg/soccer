/*global define */
define({
  match: {
    accuracy: 76,
    possession: 53,
    events: [
      /* time, side, type */
      [45, 'top', 'warning'],
      [59, 'not', 'warning'],
      [62, 'not', 'warning'],
      [79, 'top', 'warning'],
    ],
    teams: ['Brazil', 'Mexico'],
    ticket: ['June 17', 'Estádio Castelão', 'Fortaleza'],
    score: ['0', '0'],
    shots: [
      14,
      /* goal, x, y */
      [false, 15, 25],
      [false, 10, 85],
      [false, 35, 10],
      [false, 50, 30],
      [false, 75, 40],
      [false, 70, 80],
      [false, 85, 70],
      [false, 90, 95],
    ],
  },
  pics: {
    /* path, text, lift, size? */
    shot: ['facts/hugo1-md.jpg', 'Shot of the Match'],
    fact: ['shots/badass1-sm.jpg', 'Hugo Sanchez 1970, Mexico'],
    player: ['players/ochoa.png', 'Ochoa Jersey'],
  },
  tweet: {
    text: [
      'Ochoa is playing out of his mind. Hugely impressive.',
      '<a href="https://twitter.com/hashtag/BRAvsMEX" target="twitter">#BRAvsMEX</a>',
    ],
    author: '<a href="https://twitter.com/ESPNMag" target="twitter">@ESPNMag</a>',
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
    Brazil: [2, 1, 1, 0, 2, 4],
    Mexico: [2, 1, 1, 0, 1, 4],
    Cameroon: [1, 0, 0, 1, -1, 0],
    Croatia: [1, 0, 0, 1, -2, 0],
  },
});
