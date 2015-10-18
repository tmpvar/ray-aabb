var createRay = require('./ray-aabb');
var Suite = require('benchmark').Suite;

var suite = new Suite();

var boxa = [
  [-1, -1, -1],
  [ 1,  1,  1]
];

var origin = [-2, 0, 0];
var dir = [1, 0, 0];

var ray = createRay(origin, dir);

// var normal = [0, 0, 0];
// for (var i=0; i<100000; i++) {
//   for (var x=-1; x<=1; x++) {
//     origin[0] = -x * 2;
//     dir[0] = x;

//     for (var y=-1; y<=1; y++) {
//       origin[1] = -y * 2;
//       dir[1] = y;

//       for (var z=-1; z<=1; z++) {
//         origin[2] = -z * 2;
//         dir[2] = z;

//         ray.update(origin, dir);
//         ray.intersects(boxa, normal)
//       }
//     }
//   }
// }

suite.add('raycast along x axis', function() {
  for (var x=-1; x<=1; x++) {
    origin[0] = -x * 2;
    dir[0] = x;

    for (var y=-1; y<=1; y++) {
      origin[1] = -y * 2;
      dir[1] = y;

      for (var z=-1; z<=1; z++) {
        origin[2] = -z * 2;
        dir[2] = z;

        ray.update(origin, dir);
        ray.intersects(boxa)
      }
    }
  }
})

suite.on('cycle', function(event) {
  console.log(String(event.target));
});

suite.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').pluck('name'));
});

suite.run();
