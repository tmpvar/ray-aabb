var classify = require('ray-direction-classify');

module.exports = createRay;

var tests = {};
var max = Math.max;
var abs = Math.abs;

tests[classify.MMM] = function testMMM(ray, lb, ub) {
  var ro = ray.ro;

  return !(ro[0] < lb[0] ||
          ro[1] < lb[1] ||
          ro[2] < lb[2] ||
          ray.jbyi * lb[0] - ub[1] + ray.c_xy > 0 ||
          ray.ibyj * lb[1] - ub[0] + ray.c_yx > 0 ||
          ray.jbyk * lb[2] - ub[1] + ray.c_zy > 0 ||
          ray.kbyj * lb[1] - ub[2] + ray.c_yz > 0 ||
          ray.kbyi * lb[0] - ub[2] + ray.c_xz > 0 ||
          ray.ibyk * lb[2] - ub[0] + ray.c_zx > 0);
};
tests[classify.MMP] = function testMMP(ray, lb, ub) {
  var ro = ray.ro;

  return !(ro[0] < lb[0] ||
          ro[1] < lb[1] ||
          ro[2] > ub[2] ||
          ray.jbyi * lb[0] - ub[1] + ray.c_xy > 0 ||
          ray.ibyj * lb[1] - ub[0] + ray.c_yx > 0 ||
          ray.jbyk * ub[2] - ub[1] + ray.c_zy > 0 ||
          ray.kbyj * lb[1] - lb[2] + ray.c_yz < 0 ||
          ray.kbyi * lb[0] - lb[2] + ray.c_xz < 0 ||
          ray.ibyk * ub[2] - ub[0] + ray.c_zx > 0);
};
tests[classify.MPM] = function testMPM(ray, lb, ub) {
  var ro = ray.ro;

  return !(ro[0] < lb[0] ||
          ro[1] > ub[1] ||
          ro[2] < lb[2] ||
          ray.jbyi * lb[0] - lb[1] + ray.c_xy < 0 ||
          ray.ibyj * ub[1] - ub[0] + ray.c_yx > 0 ||
          ray.jbyk * lb[2] - lb[1] + ray.c_zy < 0 ||
          ray.kbyj * ub[1] - ub[2] + ray.c_yz > 0 ||
          ray.kbyi * lb[0] - ub[2] + ray.c_xz > 0 ||
          ray.ibyk * lb[2] - ub[0] + ray.c_zx > 0);
};
tests[classify.MPP] = function testMPP(ray, lb, ub) {
  var ro = ray.ro;

  return !(ro[0] < lb[0] ||
          ro[1] > ub[1] ||
          ro[2] > ub[2] ||
          ray.jbyi * lb[0] - lb[1] + ray.c_xy < 0 ||
          ray.ibyj * ub[1] - ub[0] + ray.c_yx > 0 ||
          ray.jbyk * ub[2] - lb[1] + ray.c_zy < 0 ||
          ray.kbyj * ub[1] - lb[2] + ray.c_yz < 0 ||
          ray.kbyi * lb[0] - lb[2] + ray.c_xz < 0 ||
          ray.ibyk * ub[2] - ub[0] + ray.c_zx > 0);
};
tests[classify.PMM] = function testPMM(ray, lb, ub) {
  var ro = ray.ro;

  return !(ro[0] > ub[0] ||
          ro[1] < lb[1] ||
          ro[2] < lb[2] ||
          ray.jbyi * ub[0] - ub[1] + ray.c_xy > 0 ||
          ray.ibyj * lb[1] - lb[0] + ray.c_yx < 0 ||
          ray.jbyk * lb[2] - ub[1] + ray.c_zy > 0 ||
          ray.kbyj * lb[1] - ub[2] + ray.c_yz > 0 ||
          ray.kbyi * ub[0] - ub[2] + ray.c_xz > 0 ||
          ray.ibyk * lb[2] - lb[0] + ray.c_zx < 0);
};
tests[classify.PMP] = function testPMP(ray, lb, ub) {
  var ro = ray.ro;

  return !(ro[0] > ub[0] ||
          ro[1] < lb[1] ||
          ro[2] > ub[2] ||
          ray.jbyi * ub[0] - ub[1] + ray.c_xy > 0 ||
          ray.ibyj * lb[1] - lb[0] + ray.c_yx < 0 ||
          ray.jbyk * ub[2] - ub[1] + ray.c_zy > 0 ||
          ray.kbyj * lb[1] - lb[2] + ray.c_yz < 0 ||
          ray.kbyi * ub[0] - lb[2] + ray.c_xz < 0 ||
          ray.ibyk * ub[2] - lb[0] + ray.c_zx < 0);
};
tests[classify.PPM] = function testPPM(ray, lb, ub) {
  var ro = ray.ro;

  return !(ro[0] > ub[0] ||
          ro[1] > ub[1] ||
          ro[2] < lb[2] ||
          ray.jbyi * ub[0] - lb[1] + ray.c_xy < 0 ||
          ray.ibyj * ub[1] - lb[0] + ray.c_yx < 0 ||
          ray.jbyk * lb[2] - lb[1] + ray.c_zy < 0 ||
          ray.kbyj * ub[1] - ub[2] + ray.c_yz > 0 ||
          ray.kbyi * ub[0] - ub[2] + ray.c_xz > 0 ||
          ray.ibyk * lb[2] - lb[0] + ray.c_zx < 0);
};
tests[classify.PPP] = function testPPP(ray, lb, ub) {
  var ro = ray.ro;

  return !(ro[0] > ub[0] ||
          ro[1] > ub[1] ||
          ro[2] > ub[2] ||
          ray.jbyi * ub[0] - lb[1] + ray.c_xy < 0 ||
          ray.ibyj * ub[1] - lb[0] + ray.c_yx < 0 ||
          ray.jbyk * ub[2] - lb[1] + ray.c_zy < 0 ||
          ray.kbyj * ub[1] - lb[2] + ray.c_yz < 0 ||
          ray.kbyi * ub[0] - lb[2] + ray.c_xz < 0 ||
          ray.ibyk * ub[2] - lb[0] + ray.c_zx < 0);
};
tests[classify.POO] = function testPOO(ray, lb, ub) {
  var ro = ray.ro;

  return !(ro[0] > ub[0] ||
          ro[1] < lb[1] ||
          ro[1] > ub[1] ||
          ro[2] < lb[2] ||
          ro[2] > ub[2]);
};
tests[classify.MOO] = function testMOO(ray, lb, ub) {
  var ro = ray.ro;

  return !(ro[0] < lb[0] ||
          ro[1] < lb[1] ||
          ro[1] > ub[1] ||
          ro[2] < lb[2] ||
          ro[2] > ub[2]);
};
tests[classify.OPO] = function testOPO(ray, lb, ub) {
  var ro = ray.ro;

  return !(ro[1] > ub[1] ||
          ro[0] < lb[0] ||
          ro[0] > ub[0] ||
          ro[2] < lb[2] ||
          ro[2] > ub[2]);
};
tests[classify.OMO] = function testOMO(ray, lb, ub) {
  var ro = ray.ro;

  return !(ro[1] < lb[1] ||
          ro[0] < lb[0] ||
          ro[0] > ub[0] ||
          ro[2] < lb[2] ||
          ro[2] > ub[2]);
};
tests[classify.OOP] = function testOOP(ray, lb, ub) {
  var ro = ray.ro;

  return !(ro[2] > ub[2] ||
          ro[0] < lb[0] ||
          ro[0] > ub[0] ||
          ro[1] < lb[1] ||
          ro[1] > ub[1]);
};
tests[classify.OOM] = function testOOM(ray, lb, ub) {
  var ro = ray.ro;

  return !(ro[2] < lb[2] ||
          ro[0] < lb[0] ||
          ro[0] > ub[0] ||
          ro[1] < lb[1] ||
          ro[1] > ub[1]);
};
tests[classify.OMM] = function testOMM(ray, lb, ub) {
  var ro = ray.ro;

  return !(ro[0] < lb[0] ||
          ro[0] > ub[0] ||
          ro[1] < lb[1] ||
          ro[2] < lb[2] ||
          ray.jbyk * lb[2] - ub[1] + ray.c_zy > 0 ||
          ray.kbyj * lb[1] - ub[2] + ray.c_yz > 0);
};
tests[classify.OMP] = function testOMP(ray, lb, ub) {
  var ro = ray.ro;

  return !(ro[0] < lb[0] ||
          ro[0] > ub[0] ||
          ro[1] < lb[1] ||
          ro[2] > ub[2] ||
          ray.jbyk * ub[2] - ub[1] + ray.c_zy > 0 ||
          ray.kbyj * lb[1] - lb[2] + ray.c_yz < 0);
};
tests[classify.OPM] = function testOPM(ray, lb, ub) {
  var ro = ray.ro;

  return !(ro[0] < lb[0] ||
          ro[0] > ub[0] ||
          ro[1] > ub[1] ||
          ro[2] < lb[2] ||
          ray.jbyk * lb[2] - lb[1] + ray.c_zy < 0 ||
          ray.kbyj * ub[1] - ub[2] + ray.c_yz > 0);
};
tests[classify.OPP] = function testOPP(ray, lb, ub) {
  var ro = ray.ro;

  return !(ro[0] < lb[0] ||
          ro[0] > ub[0] ||
          ro[1] > ub[1] ||
          ro[2] > ub[2] ||
          ray.jbyk * ub[2] - lb[1] + ray.c_zy < 0 ||
          ray.kbyj * ub[1] - lb[2] + ray.c_yz < 0);
};
tests[classify.MOM] = function testMOM(ray, lb, ub) {
  var ro = ray.ro;

  return !(ro[1] < lb[1] ||
          ro[1] > ub[1] ||
          ro[0] < lb[0] ||
          ro[2] < lb[2] ||
          ray.kbyi * lb[0] - ub[2] + ray.c_xz > 0 ||
          ray.ibyk * lb[2] - ub[0] + ray.c_zx > 0);
};
tests[classify.MOP] = function testMOP(ray, lb, ub) {
  var ro = ray.ro;

  return !(ro[1] < lb[1] ||
          ro[1] > ub[1] ||
          ro[0] < lb[0] ||
          ro[2] > ub[2] ||
          ray.kbyi * lb[0] - lb[2] + ray.c_xz < 0 ||
          ray.ibyk * ub[2] - ub[0] + ray.c_zx > 0);
};
tests[classify.POM] = function testPOM(ray, lb, ub) {
  var ro = ray.ro;

  return !(ro[1] < lb[1] ||
          ro[1] > ub[1] ||
          ro[0] > ub[0] ||
          ro[2] < lb[2] ||
          ray.kbyi * ub[0] - ub[2] + ray.c_xz > 0 ||
          ray.ibyk * lb[2] - lb[0] + ray.c_zx < 0);
};
tests[classify.POP] = function testPOP(ray, lb, ub) {
  var ro = ray.ro;

  return !(ro[1] < lb[1] ||
          ro[1] > ub[1] ||
          ro[0] > ub[0] ||
          ro[2] > ub[2] ||
          ray.kbyi * ub[0] - lb[2] + ray.c_xz < 0 ||
          ray.ibyk * ub[2] - lb[0] + ray.c_zx < 0);
};
tests[classify.MMO] = function testMMO(ray, lb, ub) {
  var ro = ray.ro;

  return !(ro[2] < lb[2] ||
          ro[2] > ub[2] ||
          ro[0] < lb[0] ||
          ro[1] < lb[1] ||
          ray.jbyi * lb[0] - ub[1] + ray.c_xy > 0 ||
          ray.ibyj * lb[1] - ub[0] + ray.c_yx > 0);
};
tests[classify.MPO] = function testMPO(ray, lb, ub) {
  var ro = ray.ro;

  return !(ro[2] < lb[2] ||
          ro[2] > ub[2] ||
          ro[0] < lb[0] ||
          ro[1] > ub[1] ||
          ray.jbyi * lb[0] - lb[1] + ray.c_xy < 0 ||
          ray.ibyj * ub[1] - ub[0] + ray.c_yx > 0);
};
tests[classify.PMO] = function testPMO(ray, lb, ub) {
  var ro = ray.ro;

  return !(ro[2] < lb[2] ||
          ro[2] > ub[2] ||
          ro[0] > ub[0] ||
          ro[1] < lb[1] ||
          ray.jbyi * ub[0] - ub[1] + ray.c_xy > 0 ||
          ray.ibyj * lb[1] - lb[0] + ray.c_yx < 0);
};
tests[classify.PPO] = function testPPO(ray, lb, ub) {
  var ro = ray.ro;

  return !(ro[2] < lb[2] ||
          ro[2] > ub[2] ||
          ro[0] > ub[0] ||
          ro[1] > ub[1] ||
          ray.jbyi * ub[0] - lb[1] + ray.c_xy < 0 ||
          ray.ibyj * ub[1] - lb[0] + ray.c_yx < 0);
};

