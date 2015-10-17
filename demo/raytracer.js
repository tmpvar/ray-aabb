var fc = require('fc');
var v3normalize = require('gl-vec3/normalize');
var v3sub = require('gl-vec3/subtract');
var v3dist = require('gl-vec3/distance');
var m4create = require('gl-mat4/create');
var m4perspective = require('gl-mat4/perspective');
var m4invert = require('gl-mat4/invert');
var m4mutiply = require('gl-mat4/multiply');
var createRay = require('../ray-aabb');
var ndarray = require('ndarray');
var fill = require('ndarray-fill');
var unproject = require('camera-unproject');

var createOrbitCamera = require("orbit-camera")

var camera = createOrbitCamera([0, 0, -2],
                               [0, 0, 0],
                               [0, 1, 0])
var projection = m4create();
var view = m4create();
var m4inverted = m4create();
var m4scratch = m4create();
var box = [[0, 0], [0, 0]];
var mouse = [0, 0];
var mouseDown = false;

var rayOrigin = [0, 0, 0];
var rayDirection = [0, 0, 0];

var ray = createRay(rayOrigin, rayDirection);
var model = ndarray(new Uint8Array(16*16*16), [16, 16, 16]);

fill(model, function(x, y, z) {
  var dx = 8 - x;
  var dy = 8 - y;
  var dz = 8 - z;
  var d = Math.sqrt(dx*dx + dy*dy + dz*dz);
  if (d < 4) {
    return 255;
  }
  return 0;
})

function getEye(out, view) {
  m4invert(m4scratch, view);
  out[0] = m4scratch[12];
  out[1] = m4scratch[13];
  out[2] = m4scratch[14]
  return out;
}

window.addEventListener('mousedown', function() {
  mouseDown = true;
});

window.addEventListener('mouseup', function() {
  mouseDown = false;
});

window.addEventListener('mousemove', function(ev) {
  var x = ev.clientX;
  var y = ev.clientY;

  if (mouseDown) {
    var w = ctx.canvas.width;
    var h = ctx.canvas.height;
    camera.rotate(
      [x/w-0.5, y/h-0.5],
      [mouse[0]/w-0.5, mouse[1]/h-0.5]
    );
    ctx.dirty();
  }
  mouse[0] = x;
  mouse[1] = y;

});

window.addEventListener('mousewheel', function(ev) {
  camera.zoom(ev.wheelDeltaY * -.001);
  ctx.dirty();
  ev.preventDefault();
});

var viewport = [0, 0, 0, 0];
var near = [0, 0, 0];

var ctx = fc(function() {
  ctx.clear();
  var w = viewport[2] = ctx.canvas.width;
  var h = viewport[3] = ctx.canvas.height;
  var aspect = w/h
  m4perspective(
    projection,
    Math.PI/4.0,
    aspect,
    0.1,
    1000.0
  )



  camera.view(view)

  m4invert(
    m4inverted,
    m4mutiply(m4inverted, projection, view)
  );

  var step = 5;
  var halfstep = (step/2)|0;
  getEye(rayOrigin, view);

  for (var x = 0; x<w; x+=step) {
    near[0] = x;
    for (var y=0; y<h; y+=step) {
      near[1] = y;

      unproject(rayDirection, near, viewport, m4inverted)

      v3normalize(
        rayDirection,
        v3sub(rayDirection, rayDirection, rayOrigin)
      );

      ray.update(rayOrigin, rayDirection);

      var d = ray.intersects([
        [-1, -1, -1],
        [1, 1, 1]
      ], true)
      if (d !== false) {
        ctx.fillStyle = "green";
      } else {
        ctx.fillStyle = "red"
      }

      ctx.fillRect(2+x-halfstep, 2+y-halfstep, step-2, step-2)
    }
  }
})
