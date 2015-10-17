var test = require('tape');
var createRay = require('./ray-aabb');
var vec3 = require('gl-vec3');
var classify = require('ray-direction-classify');

var obox = [[-1, -1, -1], [1, 1, 1]];

function intersect(origin, direction, box) {
  var normal = [0, 0, 0]
  vec3.normalize(direction, direction)
  var ray = createRay(origin, direction);
  if (ray.intersects(box, normal)) {
    return normal
  }
  return false;
}

test('MMM', function(t) {
  var box = [
    [2, 2, 2],
    [4, 4, 4]
  ];

  var ray = createRay(
    [5, 5, 5],
    [-1, -1, -1]
  )

  t.ok(ray.intersects(box));
  t.end();
})

test('MMM - miss', function(t) {
  var box = [
    [2, 2, 2],
    [4, 4, 4]
  ];

  var ray = createRay(
    [0, 0, 0],
    [-1, -1, -1]
  )

  t.ok(!ray.intersects(box));
  t.end();
})

test('MMP', function(t) {
  var box = [
    [2, 2, 2],
    [4, 4, 4]
  ];

  var ray = createRay(
    [5, 5, 2],
    [-1, -1, 1]
  )

  t.ok(ray.intersects(box));
  t.end();
})

test('MMP - miss', function(t) {
  var box = [
    [2, 2, 2],
    [4, 4, 4]
  ];

  var ray = createRay(
    [5, 1, 2],
    [-1, -1, 1]
  )

  t.ok(!ray.intersects(box));
  t.end();
})

test('MPM', function(t) {
  var box = [
    [2, 2, 2],
    [4, 4, 4]
  ];

  var ray = createRay(
    [5, 2, 5],
    [-1, 1, -1]
  )

  t.ok(ray.intersects(box));
  t.end();
})

test('MPM - miss', function(t) {
  var box = [
    [2, 2, 2],
    [4, 4, 4]
  ];

  var ray = createRay(
    [5, 2, 1],
    [-1, 1, -1]
  )

  t.ok(!ray.intersects(box));
  t.end();
})

test('MPP', function(t) {
  var box = [
    [2, 2, 2],
    [4, 4, 4]
  ];

  var ray = createRay(
    [5, 2, 2],
    [-1, 1, 1]
  )

  t.ok(ray.intersects(box));
  t.end();
})

test('MPP', function(t) {
  var box = [
    [2, 2, 2],
    [4, 4, 4]
  ];

  var ray = createRay(
    [5, 2, 2],
    [-1, 1, 1]
  )

  t.ok(ray.intersects(box));
  t.end();
})

test('PMM', function(t) {
  var origin = [0, 6, 6];
  var box = [
    [2, 2, 2],
    [4, 4, 4]
  ];
  var direction = [1, -1, -1];

  t.ok(createRay(origin, direction).intersects(box));

  t.end();
});

test('PMM - miss', function(t) {
  var origin = [0, 0, 0];
  var box = [
    [2, 2, 2],
    [4, 4, 4]
  ];
  var direction = [1, -1, -1];

  t.ok(!createRay(origin, direction).intersects(box));

  t.end();
});

test('PMP', function(t) {

  var box = [
    [2, 2, 2],
    [4, 4, 4]
  ];

  var ray = createRay(
    [1, 5, 1],
    [1, -1, 1]
  )

  t.ok(ray.intersects(box));

  t.end();
})

test('PMP - miss', function(t) {

  var box = [
    [2, 2, 2],
    [4, 4, 4]
  ];

  var ray = createRay(
    [1, 5, 5],
    [1, -1, 1]
  )

  t.ok(!ray.intersects(box));

  t.end();
})

test('PPM', function(t) {
  var box = [
    [2, 2, 2],
    [4, 4, 4]
  ];

  var ray = createRay(
    [2, 2, 5],
    [1, 1, -1]
  )

  t.ok(ray.intersects(box));
  t.end();
})