var lerps = {};

lerps[classify.MMM] = function lerpMMM(ray, aabb, norm) {
  var ro = ray.ro;
  var ub = aabb[1];
  var a = (ub[0] - ro[0]) * ray.ii;
  var b = (ub[1] - ro[1]) * ray.ij;
  var c = (ub[2] - ro[2]) * ray.ik;

  norm[0] = +(a >= b && a >= c);
  norm[1] = +(b >= c && b >= a);
  norm[2] = +(c >= a && c >= b);

  return max(a, b, c);
};

lerps[classify.MMP] = function lerpMMP(ray, aabb, norm) {
  var ro = ray.ro;
  var ub = aabb[1];
  var lb = aabb[0];

  var a = (ub[0] - ro[0]) * ray.ii;
  var b = (ub[1] - ro[1]) * ray.ij;
  var c = (lb[2] - ro[2]) * ray.ik;

  norm[0] = +(a >= b && a >= c);
  norm[1] = +(b >= c && b >= a);
  norm[2] = -(c >= a && c >= b);

  return max(a, b, c);
};

lerps[classify.MPM] = function lerpMPM(ray, aabb, norm) {
  var ro = ray.ro;
  var ub = aabb[1];
  var lb = aabb[0];

  var a = (ub[0] - ro[0]) * ray.ii;
  var b = (lb[1] - ro[1]) * ray.ij;
  var c = (ub[2] - ro[2]) * ray.ik;

  norm[0] = +(a >= b && a >= c);
  norm[1] = -(b >= c && b >= a);
  norm[2] = +(c >= a && c >= b);

  return max(a, b, c);
};

