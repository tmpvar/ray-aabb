var createRay = require('../ray-aabb');
var fc = require('fc');
var mat4 = require('gl-mat4');
var vec3 = require('gl-vec3');
var ctx = fc(frame, false, 2);
var ndarray = require('ndarray')
var fill = require('ndarray-fill');
ctx.reset();
ctx.clear();
var id = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
var imageData = ndarray(id.data, [ctx.canvas.height, ctx.canvas.width, 4])

var camera = require("orbit-camera")(
  [0, 0, -3],
  [0, 0, 0],
  [0, 1, 0]
);

var mouse = {
  pos: [0, 0],
  down: false
};

// Pre-allocated to prevent unecessary garbage collection
var m4scratch = mat4.create();
var v3scratch = vec3.create();

function getEye(out, view) {
  mat4.invert(m4scratch, view);
  out[0] = m4scratch[12];
  out[1] = m4scratch[13];
  out[2] = m4scratch[14]
  return out;
}

function unproject(out, vec, z, view, proj, viewport) {
  if(!out) {
    out = [0, 0, 0];
  }

  out[0] = 2.0 * (vec[0] - viewport[0]) / viewport[2] - 1.0;
  out[1] = 2.0 * (vec[1] - viewport[1]) / viewport[3] - 1.0;
  out[2] = 2.0 * z - 1.0;

  mat4.multiply(m4scratch, proj, view);
  // vec3.transformMat4(out, out, mat4.invert(m4scratch, m4scratch));

  return out;
};


var projection = mat4.create();
var view = mat4.create();
var model = mat4.create();
var eye = vec3.create();
var scene = [
  [[-1, -1, -1], [1, 1, 1]]
];

var ro = [0, 0, 0];
var rd = [0, 1, 0]
var ray = createRay(ro, rd);
var v2a = [0, 0];
var v2b = [0, 0];



function frame() {
  var viewport = [0, 0, ctx.canvas.width, ctx.canvas.height];

  // mat4.identity(model, model);
  mat4.perspective(projection, Math.PI/4.0, viewport[2], viewport[3], 0.1, 1000.0)

  camera.view(view);
  getEye(ro, view);

  fill(imageData.pick(null, null, 0), function(y, x) {
    v2a[0] = x;
    v2a[1] = viewport[3] - y;

    unproject(
      rd,
      v2a,
      1,
      view,
      projection,
      viewport
    );

    vec3.normalize(rd, rd);
    return (ray.update(ro, rd).intersects(scene[0])) * 255;
  });

  ctx.clear();
  ctx.putImageData(id, 0, 0);
}


function handleMouse(e) {
  ctx.start();

  switch (e.type) {
    case 'mousedown':
      mouse.down = true;
    break;

    case 'mouseup':
      mouse.down = false;
    break;

    case 'mousemove':
      var x = e.clientX;
      var y = e.clientY;

      if (mouse.down) {
        // fc ensures that the canvas is fullscreen
        // you'll want to get the offset of the canvas
        // element if you don't use fc.

        var w = ctx.canvas.width;
        var h = ctx.canvas.height;
        var l = mouse.pos;
        // TODO: pre-allocate these vectors to avoid gc hickups
        v2a[0] = x/w - .5;
        v2a[1] = y/h - .5;

        v2b[0] = l[0]/w - .5;
        v2b[1] = l[1]/h - .5;

        camera.rotate(v2a, v2b);
      }

      mouse.pos[0] = x;
      mouse.pos[1] = y;
    break;

    case 'mousewheel':
      camera.zoom(e.wheelDeltaY * -.001);
      e.preventDefault();
    break;

    // TODO: eliminate new array creation below
    case 'keydown' :
      var panSpeed = .01;
      switch (e.keyCode) {
        case 37:
          camera.pan([-panSpeed, 0, 0]);
        break;

        case 38:
          camera.pan([0, -panSpeed, 0]);
        break;

        case 39:
          camera.pan([panSpeed, 0, 0]);
        break;

        case 40:
          camera.pan([0, panSpeed, 0]);
        break;
      }
    break;
  }

  camera.view(view);
  getEye(ro, view);
}

document.addEventListener('mousemove', handleMouse);
document.addEventListener('mousewheel', handleMouse);
document.addEventListener('mousedown', handleMouse);
document.addEventListener('mouseup', handleMouse);

