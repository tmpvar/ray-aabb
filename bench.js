var createRay = require('./ray-aabb');
var Suite = require('benchmark').Suite;

var suite = new Suite();

var boxa = [
  [-1, -1, -1],
  [ 1,  1,  1]
];

var origina = [-2, 0, 0];
var dira = [1, 0, 0];

var ray = createRay(origina, dira);
suite.add('raycast along x axis', function() {
  ray.intersects(boxa);
})

suite.on('cycle', function(event) {
  console.log(String(event.target));
});

suite.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').pluck('name'));
});

suite.run();