lerps[classify.MPP] = function(ray, aabb, norm) {
  var ro = ray.ro;
  var ub = aabb[1];
  var lb = aabb[0];

  var a = (ub[0] - ro[0]) * ray.ii;
  var b = (lb[1] - ro[1]) * ray.ij;
  var c = (lb[2] - ro[2]) * ray.ik;

  norm[0] = +(a >= b && a >= c);
  norm[1] = -(b >= c && b >= a);
  norm[2] = -(c >= a && c >= b);

  return max(a, b, c);
};

lerps[classify.PMM] = function(ray, aabb, norm) {
  var ro = ray.ro;
  var ub = aabb[1];
  var lb = aabb[0];

  var a = (lb[0] - ro[0]) * ray.ii;
  var b = (ub[1] - ro[1]) * ray.ij;
  var c = (ub[2] - ro[2]) * ray.ik;

  norm[0] = -(a >= b && a >= c);
  norm[1] = +(b >= c && b >= a);
  norm[2] = +(c >= a && c >= b);

  return max(a, b, c);
};

lerps[classify.PMP] = function(ray, aabb, norm) {
  var ro = ray.ro;
  var ub = aabb[1];
  var lb = aabb[0];

  var a = (lb[0] - ro[0]) * ray.ii;
  var b = (ub[1] - ro[1]) * ray.ij;
  var c = (lb[2] - ro[2]) * ray.ik;

  norm[0] = -(a >= b && a >= c);
  norm[1] = +(b >= c && b >= a);
  norm[2] = -(c >= a && c >= b);

  return max(a, b, c);
};

