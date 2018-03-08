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
    teams: ['?', '?'],
    ticket: ['?', 'Who Cares', ''],
    score: ['9', '9'],
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
    shot: ['shots/zeta2-sm.jpg', 'Shot of the Match'],
    fact: ['facts/czj2-sm.jpg', 'Catherine Z Jones'],
    player: ['players/ez_thanatos.png', 'Z. Jones Jersey'],
  },
  tweet: {
    text: [
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco\
      laboris nisi ut aliquip ex ea commodo consequat.',
    ],
    author: '<a href="https://twitter.com/FoolioRex" target="twitter">@FoolioRex</a>',
  },
  fact: {
    text: [
      'Duis aute irure dolor in reprehenderit in voluptate\
      velit esse cillum dolore eu fugiat nulla pariatur.\
      Excepteur sint occaecat cupidatat non proident est laborum.',
    ],
  },
  grouping: {
    /*         P, W, D, L, GD, Pts */
    Brazil:   [9, 9, 9, 9, 9,  9],
    Mexico:   [9, 9, 9, 9, 9,  9],
    Cameroon: [9, 9, 9, 9, 9,  9],
    Croatia:  [9, 9, 9, 9, 9,  9],
  },
});
