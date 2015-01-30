var test = require('tape');
var isect = require('./ray-box');

test('simple case - intersects (0, 0, 1)', function(t) {
  var origin = [0, 1, 0];
  var box = [
    [0, 0, 2],
    [2, 2, 4]
  ];
  var direction = [0, 0, 1];
  var inv_direction = [
    1/direction[0],
    1/direction[1],
    1/direction[2]
  ];

  t.ok(isect(origin, direction, inv_direction, box, 0, 10));

  t.end();
});

test('simple case - no isect (0, 0, -1)', function(t) {
  var origin = [0, 1, 0];
  var box = [
    [0, 0, 2],
    [2, 2, 4]
  ];
  var direction = [0, 0, -1];
  var inv_direction = [
    1/direction[0],
    1/direction[1],
    1/direction[2]
  ];

  t.ok(!isect(origin, direction, inv_direction, box, 0, 10));

  t.end();
});

test('simple case - isect (0, 0, -1)', function(t) {
  var origin = [0, 1, 5];
  var box = [
    [0, 0, 2],
    [2, 2, 4]
  ];
  var direction = [0, 0, -1];
  var inv_direction = [
    1/direction[0],
    1/direction[1],
    1/direction[2]
  ];

  t.ok(isect(origin, direction, inv_direction, box, 0, 10));

  t.end();
});

test('simple case - isect (-1, 0, 0)', function(t) {
  var origin = [3, 1, 3];
  var box = [
    [0, 0, 2],
    [2, 2, 4]
  ];
  var direction = [-1, 0, 0];
  var inv_direction = [
    1/direction[0],
    1/direction[1],
    1/direction[2]
  ];

  t.ok(isect(origin, direction, inv_direction, box, 0, 10));

  t.end();
});

test('simple case - no isect (1, 0, 0)', function(t) {
  var origin = [3, 1, 3];
  var box = [
    [0, 0, 2],
    [2, 2, 4]
  ];
  var direction = [1, 0, 0];
  var inv_direction = [
    1/direction[0],
    1/direction[1],
    1/direction[2]
  ];

  t.ok(!isect(origin, direction, inv_direction, box, 0, 10));

  t.end();
});

test('simple case - isect (1, 0, 0)', function(t) {
  var origin = [-3, 1, 3];
  var box = [
    [0, 0, 2],
    [2, 2, 4]
  ];
  var direction = [1, 0, 0];
  var inv_direction = [
    1/direction[0],
    1/direction[1],
    1/direction[2]
  ];

  t.ok(isect(origin, direction, inv_direction, box, 0, 10));

  t.end();
});