lerps[classify.PPM] = function(ray, aabb, norm) {
  var ro = ray.ro;
  var lb = aabb[0];
  var ub = aabb[1];

  var a = (lb[0] - ro[0]) * ray.ii;
  var b = (lb[1] - ro[1]) * ray.ij;
  var c = (ub[2] - ro[2]) * ray.ik;

  norm[0] = -(a >= b && a >= c);
  norm[1] = -(b >= c && b >= a);
  norm[2] = +(c >= a && c >= b);

  return max(a, b, c);
};

lerps[classify.PPP] = function(ray, aabb, norm) {
  var ro = ray.ro;
  var lb = aabb[0];

  var a = (lb[0] - ro[0]) * ray.ii;
  var b = (lb[1] - ro[1]) * ray.ij;
  var c = (lb[2] - ro[2]) * ray.ik;

  norm[0] = -(a >= b && a >= c);
  norm[1] = -(b >= c && b >= a);
  norm[2] = -(c >= a && c >= b);

  return max(a, b, c);
};

lerps[classify.OMM] = function(ray, aabb, norm) {
  var ro = ray.ro;
  var ub = aabb[1];

  var a = (ub[1] - ro[1]) * ray.ij;
  var b = (ub[2] - ro[2]) * ray.ik;

  norm[0] = 0
  norm[1] = +(a >= b);
  norm[2] = +(b >= a);

  return max(a, b);
};

