var classify = require('ray-direction-classify');

module.exports = isect;

var tests = isect.tests = {}

tests[classify.MMM] = function testMMM(ray, box) {
  var ro = ray.ro;

  return (ro[0] < box[0][0] ||
          ro[1] < box[0][1] ||
          ro[2] < box[0][2] ||
          ray.jbyi * box[0][0] - box[1][1] + ray.c_xy > 0 ||
          ray.ibyj * box[0][1] - box[1][0] + ray.c_yx > 0 ||
          ray.jbyk * box[0][2] - box[1][1] + ray.c_zy > 0 ||
          ray.kbyj * box[0][1] - box[1][2] + ray.c_yz > 0 ||
          ray.kbyi * box[0][0] - box[1][2] + ray.c_xz > 0 ||
          ray.ibyk * box[0][2] - box[1][0] + ray.c_zx > 0) ? false : true;
};
tests[classify.MMP] = function testMMP(ray, box) {
  var ro = ray.ro;

  return (ro[0] < box[0][0] ||
          ro[1] < box[0][1] ||
          ro[2] > box[1][2] ||
          ray.jbyi * box[0][0] - box[1][1] + ray.c_xy > 0 ||
          ray.ibyj * box[0][1] - box[1][0] + ray.c_yx > 0 ||
          ray.jbyk * box[1][2] - box[1][1] + ray.c_zy > 0 ||
          ray.kbyj * box[0][1] - box[0][2] + ray.c_yz < 0 ||
          ray.kbyi * box[0][0] - box[0][2] + ray.c_xz < 0 ||
          ray.ibyk * box[1][2] - box[1][0] + ray.c_zx > 0) ? false : true;
};
tests[classify.MPM] = function testMPM(ray, box) {
  var ro = ray.ro;

  return (ro[0] < box[0][0] ||
          ro[1] > box[1][1] ||
          ro[2] < box[0][2] ||
          ray.jbyi * box[0][0] - box[0][1] + ray.c_xy < 0 ||
          ray.ibyj * box[1][1] - box[1][0] + ray.c_yx > 0 ||
          ray.jbyk * box[0][2] - box[0][1] + ray.c_zy < 0 ||
          ray.kbyj * box[1][1] - box[1][2] + ray.c_yz > 0 ||
          ray.kbyi * box[0][0] - box[1][2] + ray.c_xz > 0 ||
          ray.ibyk * box[0][2] - box[1][0] + ray.c_zx > 0) ? false : true;
};
tests[classify.MPP] = function testMPP(ray, box) {
  var ro = ray.ro;

  return (ro[0] < box[0][0] ||
          ro[1] > box[1][1] ||
          ro[2] > box[1][2] ||
          ray.jbyi * box[0][0] - box[0][1] + ray.c_xy < 0 ||
          ray.ibyj * box[1][1] - box[1][0] + ray.c_yx > 0 ||
          ray.jbyk * box[1][2] - box[0][1] + ray.c_zy < 0 ||
          ray.kbyj * box[1][1] - box[0][2] + ray.c_yz < 0 ||
          ray.kbyi * box[0][0] - box[0][2] + ray.c_xz < 0 ||
          ray.ibyk * box[1][2] - box[1][0] + ray.c_zx > 0) ? false : true;
};
tests[classify.PMM] = function testPMM(ray, box) {
  var ro = ray.ro;

  return (ro[0] > box[1][0] ||
          ro[1] < box[0][1] ||
          ro[2] < box[0][2] ||
          ray.jbyi * box[1][0] - box[1][1] + ray.c_xy > 0 ||
          ray.ibyj * box[0][1] - box[0][0] + ray.c_yx < 0 ||
          ray.jbyk * box[0][2] - box[1][1] + ray.c_zy > 0 ||
          ray.kbyj * box[0][1] - box[1][2] + ray.c_yz > 0 ||
          ray.kbyi * box[1][0] - box[1][2] + ray.c_xz > 0 ||
          ray.ibyk * box[0][2] - box[0][0] + ray.c_zx < 0) ? false : true;
};
tests[classify.PMP] = function testPMP(ray, box) {
  var ro = ray.ro;

  return (ro[0] > box[1][0] ||
          ro[1] < box[0][1] ||
          ro[2] > box[1][2] ||
          ray.jbyi * box[1][0] - box[1][1] + ray.c_xy > 0 ||
          ray.ibyj * box[0][1] - box[0][0] + ray.c_yx < 0 ||
          ray.jbyk * box[1][2] - box[1][1] + ray.c_zy > 0 ||
          ray.kbyj * box[0][1] - box[0][2] + ray.c_yz < 0 ||
          ray.kbyi * box[1][0] - box[0][2] + ray.c_xz < 0 ||
          ray.ibyk * box[1][2] - box[0][0] + ray.c_zx < 0) ? false : true;
};
tests[classify.PPM] = function testPPM(ray, box) {
  var ro = ray.ro;

  return (ro[0] > box[1][0] ||
          ro[1] > box[1][1] ||
          ro[2] < box[0][2] ||
          ray.jbyi * box[1][0] - box[0][1] + ray.c_xy < 0 ||
          ray.ibyj * box[1][1] - box[0][0] + ray.c_yx < 0 ||
          ray.jbyk * box[0][2] - box[0][1] + ray.c_zy < 0 ||
          ray.kbyj * box[1][1] - box[1][2] + ray.c_yz > 0 ||
          ray.kbyi * box[1][0] - box[1][2] + ray.c_xz > 0 ||
          ray.ibyk * box[0][2] - box[0][0] + ray.c_zx < 0) ? false : true;
};
tests[classify.PPP] = function testPPP(ray, box) {
  var ro = ray.ro;

  return (ro[0] > box[1][0] ||
          ro[1] > box[1][1] ||
          ro[2] > box[1][2] ||
          ray.jbyi * box[1][0] - box[0][1] + ray.c_xy < 0 ||
          ray.ibyj * box[1][1] - box[0][0] + ray.c_yx < 0 ||
          ray.jbyk * box[1][2] - box[0][1] + ray.c_zy < 0 ||
          ray.kbyj * box[1][1] - box[0][2] + ray.c_yz < 0 ||
          ray.kbyi * box[1][0] - box[0][2] + ray.c_xz < 0 ||
          ray.ibyk * box[1][2] - box[0][0] + ray.c_zx < 0) ? false : true;
};
tests[classify.POO] = function testPOO(ray, box) {
  var ro = ray.ro;

  return (ro[0] > box[1][0] ||
          ro[1] < box[0][1] ||
          ro[1] > box[1][1] ||
          ro[2] < box[0][2] ||
          ro[2] > box[1][2]) ? false : true;
};
tests[classify.MOO] = function testMOO(ray, box) {
  var ro = ray.ro;

  return (ro[0] < box[0][0] ||
          ro[1] < box[0][1] ||
          ro[1] > box[1][1] ||
          ro[2] < box[0][2] ||
          ro[2] > box[1][2]) ? false : true;
};
tests[classify.OPO] = function testOPO(ray, box) {
  var ro = ray.ro;

  return (ro[1] > box[1][1] ||
          ro[0] < box[0][0] ||
          ro[0] > box[1][0] ||
          ro[2] < box[0][2] ||
          ro[2] > box[1][2]) ? false : true;
};
tests[classify.OMO] = function testOMO(ray, box) {
  var ro = ray.ro;

  return (ro[1] < box[0][1] ||
          ro[0] < box[0][0] ||
          ro[0] > box[1][0] ||
          ro[2] < box[0][2] ||
          ro[2] > box[1][2]) ? false : true;
};
tests[classify.OOP] = function testOOP(ray, box) {
  var ro = ray.ro;

  return (ro[2] > box[1][2] ||
          ro[0] < box[0][0] ||
          ro[0] > box[1][0] ||
          ro[1] < box[0][1] ||
          ro[1] > box[1][1]) ? false : true;
};
tests[classify.OOM] = function testOOM(ray, box) {
  var ro = ray.ro;

  return (ro[2] < box[0][2] ||
          ro[0] < box[0][0] ||
          ro[0] > box[1][0] ||
          ro[1] < box[0][1] ||
          ro[1] > box[1][1]) ? false : true;
};
tests[classify.OMM] = function testOMM(ray, box) {
  var ro = ray.ro;

  return (ro[0] < box[0][0] ||
          ro[0] > box[1][0] ||
          ro[1] < box[0][1] ||
          ro[2] < box[0][2] ||
          ray.jbyk * box[0][2] - box[1][1] + ray.c_zy > 0 ||
          ray.kbyj * box[0][1] - box[1][2] + ray.c_yz > 0) ? false : true;
};
tests[classify.OMP] = function testOMP(ray, box) {
  var ro = ray.ro;

  return (ro[0] < box[0][0] ||
          ro[0] > box[1][0] ||
          ro[1] < box[0][1] ||
          ro[2] > box[1][2] ||
          ray.jbyk * box[1][2] - box[1][1] + ray.c_zy > 0 ||
          ray.kbyj * box[0][1] - box[0][2] + ray.c_yz < 0) ? false : true;
};
tests[classify.OPM] = function testOPM(ray, box) {
  var ro = ray.ro;

  return (ro[0] < box[0][0] ||
          ro[0] > box[1][0] ||
          ro[1] > box[1][1] ||
          ro[2] < box[0][2] ||
          ray.jbyk * box[0][2] - box[0][1] + ray.c_zy < 0 ||
          ray.kbyj * box[1][1] - box[1][2] + ray.c_yz > 0) ? false : true;
};
tests[classify.OPP] = function testOPP(ray, box) {
  var ro = ray.ro;

  return (ro[0] < box[0][0] ||
          ro[0] > box[1][0] ||
          ro[1] > box[1][1] ||
          ro[2] > box[1][2] ||
          ray.jbyk * box[1][2] - box[0][1] + ray.c_zy < 0 ||
          ray.kbyj * box[1][1] - box[0][2] + ray.c_yz < 0) ? false : true;
};
tests[classify.MOM] = function testMOM(ray, box) {
  var ro = ray.ro;

  return (ro[1] < box[0][1] ||
          ro[1] > box[1][1] ||
          ro[0] < box[0][0] ||
          ro[2] < box[0][2] ||
          ray.kbyi * box[0][0] - box[1][2] + ray.c_xz > 0 ||
          ray.ibyk * box[0][2] - box[1][0] + ray.c_zx > 0) ? false : true;
};
tests[classify.MOP] = function testMOP(ray, box) {
  var ro = ray.ro;

  return (ro[1] < box[0][1] ||
          ro[1] > box[1][1] ||
          ro[0] < box[0][0] ||
          ro[2] > box[1][2] ||
          ray.kbyi * box[0][0] - box[0][2] + ray.c_xz < 0 ||
          ray.ibyk * box[1][2] - box[1][0] + ray.c_zx > 0) ? false : true;
};
tests[classify.POM] = function testPOM(ray, box) {
  var ro = ray.ro;

  return (ro[1] < box[0][1] ||
          ro[1] > box[1][1] ||
          ro[0] > box[1][0] ||
          ro[2] < box[0][2] ||
          ray.kbyi * box[1][0] - box[1][2] + ray.c_xz > 0 ||
          ray.ibyk * box[0][2] - box[0][0] + ray.c_zx < 0) ? false : true;
};
tests[classify.POP] = function testPOP(ray, box) {
  var ro = ray.ro;

  return (ro[1] < box[0][1] ||
          ro[1] > box[1][1] ||
          ro[0] > box[1][0] ||
          ro[2] > box[1][2] ||
          ray.kbyi * box[1][0] - box[0][2] + ray.c_xz < 0 ||
          ray.ibyk * box[1][2] - box[0][0] + ray.c_zx < 0) ? false : true;
};
tests[classify.MMO] = function testMMO(ray, box) {
  var ro = ray.ro;

  return (ro[2] < box[0][2] ||
          ro[2] > box[1][2] ||
          ro[0] < box[0][0] ||
          ro[1] < box[0][1] ||
          ray.jbyi * box[0][0] - box[1][1] + ray.c_xy > 0 ||
          ray.ibyj * box[0][1] - box[1][0] + ray.c_yx > 0) ? false : true;
};
tests[classify.MPO] = function testMPO(ray, box) {
  var ro = ray.ro;

  return (ro[2] < box[0][2] ||
          ro[2] > box[1][2] ||
          ro[0] < box[0][0] ||
          ro[1] > box[1][1] ||
          ray.jbyi * box[0][0] - box[0][1] + ray.c_xy < 0 ||
          ray.ibyj * box[1][1] - box[1][0] + ray.c_yx > 0) ? false : true;
};
tests[classify.PMO] = function testPMO(ray, box) {
  var ro = ray.ro;

  return (ro[2] < box[0][2] ||
          ro[2] > box[1][2] ||
          ro[0] > box[1][0] ||
          ro[1] < box[0][1] ||
          ray.jbyi * box[1][0] - box[1][1] + ray.c_xy > 0 ||
          ray.ibyj * box[0][1] - box[0][0] + ray.c_yx < 0) ? false : true;
};
tests[classify.PPO] = function testPPO(ray, box) {
  var ro = ray.ro;

  return (ro[2] < box[0][2] ||
          ro[2] > box[1][2] ||
          ro[0] > box[1][0] ||
          ro[1] > box[1][1] ||
          ray.jbyi * box[1][0] - box[0][1] + ray.c_xy < 0 ||
          ray.ibyj * box[1][1] - box[0][0] + ray.c_yx < 0) ? false : true;
};

function isect(ray, box) {
  return tests[ray.classification] && tests[ray.classification](ray, box);
}

isect.createRay = function createRay(ro, rd) {
  var ray = { ro: ro, rd: rd };
  var i = rd[0], j = rd[1], k = rd[2];
  var x = ro[0], y = ro[1], z = ro[2];

  ray.ii = (i)?1.0/i:0;
  ray.ij = (j)?1.0/j:0;
  ray.ik = (k)?1.0/k:0;
  //ray slope
  ray.ibyj = i * ray.ij;
  ray.jbyi = j * ray.ii;
  ray.jbyk = j * ray.ik;
  ray.kbyj = k * ray.ij;
  ray.ibyk = i * ray.ik;
  ray.kbyi = k * ray.ii;
  ray.c_xy = y - ray.jbyi * x;
  ray.c_xz = z - ray.kbyi * x;
  ray.c_yx = x - ray.ibyj * y;
  ray.c_yz = z - ray.kbyj * y;
  ray.c_zx = x - ray.ibyk * z;
  ray.c_zy = y - ray.jbyk * z;

  ray.classification = classify(i, j, k);

  return ray;
};
