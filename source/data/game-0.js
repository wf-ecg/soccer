/*global define */
define({
  match: {
    accuracy: 0,
    possession: 0,
    events: [ /* time, side, type */ ],
    teams: ['?', '?'],
    ticket: ['?', '?', '?'],
    score: ['9', '9'],
    shots: [ /* goal, x, y */ [], ],
  },
  pics: {
    /* path, text, lift */
    shot: ['shots/zeta1-sm.jpg', 'Shot of the Match'],
    fact: ['shots/czj1-sm.jpg', 'Catherine Z Jones'],
    player: ['jersey/ez_thanatos.png', 'Z. Jones Jersey'],
  },
  tweet: {
    text: ['...', ],
    author: '@???',
  },
  fact: {
    text: ['...', ],
  },
  grouping: {
    /*        P, W, D, L, GD, Pts */
    Brazil: [0, 0, 0, 0, 0, 0],
    Mexico: [0, 0, 0, 0, 0, 0],
    Cameroon: [0, 0, 0, 0, 0, 0],
    Croatia: [0, 0, 0, 0, 0, 0],
  },
});