lerps[classify.OMP] = function(ray, aabb, norm) {
  var ro = ray.ro;

  var a = (aabb[1][1] - ro[1]) * ray.ij;
  var b = (aabb[0][2] - ro[2]) * ray.ik;

  norm[0] = 0
  norm[1] = +(a >= b);
  norm[2] = -(b >= a);

  return max(a, b);
};

lerps[classify.OPM] = function(ray, aabb, norm) {
  var ro = ray.ro;

  var a = (aabb[0][1] - ro[1]) * ray.ij;
  var b = (aabb[1][2] - ro[2]) * ray.ik;

  norm[0] = 0
  norm[1] = -(a >= b);
  norm[2] = +(b >= a);

  return max(a, b);
};

lerps[classify.OPP] = function(ray, aabb, norm) {
  var ro = ray.ro;
  var lb = aabb[0];

  var a = (lb[1] - ro[1]) * ray.ij;
  var b = (lb[2] - ro[2]) * ray.ik;

  norm[0] = 0
  norm[1] = -(a >= b);
  norm[2] = -(b >= a);

  return max(a, b);
}

lerps[classify.MOM] = function(ray, aabb, norm) {
  var ro = ray.ro;
  var ub = aabb[1];

  var a = (ub[0] - ro[0]) * ray.ii;
  var b = (ub[2] - ro[2]) * ray.ik;

  norm[0] = +(a >= b);
  norm[1] = 0
  norm[2] = +(b >= a);

  return max(a, b);
};

lerps[classify.MOP] = function(ray, aabb, norm) {
  var ro = ray.ro;

  var a = (aabb[1][0] - ro[0]) * ray.ii;
  var b = (aabb[0][2] - ro[2]) * ray.ik;

  norm[0] = +(a >= b);
  norm[1] = 0
  norm[2] = -(b >= a);

  return max(a, b);
};

lerps[classify.POM] = function(ray, aabb, norm) {
  var ro = ray.ro;

  var a = (aabb[0][0] - ray.ro[0]) * ray.ii;
  var b = (aabb[1][2] - ray.ro[2]) * ray.ik;

  norm[0] = -(a >= b);
  norm[1] = 0;
  norm[2] = +(b >= a);

  return max(a, b);
};

lerps[classify.POP] = function(ray, aabb, norm) {
  var ro = ray.ro;
  var lb = aabb[0];

  var a = (lb[0] - ro[0]) * ray.ii;
  var b = (lb[2] - ro[2]) * ray.ik;

  norm[0] = -(a >= b);
  norm[1] = 0
  norm[2] = -(b >= a);

  return max(a, b);
}

lerps[classify.MMO] = function(ray, aabb, norm) {
  var ro = ray.ro;
  var ub = aabb[1];

  var a = (ub[0] - ro[0]) * ray.ii;
  var b = (ub[1] - ro[1]) * ray.ij;

  norm[0] = +(a >= b);
  norm[1] = +(b >= a);
  norm[2] = 0

  return max(a, b);
}

lerps[classify.MPO] = function(ray, aabb, norm) {
  var ro = ray.ro;

  var a = (aabb[1][0] - ro[0]) * ray.ii;
  var b = (aabb[0][1] - ro[1]) * ray.ij;

  norm[0] = +(a >= b);
  norm[1] = -(b >= a);
  norm[2] = 0

  return max(a, b);
};

lerps[classify.PMO] = function(ray, aabb, norm) {
  var ro = ray.ro;

  var a = (aabb[0][0] - ro[0]) * ray.ii;
  var b = (aabb[1][1] - ro[1]) * ray.ij;

  norm[0] = -(a >= b);
  norm[1] = +(b >= a);
  norm[2] = 0

  return max(a, b);
};

