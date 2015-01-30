var test = require('tape');
var isect = require('./ray-aabb');
var vec3 = require('gl-vec3');

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

test('rotated on the z - isect', function(t) {
  var r = 10;
  var l = 100;

  var box = [
    [-1, -1, -1],
    [ 1,  1,  1]
  ];

  for (var i=0; i<l; i++) {
    var origin = [
      Math.sin(i/l),
      Math.cos(i/l),
      0
    ];

    var direction = [0, 0, 0];
    vec3.normalize(direction, vec3.negate(direction, origin));
    vec3.scale(origin, origin, r);

    var inv_direction = [
      1/direction[0],
      1/direction[1],
      1/direction[2]
    ];

    t.ok(isect(origin, direction, inv_direction, box, 0, 20), 'intersects');
  }

  t.end();
});

test('rotated on the y - isect', function(t) {
  var r = 10;
  var l = 100;

  var box = [
    [-1, -1, -1],
    [ 1,  1,  1]
  ];

  for (var i=0; i<l; i++) {
    var origin = [
      Math.sin(i/l),
      0,
      Math.cos(i/l)
    ];

    var direction = [0, 0, 0];
    vec3.normalize(direction, vec3.negate(direction, origin));
    vec3.scale(origin, origin, r);

    var inv_direction = [
      1/direction[0],
      1/direction[1],
      1/direction[2]
    ];

    t.ok(isect(origin, direction, inv_direction, box, 0, 20), 'intersects');
  }

  t.end();
});

test('rotated on the x - isect', function(t) {
  var r = 10;
  var l = 100;

  var box = [
    [-1, -1, -1],
    [ 1,  1,  1]
  ];

  for (var i=0; i<l; i++) {
    var origin = [
      0,
      Math.sin(i/l),
      Math.cos(i/l)
    ];

    var direction = [0, 0, 0];
    vec3.normalize(direction, vec3.negate(direction, origin));
    vec3.scale(origin, origin, r);

    var inv_direction = [
      1/direction[0],
      1/direction[1],
      1/direction[2]
    ];

    t.ok(isect(origin, direction, inv_direction, box, 0, 20), 'intersects');
  }

  t.end();
});
