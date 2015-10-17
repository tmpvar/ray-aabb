var fc = require('fc');
var center = require('ctx-translate-center');
var createRay = require('../ray-aabb');

var v2normalize = require('gl-vec2/normalize');
var v2lerp = require('gl-vec2/lerp');
var v2copy = require('gl-vec2/copy');
var v2dist = require('gl-vec2/distance');

var drawCircle = require('ctx-circle');

var boxColor = 'rgba(214, 235, 173, .5)'
var boxes = [
  [[-10, -50], [100, 10], boxColor],
  [[-10, 40], [10, 100], boxColor],
  [[-105, -100], [-100, 100], boxColor],
  [[-105, 100], [105, 105], boxColor],
  [[100, -100], [105, 100], boxColor],
  [[-105, -105], [105, -100], boxColor],
];

function drawBox(ctx, bounds) {
  var lb = bounds[0];
  var ub = bounds[1];

  ctx.beginPath();
    ctx.moveTo(lb[0], lb[1])
    ctx.lineTo(ub[0], lb[1])
    ctx.lineTo(ub[0], ub[1])
    ctx.lineTo(lb[0], ub[1])
  ctx.closePath();
  ctx.fillStyle = bounds[2] || "#A7B787"
  ctx.fill();
}

function drawLine(ctx, s, e, color) {
  ctx.beginPath()
    ctx.moveTo(s[0]|0, s[1]|0);
    ctx.lineTo(e[0]|0, e[1]|0);
    ctx.strokeStyle = color;
    ctx.stroke();
}

var lines = [];
var v2scratch = [0, 0];
var ro = [-50, 3];
var rd = [1, .1];
v2normalize(rd, rd);
var ray = createRay(ro, rd);
var ctx = fc(function() {

  ctx.clear();
  center(ctx);
  ctx.scale(1, -1);

  var active = false;

  for (var j=0; j<lines.length; j++) {
    var line = lines[j];
    var color = "grey"

    if (line[2] < 1.0) {
      line[2] = Math.min(1, line[2] + 10/line[3]);
      active = true;
      color = "red";
    } else {
      line[2] = 1;
    }
    drawLine(ctx, line[0], v2lerp(v2scratch, line[0], line[1], line[2]), color)
  }

  var d = Infinity;
  for (var i=0; i<boxes.length; i++) {
    var box = boxes[i];
    drawBox(ctx, box)

    var r = ray.intersects(box, true);
    if (r !== false) {
      d = Math.min(r, d);
    }
  }

  if (!active) {
    var pos = [
      ro[0] + rd[0] * d * .9999999,
      ro[1] + rd[1] * d * .9999999
    ];

    lines.push([
      ro.slice(),
      pos,
      0,
      v2dist(ro, pos)
    ]);

    v2copy(ro, pos);
    var t = rd[0];
    rd[0] = rd[1] > 0 ? -Math.random() : Math.random();//-rd[1]/10;
    rd[1] = t > 0 ? Math.random() : -Math.random();
    v2normalize(rd, rd);
    ray.update(ro, rd);
  }

}, true)