lerps[classify.PPO] = function(ray, aabb, norm) {
  var ro = ray.ro;
  var lb = aabb[0];

  var a = (lb[0] - ro[0]) * ray.ii;
  var b = (lb[1] - ro[1]) * ray.ij;

  norm[0] = -(a >= b);
  norm[1] = -(b >= a);
  norm[2] = 0;

  return max(a, b);
};

lerps[classify.MOO] = function(ray, aabb, norm) {
  norm[0] = 1;
  norm[1] = norm[2] = 0;
  return (aabb[1][0] - ray.ro[0]) * ray.ii;
};

lerps[classify.POO] = function(ray, aabb, norm) {
  norm[0] = -1;
  norm[1] = norm[2] = 0;
  return (aabb[0][0] - ray.ro[0]) * ray.ii;
};

lerps[classify.OMO] = function(ray, aabb, norm) {
  norm[0] = 0;
  norm[1] = 1;
  norm[2] = 0;
  return (aabb[1][1] - ray.ro[1]) * ray.ij;
};

lerps[classify.OPO] = function(ray, aabb, norm) {
  norm[0] = 0;
  norm[1] = -1;
  norm[2] = 0;
  return (aabb[0][1] - ray.ro[1]) * ray.ij;
};

lerps[classify.OOM] = function(ray, aabb, norm) {
  norm[0] = norm[1] = 0;
  norm[2] = 1;
  return (aabb[1][2] - ray.ro[2]) * ray.ik;
};

lerps[classify.OOP] = function(ray, aabb, norm) {
  norm[0] = norm[1] = 0;
  norm[2] = -1;
  return (aabb[0][2] - ray.ro[2]) * ray.ik;
}

function Ray(ro, rd) {
  this.ro = [0, 0, 0];
  this.rd = [0, 0, 0];
  this.update(ro, rd);
}

Ray.prototype.ii = 0.0;
Ray.prototype.ij = 0.0;
Ray.prototype.ik = 0.0;
Ray.prototype.ibyj = 0.0;
Ray.prototype.jbyi = 0.0;
Ray.prototype.jbyk = 0.0;
Ray.prototype.kbyj = 0.0;
Ray.prototype.ibyk = 0.0;
Ray.prototype.kbyi = 0.0;
Ray.prototype.c_xy = 0.0;
Ray.prototype.c_xz = 0.0;
Ray.prototype.c_yx = 0.0;
Ray.prototype.c_yz = 0.0;
Ray.prototype.c_zx = 0.0;
Ray.prototype.c_zy = 0.0;
Ray.prototype.classification = 0.0;
Ray.prototype.result = null;

var scratchNormal = [0, 0, 0];

Ray.prototype.intersects =  function rayIntersectsAABB(aabb, computeDistance) {
  var classification = this.classification;
  var t = tests[classification];
  if (t && t(this, aabb[0], aabb[1])) {
    if (!computeDistance) {
      return true;
    }

    var lerp = lerps[classification]
    var normal = Array.isArray(computeDistance) ? computeDistance : scratchNormal;
    return lerp && lerp(this, aabb, normal);
  }
  return false;
};

Ray.prototype.update = function updateRay(ro, rd) {
  var r = this;
  var i = r.rd[0] = rd[0], j = r.rd[1] = rd[1], k = r.rd[2] = rd[2];
  var x = r.ro[0] = ro[0], y = r.ro[1] = ro[1], z = r.ro[2] = ro[2];

  r.ii = (i)?1.0/i:0;
  r.ij = (j)?1.0/j:0;
  r.ik = (k)?1.0/k:0;
  //ray slope
  r.ibyj = i * r.ij;
  r.jbyi = j * r.ii;
  r.jbyk = j * r.ik;
  r.kbyj = k * r.ij;
  r.ibyk = i * r.ik;
  r.kbyi = k * r.ii;
  r.c_xy = y - r.jbyi * x;
  r.c_xz = z - r.kbyi * x;
  r.c_yx = x - r.ibyj * y;
  r.c_yz = z - r.kbyj * y;
  r.c_zx = x - r.ibyk * z;
  r.c_zy = y - r.jbyk * z;

  r.classification = classify(i, j, k);
  return r;
};

function createRay(rayOrigin, rayDirection) {
  return new Ray(rayOrigin, rayDirection)
}