test('PPM - miss', function(t) {
  var box = [
    [2, 2, 2],
    [4, 4, 4]
  ];

  var ray = createRay(
    [2, 2, 0],
    [1, 1, -1]
  )

  t.ok(!ray.intersects(box));
  t.end();
})

test('PPP', function(t) {
  var origin = [0, 0, 0];
  var box = [
    [2, 2, 2],
    [4, 4, 4]
  ];
  var direction = [1, 1, 1];

  t.ok(createRay(origin, direction).intersects(box));

  t.end();
})

test('PPP - miss', function(t) {
  var origin = [5, 0, 0];
  var box = [
    [2, 2, 2],
    [4, 4, 4]
  ];
  var direction = [1, 1, 1];

  t.ok(!createRay(origin, direction).intersects(box));

  t.end();
})

test('POO', function(t) {

  var box = [
    [2, 2, 2],
    [4, 4, 4]
  ];

  var ray = createRay(
    [0, 3, 3],
    [1, 0, 0]
  )

  t.ok(ray.intersects(box));

  t.end();
})

test('POO - miss', function(t) {

  var box = [
    [2, 2, 2],
    [4, 4, 4]
  ];

  var ray = createRay(
    [1, 1, 1],
    [1, 0, 0]
  )

  t.ok(!ray.intersects(box));

  t.end();
})

test('MOO', function(t) {
  var box = [
    [2, 2, 2],
    [4, 4, 4]
  ];

  var ray = createRay(
    [5, 3, 3],
    [-1, 0, 0]
  )

  t.ok(ray.intersects(box));
  t.end();
})

test('MOO - miss', function(t) {
  var box = [
    [2, 2, 2],
    [4, 4, 4]
  ];

  var ray = createRay(
    [2, 3, 3],
    [-1, 0, 0]
  )

  t.ok(ray.intersects(box));
  t.end();
})

test('OPO', function(t) {
  var box = [
    [2, 2, 2],
    [4, 4, 4]
  ];

  var ray = createRay(
    [3, 0, 3],
    [0, 1, 0]
  )

  t.ok(ray.intersects(box));
  t.end();
});

test('OPO - miss', function(t) {
  var box = [
    [2, 2, 2],
    [4, 4, 4]
  ];

  var ray = createRay(
    [1, 0, 3],
    [0, 1, 0]
  )

  t.ok(!ray.intersects(box));
  t.end();
});

test('OMO', function(t) {
  var box = [
    [2, 2, 2],
    [4, 4, 4]
  ];

  var ray = createRay(
    [3, 5, 3],
    [0, -1, 0]
  )

  t.ok(ray.intersects(box));

  t.end();
});

test('OMO - miss', function(t) {
  var box = [
    [2, 2, 2],
    [4, 4, 4]
  ];

  var ray = createRay(
    [3, 1, 3],
    [0, -1, 0]
  )

  t.ok(!ray.intersects(box));

  t.end();
});

test('OOP', function(t) {
  var box = [
    [2, 2, 2],
    [4, 4, 4]
  ];

  var ray = createRay(
    [3, 3, 1],
    [0, 0, 1]
  )

  t.ok(ray.intersects(box));
  t.end();
});

test('OOP', function(t) {
  var box = [
    [2, 2, 2],
    [4, 4, 4]
  ];

  var ray = createRay(
    [3, 1, 1],
    [0, 0, 1]
  )

  t.ok(!ray.intersects(box));
  t.end();
});

test('OOM', function(t) {
  var box = [
    [2, 2, 2],
    [4, 4, 4]
  ];

  var ray = createRay(
    [3, 3, 5],
    [0, 0, -1]
  )

  t.ok(ray.intersects(box));

  t.end();
});

test('OOM - miss', function(t) {
  var box = [
    [2, 2, 2],
    [4, 4, 4]
  ];

  var ray = createRay(
    [3, 3, 1],
    [0, 0, -1]
  )

  t.ok(!ray.intersects(box));

  t.end();
});

