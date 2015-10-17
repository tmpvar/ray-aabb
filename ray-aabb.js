var classify = require('ray-direction-classify');

module.exports = createRay;

var tests = {};
var max = Math.max;
var abs = Math.abs;

tests[classify.MMM] = function testMMM(ray, box) {
  var ro = ray.ro;

  return !(ro[0] < box[0][0] ||
          ro[1] < box[0][1] ||
          ro[2] < box[0][2] ||
          ray.jbyi * box[0][0] - box[1][1] + ray.c_xy > 0 ||
          ray.ibyj * box[0][1] - box[1][0] + ray.c_yx > 0 ||
          ray.jbyk * box[0][2] - box[1][1] + ray.c_zy > 0 ||
          ray.kbyj * box[0][1] - box[1][2] + ray.c_yz > 0 ||
          ray.kbyi * box[0][0] - box[1][2] + ray.c_xz > 0 ||
          ray.ibyk * box[0][2] - box[1][0] + ray.c_zx > 0);
};
tests[classify.MMP] = function testMMP(ray, box) {
  var ro = ray.ro;

  return !(ro[0] < box[0][0] ||
          ro[1] < box[0][1] ||
          ro[2] > box[1][2] ||
          ray.jbyi * box[0][0] - box[1][1] + ray.c_xy > 0 ||
          ray.ibyj * box[0][1] - box[1][0] + ray.c_yx > 0 ||
          ray.jbyk * box[1][2] - box[1][1] + ray.c_zy > 0 ||
          ray.kbyj * box[0][1] - box[0][2] + ray.c_yz < 0 ||
          ray.kbyi * box[0][0] - box[0][2] + ray.c_xz < 0 ||
          ray.ibyk * box[1][2] - box[1][0] + ray.c_zx > 0);
};
tests[classify.MPM] = function testMPM(ray, box) {
  var ro = ray.ro;

  return !(ro[0] < box[0][0] ||
          ro[1] > box[1][1] ||
          ro[2] < box[0][2] ||
          ray.jbyi * box[0][0] - box[0][1] + ray.c_xy < 0 ||
          ray.ibyj * box[1][1] - box[1][0] + ray.c_yx > 0 ||
          ray.jbyk * box[0][2] - box[0][1] + ray.c_zy < 0 ||
          ray.kbyj * box[1][1] - box[1][2] + ray.c_yz > 0 ||
          ray.kbyi * box[0][0] - box[1][2] + ray.c_xz > 0 ||
          ray.ibyk * box[0][2] - box[1][0] + ray.c_zx > 0);
};
tests[classify.MPP] = function testMPP(ray, box) {
  var ro = ray.ro;

  return !(ro[0] < box[0][0] ||
          ro[1] > box[1][1] ||
          ro[2] > box[1][2] ||
          ray.jbyi * box[0][0] - box[0][1] + ray.c_xy < 0 ||
          ray.ibyj * box[1][1] - box[1][0] + ray.c_yx > 0 ||
          ray.jbyk * box[1][2] - box[0][1] + ray.c_zy < 0 ||
          ray.kbyj * box[1][1] - box[0][2] + ray.c_yz < 0 ||
          ray.kbyi * box[0][0] - box[0][2] + ray.c_xz < 0 ||
          ray.ibyk * box[1][2] - box[1][0] + ray.c_zx > 0);
};
tests[classify.PMM] = function testPMM(ray, box) {
  var ro = ray.ro;

  return !(ro[0] > box[1][0] ||
          ro[1] < box[0][1] ||
          ro[2] < box[0][2] ||
          ray.jbyi * box[1][0] - box[1][1] + ray.c_xy > 0 ||
          ray.ibyj * box[0][1] - box[0][0] + ray.c_yx < 0 ||
          ray.jbyk * box[0][2] - box[1][1] + ray.c_zy > 0 ||
          ray.kbyj * box[0][1] - box[1][2] + ray.c_yz > 0 ||
          ray.kbyi * box[1][0] - box[1][2] + ray.c_xz > 0 ||
          ray.ibyk * box[0][2] - box[0][0] + ray.c_zx < 0);
};
tests[classify.PMP] = function testPMP(ray, box) {
  var ro = ray.ro;

  return !(ro[0] > box[1][0] ||
          ro[1] < box[0][1] ||
          ro[2] > box[1][2] ||
          ray.jbyi * box[1][0] - box[1][1] + ray.c_xy > 0 ||
          ray.ibyj * box[0][1] - box[0][0] + ray.c_yx < 0 ||
          ray.jbyk * box[1][2] - box[1][1] + ray.c_zy > 0 ||
          ray.kbyj * box[0][1] - box[0][2] + ray.c_yz < 0 ||
          ray.kbyi * box[1][0] - box[0][2] + ray.c_xz < 0 ||
          ray.ibyk * box[1][2] - box[0][0] + ray.c_zx < 0);
};
tests[classify.PPM] = function testPPM(ray, box) {
  var ro = ray.ro;

  return !(ro[0] > box[1][0] ||
          ro[1] > box[1][1] ||
          ro[2] < box[0][2] ||
          ray.jbyi * box[1][0] - box[0][1] + ray.c_xy < 0 ||
          ray.ibyj * box[1][1] - box[0][0] + ray.c_yx < 0 ||
          ray.jbyk * box[0][2] - box[0][1] + ray.c_zy < 0 ||
          ray.kbyj * box[1][1] - box[1][2] + ray.c_yz > 0 ||
          ray.kbyi * box[1][0] - box[1][2] + ray.c_xz > 0 ||
          ray.ibyk * box[0][2] - box[0][0] + ray.c_zx < 0);
};
tests[classify.PPP] = function testPPP(ray, box) {
  var ro = ray.ro;

  return !(ro[0] > box[1][0] ||
          ro[1] > box[1][1] ||
          ro[2] > box[1][2] ||
          ray.jbyi * box[1][0] - box[0][1] + ray.c_xy < 0 ||
          ray.ibyj * box[1][1] - box[0][0] + ray.c_yx < 0 ||
          ray.jbyk * box[1][2] - box[0][1] + ray.c_zy < 0 ||
          ray.kbyj * box[1][1] - box[0][2] + ray.c_yz < 0 ||
          ray.kbyi * box[1][0] - box[0][2] + ray.c_xz < 0 ||
          ray.ibyk * box[1][2] - box[0][0] + ray.c_zx < 0);
};
tests[classify.POO] = function testPOO(ray, box) {
  var ro = ray.ro;

  return !(ro[0] > box[1][0] ||
          ro[1] < box[0][1] ||
          ro[1] > box[1][1] ||
          ro[2] < box[0][2] ||
          ro[2] > box[1][2]);
};
tests[classify.MOO] = function testMOO(ray, box) {
  var ro = ray.ro;

  return !(ro[0] < box[0][0] ||
          ro[1] < box[0][1] ||
          ro[1] > box[1][1] ||
          ro[2] < box[0][2] ||
          ro[2] > box[1][2]);
};
tests[classify.OPO] = function testOPO(ray, box) {
  var ro = ray.ro;

  return !(ro[1] > box[1][1] ||
          ro[0] < box[0][0] ||
          ro[0] > box[1][0] ||
          ro[2] < box[0][2] ||
          ro[2] > box[1][2]);
};
tests[classify.OMO] = function testOMO(ray, box) {
  var ro = ray.ro;

  return !(ro[1] < box[0][1] ||
          ro[0] < box[0][0] ||
          ro[0] > box[1][0] ||
          ro[2] < box[0][2] ||
          ro[2] > box[1][2]);
};
tests[classify.OOP] = function testOOP(ray, box) {
  var ro = ray.ro;

  return !(ro[2] > box[1][2] ||
          ro[0] < box[0][0] ||
          ro[0] > box[1][0] ||
          ro[1] < box[0][1] ||
          ro[1] > box[1][1]);
};
tests[classify.OOM] = function testOOM(ray, box) {
  var ro = ray.ro;

  return !(ro[2] < box[0][2] ||
          ro[0] < box[0][0] ||
          ro[0] > box[1][0] ||
          ro[1] < box[0][1] ||
          ro[1] > box[1][1]);
};
tests[classify.OMM] = function testOMM(ray, box) {
  var ro = ray.ro;

  return !(ro[0] < box[0][0] ||
          ro[0] > box[1][0] ||
          ro[1] < box[0][1] ||
          ro[2] < box[0][2] ||
          ray.jbyk * box[0][2] - box[1][1] + ray.c_zy > 0 ||
          ray.kbyj * box[0][1] - box[1][2] + ray.c_yz > 0);
};
tests[classify.OMP] = function testOMP(ray, box) {
  var ro = ray.ro;

  return !(ro[0] < box[0][0] ||
          ro[0] > box[1][0] ||
          ro[1] < box[0][1] ||
          ro[2] > box[1][2] ||
          ray.jbyk * box[1][2] - box[1][1] + ray.c_zy > 0 ||
          ray.kbyj * box[0][1] - box[0][2] + ray.c_yz < 0);
};
tests[classify.OPM] = function testOPM(ray, box) {
  var ro = ray.ro;

  return !(ro[0] < box[0][0] ||
          ro[0] > box[1][0] ||
          ro[1] > box[1][1] ||
          ro[2] < box[0][2] ||
          ray.jbyk * box[0][2] - box[0][1] + ray.c_zy < 0 ||
          ray.kbyj * box[1][1] - box[1][2] + ray.c_yz > 0);
};
tests[classify.OPP] = function testOPP(ray, box) {
  var ro = ray.ro;

  return !(ro[0] < box[0][0] ||
          ro[0] > box[1][0] ||
          ro[1] > box[1][1] ||
          ro[2] > box[1][2] ||
          ray.jbyk * box[1][2] - box[0][1] + ray.c_zy < 0 ||
          ray.kbyj * box[1][1] - box[0][2] + ray.c_yz < 0);
};
tests[classify.MOM] = function testMOM(ray, box) {
  var ro = ray.ro;

  return !(ro[1] < box[0][1] ||
          ro[1] > box[1][1] ||
          ro[0] < box[0][0] ||
          ro[2] < box[0][2] ||
          ray.kbyi * box[0][0] - box[1][2] + ray.c_xz > 0 ||
          ray.ibyk * box[0][2] - box[1][0] + ray.c_zx > 0);
};
tests[classify.MOP] = function testMOP(ray, box) {
  var ro = ray.ro;

  return !(ro[1] < box[0][1] ||
          ro[1] > box[1][1] ||
          ro[0] < box[0][0] ||
          ro[2] > box[1][2] ||
          ray.kbyi * box[0][0] - box[0][2] + ray.c_xz < 0 ||
          ray.ibyk * box[1][2] - box[1][0] + ray.c_zx > 0);
};
tests[classify.POM] = function testPOM(ray, box) {
  var ro = ray.ro;

  return !(ro[1] < box[0][1] ||
          ro[1] > box[1][1] ||
          ro[0] > box[1][0] ||
          ro[2] < box[0][2] ||
          ray.kbyi * box[1][0] - box[1][2] + ray.c_xz > 0 ||
          ray.ibyk * box[0][2] - box[0][0] + ray.c_zx < 0);
};
tests[classify.POP] = function testPOP(ray, box) {
  var ro = ray.ro;

  return !(ro[1] < box[0][1] ||
          ro[1] > box[1][1] ||
          ro[0] > box[1][0] ||
          ro[2] > box[1][2] ||
          ray.kbyi * box[1][0] - box[0][2] + ray.c_xz < 0 ||
          ray.ibyk * box[1][2] - box[0][0] + ray.c_zx < 0);
};
tests[classify.MMO] = function testMMO(ray, box) {
  var ro = ray.ro;

  return !(ro[2] < box[0][2] ||
          ro[2] > box[1][2] ||
          ro[0] < box[0][0] ||
          ro[1] < box[0][1] ||
          ray.jbyi * box[0][0] - box[1][1] + ray.c_xy > 0 ||
          ray.ibyj * box[0][1] - box[1][0] + ray.c_yx > 0);
};
tests[classify.MPO] = function testMPO(ray, box) {
  var ro = ray.ro;

  return !(ro[2] < box[0][2] ||
          ro[2] > box[1][2] ||
          ro[0] < box[0][0] ||
          ro[1] > box[1][1] ||
          ray.jbyi * box[0][0] - box[0][1] + ray.c_xy < 0 ||
          ray.ibyj * box[1][1] - box[1][0] + ray.c_yx > 0);
};
tests[classify.PMO] = function testPMO(ray, box) {
  var ro = ray.ro;

  return !(ro[2] < box[0][2] ||
          ro[2] > box[1][2] ||
          ro[0] > box[1][0] ||
          ro[1] < box[0][1] ||
          ray.jbyi * box[1][0] - box[1][1] + ray.c_xy > 0 ||
          ray.ibyj * box[0][1] - box[0][0] + ray.c_yx < 0);
};
tests[classify.PPO] = function testPPO(ray, box) {
  var ro = ray.ro;

  return !(ro[2] < box[0][2] ||
          ro[2] > box[1][2] ||
          ro[0] > box[1][0] ||
          ro[1] > box[1][1] ||
          ray.jbyi * box[1][0] - box[0][1] + ray.c_xy < 0 ||
          ray.ibyj * box[1][1] - box[0][0] + ray.c_yx < 0);
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

lerps[classify.MMP] = function(ray, aabb, norm) {
  return max(
    (aabb[1][0] - ray.ro[0]) * ray.ii,
    (aabb[1][1] - ray.ro[1]) * ray.ij,
    (aabb[0][2] - ray.ro[2]) * ray.ik
  );
};

lerps[classify.MPM] = function(ray, aabb, norm) {
  return max(
    (aabb[1][0] - ray.ro[0]) * ray.ii,
    (aabb[0][1] - ray.ro[1]) * ray.ij,
    (aabb[1][2] - ray.ro[2]) * ray.ik
  );
};

lerps[classify.MPP] = function(ray, aabb, norm) {
  return max(
    (aabb[1][0] - ray.ro[0]) * ray.ii,
    (aabb[0][1] - ray.ro[1]) * ray.ij,
    (aabb[0][2] - ray.ro[2]) * ray.ik
  );
};

lerps[classify.PMM] = function(ray, aabb, norm) {
  return max(
    (aabb[0][0] - ray.ro[0]) * ray.ii,
    (aabb[1][1] - ray.ro[1]) * ray.ij,
    (aabb[1][2] - ray.ro[2]) * ray.ik
  );
};

lerps[classify.PMP] = function(ray, aabb, norm) {
  return max(
    (aabb[0][0] - ray.ro[0]) * ray.ii,
    (aabb[1][1] - ray.ro[1]) * ray.ij,
    (aabb[0][2] - ray.ro[2]) * ray.ik
  );
};

lerps[classify.PPM] = function(ray, aabb, norm) {
  return max(
    (aabb[0][0] - ray.ro[0]) * ray.ii,
    (aabb[0][1] - ray.ro[1]) * ray.ij,
    (aabb[1][2] - ray.ro[2]) * ray.ik
  );
};

lerps[classify.PPP] = function(ray, aabb, norm) {
  return max(
    (aabb[0][0] - ray.ro[0]) * ray.ii,
    (aabb[0][1] - ray.ro[1]) * ray.ij,
    (aabb[0][2] - ray.ro[2]) * ray.ik
  );
};

lerps[classify.OMM] = function(ray, aabb, norm) {
  return max(
    (aabb[1][1] - ray.ro[1]) * ray.ij,
    (aabb[1][2] - ray.ro[2]) * ray.ik
  );
};

lerps[classify.OMP] = function(ray, aabb, norm) {
  return max(
    (aabb[1][1] - ray.ro[1]) * ray.ij,
    (aabb[0][2] - ray.ro[2]) * ray.ik
  );
};

lerps[classify.OPM] = function(ray, aabb, norm) {
  return max(
    (aabb[0][1] - ray.ro[1]) * ray.ij,
    (aabb[1][2] - ray.ro[2]) * ray.ik
  );
};

lerps[classify.OPP] = function(ray, aabb, norm) {
  return max(
    (aabb[0][1] - ray.ro[1]) * ray.ij,
    (aabb[0][2] - ray.ro[2]) * ray.ik
  );
}

lerps[classify.MOM] = function(ray, aabb, norm) {
  return max(
    (aabb[1][0] - ray.ro[0]) * ray.ii,
    (aabb[1][2] - ray.ro[2]) * ray.ik
  );
};

lerps[classify.MOP] = function(ray, aabb, norm) {
  return max(
    (aabb[1][0] - ray.ro[0]) * ray.ii,
    (aabb[0][2] - ray.ro[2]) * ray.ik
  );
};

lerps[classify.POM] = function(ray, aabb, norm) {
  return max(
    (aabb[0][0] - ray.ro[0]) * ray.ii,
    (aabb[1][2] - ray.ro[2]) * ray.ik
  );
};

lerps[classify.POP] = function(ray, aabb, norm) {
  return max(
    (aabb[0][0] - ray.ro[0]) * ray.ii,
    (aabb[0][2] - ray.ro[2]) * ray.ik
  );
}

lerps[classify.MMO] = function(ray, aabb, norm) {
  return max(
    (aabb[1][0] - ray.ro[0]) * ray.ii,
    t1 = (aabb[1][1] - ray.ro[1]) * ray.ij
  );
}

lerps[classify.MPO] = function(ray, aabb, norm) {
  return max(
    (aabb[1][0] - ray.ro[0]) * ray.ii,
    (aabb[0][1] - ray.ro[1]) * ray.ij
  );
};

lerps[classify.PMO] = function(ray, aabb, norm) {
  return max(
    (aabb[0][0] - ray.ro[0]) * ray.ii,
    (aabb[1][1] - ray.ro[1]) * ray.ij
  );
};

lerps[classify.PPO] = function(ray, aabb, norm) {
  return max(
    (aabb[0][0] - ray.ro[0]) * ray.ii,
    (aabb[0][1] - ray.ro[1]) * ray.ij
  );
};

lerps[classify.MOO] = function(ray, aabb, norm) {
  return (aabb[1][0] - ray.ro[0]) * ray.ii;
};

lerps[classify.POO] = function(ray, aabb, norm) {
  return (aabb[0][0] - ray.ro[0]) * ray.ii;
};

lerps[classify.OMO] = function(ray, aabb, norm) {
  return (aabb[1][1] - ray.ro[1]) * ray.ij;
};

lerps[classify.OPO] = function(ray, aabb, norm) {
  return (aabb[0][1] - ray.ro[1]) * ray.ij;
};

lerps[classify.OOM] = function(ray, aabb, norm) {
  return (aabb[1][2] - ray.ro[2]) * ray.ik;
};

lerps[classify.OOP] = function(ray, aabb, norm) {
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

Ray.prototype.intersects =  function rayIntersectsAABB(aabb, computeDistance) {
  var classification = this.classification;
  var t = tests[classification];
  if (t && t(this, aabb)) {
    if (!computeDistance) {
      return true;
    }

    var lerp = lerps[classification]
    return lerp && lerp(this, aabb, computeDistance);
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
