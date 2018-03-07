/*global define */
define({
  match: {
    accuracy: 47,
    possession: 74,
    events: [
      /* time, side, type */
      [15, 'not', 'warning'],
      [30, 'top', 'warning'],
      [45, 'not', 'warning'],
      [60, 'top', 'warning'],
      [75, 'not', 'warning'],
    ],
    teams: ['Cameroon', 'Brazil'],
    ticket: ['June 17', 'Estádio Castelão', 'Fortaleza'],
    score: ['0', '0'],
    shots: [
      13,
      /* goal, x, y */
      [false, 15, 25],
      [false, 10, 85],
      [false, 35, 10],
      [false, 28, 60],
      [false, 28, 90],
      [false, 50, 30],
      [false, 50, 70],
      [false, 75, 5],
      [false, 75, 40],
      [false, 70, 80],
      [false, 90, 40],
      [false, 85, 70],
      [false, 90, 95],
    ],
  },
  pics: {
    /* path, text, lift, size? */
    shot: ['shots/zeta1-sm.jpg', 'Shot of the Match'],
    fact: ['facts/czj2-sm.jpg', 'Catherine Z Jones'],
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
      'asdf asdf asdf',
      'asdf asdf asdf',
      'asdf asdf asdf',
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