test('OMM', function(t) {
  var box = [
    [2, 2, 2],
    [4, 4, 4]
  ];

  var ray = createRay(
    [2, 5, 5],
    [0, -1, -1]
  )

  t.ok(ray.intersects(box));

  t.end();
});

test('OMM - miss', function(t) {
  var box = [
    [2, 2, 2],
    [4, 4, 4]
  ];

  var ray = createRay(
    [0, 5, 5],
    [0, -1, -1]
  )

  t.ok(!ray.intersects(box));

  t.end();
});

test('OMP', function(t) {
  var box = [
    [2, 2, 2],
    [4, 4, 4]
  ];

  var ray = createRay(
    [2, 5, 0],
    [0, -1, 1]
  )

  t.ok(ray.intersects(box));
  t.end();
});

test('OMP - miss', function(t) {
  var box = [
    [2, 2, 2],
    [4, 4, 4]
  ];

  var ray = createRay(
    [2, 0, 0],
    [0, -1, 1]
  )

  t.ok(!ray.intersects(box));
  t.end();
});

test('OPM', function(t) {
  var box = [
    [2, 2, 2],
    [4, 4, 4]
  ];

  var ray = createRay(
    [2, 0, 5],
    [0, 1, -1]
  )

  t.ok(ray.intersects(box));
  t.end();
});

test('OPM - miss', function(t) {
  var box = [
    [2, 2, 2],
    [4, 4, 4]
  ];

  var ray = createRay(
    [2, 0, 0],
    [0, 1, -1]
  )

  t.ok(!ray.intersects(box));
  t.end();
});

test('OPP', function(t) {
  var box = [
    [2, 2, 2],
    [4, 4, 4]
  ];

  var ray = createRay(
    [2, 0, 0],
    [0, 1, 1]
  )

  t.ok(ray.intersects(box));
  t.end();
});

test('OPP - miss', function(t) {
  var box = [
    [2, 2, 2],
    [4, 4, 4]
  ];

  var ray = createRay(
    [2, 5, 5],
    [0, 1, 1]
  )

  t.ok(!ray.intersects(box));
  t.end();
});

test('MOM', function(t) {
  var box = [
    [2, 2, 2],
    [4, 4, 4]
  ];

  var ray = createRay(
    [5, 2, 5],
    [-1, 0, -1]
  )

  t.ok(ray.intersects(box));
  t.end();
});

test('MOM - miss', function(t) {
  var box = [
    [2, 2, 2],
    [4, 4, 4]
  ];

  var ray = createRay(
    [5, 1, 5],
    [-1, 0, -1]
  )

  t.ok(!ray.intersects(box));
  t.end();
});

test('MOP', function(t) {
  var box = [
    [2, 2, 2],
    [4, 4, 4]
  ];

  var ray = createRay(
    [5, 2, 0],
    [-1, 0, 1]
  )

  t.ok(ray.intersects(box));
  t.end();
});

test('MOP - miss', function(t) {
  var box = [
    [2, 2, 2],
    [4, 4, 4]
  ];

  var ray = createRay(
    [0, 2, 0],
    [-1, 0, 1]
  )

  t.ok(!ray.intersects(box));
  t.end();
});

test('POM', function(t) {
  var box = [
    [2, 2, 2],
    [4, 4, 4]
  ];

  var ray = createRay(
    [0, 2, 5],
    [1, 0, -1]
  )

  t.ok(ray.intersects(box));
  t.end();
});

test('POM - miss', function(t) {
  var box = [
    [2, 2, 2],
    [4, 4, 4]
  ];

  var ray = createRay(
    [0, 1, 5],
    [1, 0, -1]
  )

  t.ok(!ray.intersects(box));
  t.end();
});

