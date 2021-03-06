/*global define */
define({
  match: {
    accuracy: 63,
    possession: 36,
    events: [
      /* time, side, type */
      [10, 'top', 'error'],
      [20, 'not', 'warning'],
      [30, 'top', 'goal'],
      [40, 'not', 'error'],
      [50, 'top', 'warning'],
      [60, 'not', 'goal'],
      [70, 'top', 'error'],
      [80, 'not', 'warning'],
    ],
    teams: ['?', '?'],
    ticket: ['?', 'Who Knows', '?'],
    score: ['0', '0'],
    shots: [ /* goal, x, y */
      4,
      [true, 0, 0],
      [true, 0, 100],
      [true, 100, 0],
      [true, 100, 100],
    ],
  },
  pics: {
    /* path, text, lift */
    shot: ['shots/zeta1-sm.jpg', 'Shot of the Match'],
    fact: ['facts/czj1-sm.jpg', 'Catherine Z Jones'],
    player: ['players/ez_thanatos.png', 'Z. Jones Jersey'],
  },
  tweet: {
    text: [
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit,\
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      // 'Ut enim ad minim veniam, quis nostrud exercitation ullamco\
      // laboris nisi ut aliquip ex ea commodo consequat.',
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
    Brazil:   [0, 0, 0, 0, 0,  0],
    Mexico:   [0, 0, 0, 0, 0,  0],
    Cameroon: [0, 0, 0, 0, 0,  0],
    Croatia:  [0, 0, 0, 0, 0,  0],
  },
});
