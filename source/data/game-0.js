/*global define */
define({
  match: {
    accuracy: 0,
    possession: 0,
    events: [ /* time, side, type */
      [],
    ],
    teams: ['?', '?'],
    ticket: ['?', '?', '?'],
    score: ['9', '9'],
    shots: [ /* goal, x, y */
      [],
    ],
  },
  pics: {
    /* path, text, lift */
    shot: ['shots/zeta2-sm.jpg', 'Shot of the Match'],
    fact: ['facts/czj1-sm.jpg', 'Catherine Z Jones'],
    player: ['players/ez_thanatos.png', 'Z. Jones Jersey'],
  },
  tweet: {
    text: [
      'asdf asdf asdf',
      'asdf asdf asdf',
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
    Brazil: [0, 0, 0, 0, 0, 0],
    Mexico: [0, 0, 0, 0, 0, 0],
    Cameroon: [0, 0, 0, 0, 0, 0],
    Croatia: [0, 0, 0, 0, 0, 0],
  },
});