test('POP', function(t) {
  var box = [
    [2, 2, 2],
    [4, 4, 4]
  ];

  var ray = createRay(
    [0, 2, 0],
    [1, 0, 1]
  )

  t.ok(ray.intersects(box));
  t.end();
});

test('POP - miss', function(t) {
  var box = [
    [2, 2, 2],
    [4, 4, 4]
  ];

  var ray = createRay(
    [0, 5, 0],
    [1, 0, 1]
  )

  t.ok(!ray.intersects(box));
  t.end();
});

test('MMO', function(t) {
  var box = [
    [2, 2, 2],
    [4, 4, 4]
  ];

  var ray = createRay(
    [5, 5, 2],
    [-1, -1, 0]
  )

  t.ok(ray.intersects(box));
  t.end();
});

test('MMO - miss', function(t) {
  var box = [
    [2, 2, 2],
    [4, 4, 4]
  ];

  var ray = createRay(
    [5, 5, 0],
    [-1, -1, 0]
  )

  t.ok(!ray.intersects(box));
  t.end();
});

test('MPO', function(t) {
  var box = [
    [2, 2, 2],
    [4, 4, 4]
  ];

  var ray = createRay(
    [5, 1, 2],
    [-1, 1, 0]
  )

  t.ok(ray.intersects(box));
  t.end();
});

test('MPO - miss', function(t) {
  var box = [
    [2, 2, 2],
    [4, 4, 4]
  ];

  var ray = createRay(
    [5, 1, 0],
    [-1, 1, 0]
  )

  t.ok(!ray.intersects(box));
  t.end();
});

test('PMO', function(t) {
  var box = [
    [2, 2, 2],
    [4, 4, 4]
  ];

  var ray = createRay(
    [1, 5, 2],
    [1, -1, 0]
  )

  t.ok(ray.intersects(box));
  t.end();
});

test('PMO - miss', function(t) {
  var box = [
    [2, 2, 2],
    [4, 4, 4]
  ];

  var ray = createRay(
    [5, 5, 2],
    [1, -1, 0]
  )

  t.ok(!ray.intersects(box));
  t.end();
});

test('PPO', function(t) {
  var box = [
    [2, 2, 2],
    [4, 4, 4]
  ];

  var ray = createRay(
    [1, 1, 2],
    [1, 1, 0]
  )

  t.ok(ray.intersects(box));
  t.end();
});

test('PPO - miss', function(t) {
  var box = [
    [2, 2, 2],
    [4, 4, 4]
  ];

  var ray = createRay(
    [5, 1, 2],
    [1, 1, 0]
  )

  t.ok(!ray.intersects(box));
  t.end();
});

test('simple case - intersects (0, 0, 1)', function(t) {
  var origin = [0, 1, 0];
  var box = [
    [0, 0, 2],
    [2, 2, 4]
  ];
  var direction = [0, 0, 1];

  t.ok(createRay(origin, direction).intersects(box));

  t.end();
});


test('simple case - no isect (0, 0, -1)', function(t) {
  var origin = [0, 1, 0];
  var box = [
    [0, 0, 2],
    [2, 2, 4]
  ];
  var direction = [0, 0, -1];

  t.ok(!createRay(origin, direction).intersects(box));

  t.end();
});

test('simple case - isect (0, 0, -1)', function(t) {
  var origin = [0, 1, 5];
  var box = [
    [0, 0, 2],
    [2, 2, 4]
  ];
  var direction = [0, 0, -1];

  t.ok(createRay(origin, direction).intersects(box));

  t.end();
});

test('simple case - isect (-1, 0, 0)', function(t) {
  var origin = [3, 1, 3];
  var box = [
    [0, 0, 2],
    [2, 2, 4]
  ];
  var direction = [-1, 0, 0];

  t.ok(createRay(origin, direction).intersects(box));

  t.end();
});

