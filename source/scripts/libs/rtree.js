/*global requirejs, window, */
// Usage:
// Put this in a separate file and load it as the first module
// (See https://github.com/jrburke/requirejs/wiki/Internal-API:-onResourceLoad)
// Methods available after page load:
// rtree.map()
// - Fills out every module's map property under rtree.tree.
// - Print out rtree.tree in the console to see their map property.
// rtree.toUml()
// - Prints out a UML string that can be used to generate UML
// - UML Website: http://yuml.me/diagram/scruffy/class/draw
requirejs.onResourceLoad = function (context, map, depMaps) {
  'use strict';
  var Nom = 'Rtree';
  var W = window;
  var C = W._dbug;

  var tree, i;
  var rtree = W.rtree;

  function Node() {
    this.deps = [];
    this.map = {};
  }

  if (!rtree) {
    rtree = W.rtree = {
      tree: {},
      map: function () {
        var i, dep, key, val;

        for (key in this.tree) {
          if (this.tree.hasOwnProperty(key)) {
            val = this.tree[key];

            for (i = 0; i < val.deps.length; ++i) {
              dep = val.deps[i];
              val.map[dep] = this.tree[dep];
            }
          }
        }
      },
      toUml: function () {
        var i, key, val;
        var uml = [];

        for (key in this.tree) {
          if (this.tree.hasOwnProperty(key)) {
            val = this.tree[key];
            for (i = 0; i < val.deps.length; ++i) {
              uml.push('[' + key + ']->[' + val.deps[i] + ']');
            }
          }
        }

        return uml.join('\n');
      },
    };
  }

  tree = rtree.tree;

  if (!tree[map.name]) {
    tree[map.name] = new Node();
  }

  // For a full dependency tree
  if (depMaps) {
    for (i = 0; i < depMaps.length; ++i) {
      tree[map.name].deps.push(depMaps[i].name);
    }
  }

  // For a simple dependency tree
  //
  // if (map.parentMap && map.parentMap.name) {
  //   if (!tree[map.parentMap.name]) {
  //     tree[map.parentMap.name] = new Node();
  //   }
  //
  //   if (map.parentMap.name !== map.name) {
  //     tree[map.parentMap.name].deps.push(map.name);
  //   }
  // }

  W.clearTimeout(rtree.tout);
  rtree.tout = W.setTimeout(function () {
    var uml = rtree.toUml();
    if (uml && C > 0) {
      C('groupCollapsed', Nom);
      C('log', rtree);
      C('log', uml);
      C('groupEnd');
    }
  }, 999);

};