test('simple case - no isect (1, 0, 0)', function(t) {
  var origin = [3, 1, 3];
  var box = [
    [0, 0, 2],
    [2, 2, 4]
  ];
  var direction = [1, 0, 0];

  t.ok(!createRay(origin, direction).intersects(box));

  t.end();
});

test('simple case - isect (1, 0, 0)', function(t) {
  var origin = [-3, 1, 3];
  var box = [
    [0, 0, 2],
    [2, 2, 4]
  ];
  var direction = [1, 0, 0];

  t.ok(createRay(origin, direction).intersects(box));

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

    t.ok(createRay(origin, direction).intersects(box), 'intersects');
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

    t.ok(createRay(origin, direction).intersects(box), 'intersects');
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

    t.ok(createRay(origin, direction).intersects(box), 'intersects');
  }

  t.end();
});

function buildNormalTest(x, y, z) {
  test('normals for ' + [x,y,z].join(','), function(t) {
    var sx = x < 0 ? -1 : 1;
    var sy = y < 0 ? -1 : 1;
    var sz = z < 0 ? -1 : 1;

    // test face hits
    if (x) {
      var xface = intersect([-x*2, -y*2, -z*2], [x, y*1.2, z*1.2], obox);
      var xface2 = intersect([-x*2, -y, -z], [sx, sy, sz], obox);

      t.deepEqual(xface, [-sx, 0, 0], 'xface direction change');
      t.deepEqual(xface2, xface, 'xface origin change');
    }

    if (y) {
      var yface = intersect([-x*2, -y*2, -z*2], [x*1.2, y, z*1.2], obox);
      var yface2 = intersect([-x, -y*2, -z], [sx, sy, sz], obox);

      t.deepEqual([0, -sy, 0], yface, 'yface direction change');
      t.deepEqual(yface2, yface, 'yface origin change');
    }

    if (z) {
      var zface = intersect([-x*2, -y*2, -z*2], [x*1.2, y*1.2, z], obox);
      var zface2 = intersect([-x, -y, -z*2], [sx, sy, sz], obox);

      t.deepEqual(zface, [0, 0, -sz], 'zface direction change');
      t.deepEqual(zface2, zface, 'zface origin change');
    }

    // count the number of available components
    var c = (x&1) + (y&1) + (z&1);

    // test edge hits
    if (c > 1) {
      if (x && y) {
        var xyedge = intersect([-x*2, -y*2, -z*2], [x, y, z*1.2], obox);
        var xyedge2 = intersect([-x*2, -y*2, -z], [x, y, z], obox);
        t.deepEqual(xyedge, [-sx, -sy, 0], 'x/y edge direction change');
        t.deepEqual(xyedge, xyedge2, 'x/y edge origin change');
      }

      if (y && z) {
        var yzedge = intersect([-x*2, -y*2, -z*2], [x*1.2, y, z], obox);
        var yzedge2 = intersect([-x, -y*2, -z*2], [x, y, z], obox);
        t.deepEqual(yzedge, [0, -sy, -sz], 'y/z edge direction change');
        t.deepEqual(yzedge, yzedge2, 'y/z edge origin change');
      }

      if (x && z) {
        var xzedge = intersect([-x*2, -y*2, -z*2], [x, y*1.2, z], obox);
        var xzedge2 = intersect([-x*2, -y, -z*2], [x, y, z], obox);
        t.deepEqual(xzedge, [-sx, 0, -sz], 'x/z edge direction change');
        t.deepEqual(xzedge, xzedge2, 'x/z edge origin change');
      }
    }

    // test corner hits
    if (c > 2) {
      var corner = intersect([-x*2, -y*2, -z*2], [x, y, z], obox);
      t.deepEqual(corner, [-sx, -sy, -sz], 'corner');
    }

    t.end()
  })
}

for (var x=-1; x<=1; x++) {
  for (var y=-1; y<=1; y++) {
    for (var z=-1; z<=1; z++) {
      buildNormalTest(x, y, z)
    }
  }
}
