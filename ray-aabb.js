module.exports = isect;

function int(s) {
  return parseInt(s, 2);
}

var MMM = int('111111');
var MMP = int('111101');
var MPM = int('110111');
var MPP = int('110101');
var PMM = int('011111');
var PMP = int('011101');
var PPM = int('010111');
var PPP = int('010101');
var POO = int('010000');
var MOO = int('110000');
var OPO = int('000100');
var OMO = int('001100');
var OOP = int('000001');
var OOM = int('000011');
var OMM = int('001111');
var OMP = int('001101');
var OPM = int('000111');
var OPP = int('000101');
var MOM = int('110011');
var MOP = int('110001');
var POM = int('010011');
var POP = int('010001');
var MMO = int('111100');
var MPO = int('110100');
var PMO = int('011100');
var PPO = int('010100');

var tests = isect.tests = {}

tests[MMM] = function testMMM(ray, box) {
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
tests[MMP] = function testMMP(ray, box) {
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
tests[MPM] = function testMPM(ray, box) {
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
tests[MPP] = function testMPP(ray, box) {
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
tests[PMM] = function testPMM(ray, box) {
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
tests[PMP] = function testPMP(ray, box) {
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
tests[PPM] = function testPPM(ray, box) {
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
tests[PPP] = function testPPP(ray, box) {
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
tests[POO] = function testPOO(ray, box) {
  var ro = ray.ro;

  return (ro[0] > box[1][0] ||
          ro[1] < box[0][1] ||
          ro[1] > box[1][1] ||
          ro[2] < box[0][2] ||
          ro[2] > box[1][2]) ? false : true;
};
tests[MOO] = function testMOO(ray, box) {
  var ro = ray.ro;

  return (ro[0] < box[0][0] ||
          ro[1] < box[0][1] ||
          ro[1] > box[1][1] ||
          ro[2] < box[0][2] ||
          ro[2] > box[1][2]) ? false : true;
};
tests[OPO] = function testOPO(ray, box) {
  var ro = ray.ro;

  return (ro[1] > box[1][1] ||
          ro[0] < box[0][0] ||
          ro[0] > box[1][0] ||
          ro[2] < box[0][2] ||
          ro[2] > box[1][2]) ? false : true;
};
tests[OMO] = function testOMO(ray, box) {
  var ro = ray.ro;

  return (ro[1] < box[0][1] ||
          ro[0] < box[0][0] ||
          ro[0] > box[1][0] ||
          ro[2] < box[0][2] ||
          ro[2] > box[1][2]) ? false : true;
};
tests[OOP] = function testOOP(ray, box) {
  var ro = ray.ro;

  return (ro[2] > box[1][2] ||
          ro[0] < box[0][0] ||
          ro[0] > box[1][0] ||
          ro[1] < box[0][1] ||
          ro[1] > box[1][1]) ? false : true;
};
tests[OOM] = function testOOM(ray, box) {
  var ro = ray.ro;

  return (ro[2] < box[0][2] ||
          ro[0] < box[0][0] ||
          ro[0] > box[1][0] ||
          ro[1] < box[0][1] ||
          ro[1] > box[1][1]) ? false : true;
};
tests[OMM] = function testOMM(ray, box) {
  var ro = ray.ro;

  return (ro[0] < box[0][0] ||
          ro[0] > box[1][0] ||
          ro[1] < box[0][1] ||
          ro[2] < box[0][2] ||
          ray.jbyk * box[0][2] - box[1][1] + ray.c_zy > 0 ||
          ray.kbyj * box[0][1] - box[1][2] + ray.c_yz > 0) ? false : true;
};
tests[OMP] = function testOMP(ray, box) {
  var ro = ray.ro;

  return (ro[0] < box[0][0] ||
          ro[0] > box[1][0] ||
          ro[1] < box[0][1] ||
          ro[2] > box[1][2] ||
          ray.jbyk * box[1][2] - box[1][1] + ray.c_zy > 0 ||
          ray.kbyj * box[0][1] - box[0][2] + ray.c_yz < 0) ? false : true;
};
tests[OPM] = function testOPM(ray, box) {
  var ro = ray.ro;

  return (ro[0] < box[0][0] ||
          ro[0] > box[1][0] ||
          ro[1] > box[1][1] ||
          ro[2] < box[0][2] ||
          ray.jbyk * box[0][2] - box[0][1] + ray.c_zy < 0 ||
          ray.kbyj * box[1][1] - box[1][2] + ray.c_yz > 0) ? false : true;
};
tests[OPP] = function testOPP(ray, box) {
  var ro = ray.ro;

  return (ro[0] < box[0][0] ||
          ro[0] > box[1][0] ||
          ro[1] > box[1][1] ||
          ro[2] > box[1][2] ||
          ray.jbyk * box[1][2] - box[0][1] + ray.c_zy < 0 ||
          ray.kbyj * box[1][1] - box[0][2] + ray.c_yz < 0) ? false : true;
};
tests[MOM] = function testMOM(ray, box) {
  var ro = ray.ro;

  return (ro[1] < box[0][1] ||
          ro[1] > box[1][1] ||
          ro[0] < box[0][0] ||
          ro[2] < box[0][2] ||
          ray.kbyi * box[0][0] - box[1][2] + ray.c_xz > 0 ||
          ray.ibyk * box[0][2] - box[1][0] + ray.c_zx > 0) ? false : true;
};
tests[MOP] = function testMOP(ray, box) {
  var ro = ray.ro;

  return (ro[1] < box[0][1] ||
          ro[1] > box[1][1] ||
          ro[0] < box[0][0] ||
          ro[2] > box[1][2] ||
          ray.kbyi * box[0][0] - box[0][2] + ray.c_xz < 0 ||
          ray.ibyk * box[1][2] - box[1][0] + ray.c_zx > 0) ? false : true;
};
tests[POM] = function testPOM(ray, box) {
  var ro = ray.ro;

  return (ro[1] < box[0][1] ||
          ro[1] > box[1][1] ||
          ro[0] > box[1][0] ||
          ro[2] < box[0][2] ||
          ray.kbyi * box[1][0] - box[1][2] + ray.c_xz > 0 ||
          ray.ibyk * box[0][2] - box[0][0] + ray.c_zx < 0) ? false : true;
};
tests[POP] = function testPOP(ray, box) {
  var ro = ray.ro;

  return (ro[1] < box[0][1] ||
          ro[1] > box[1][1] ||
          ro[0] > box[1][0] ||
          ro[2] > box[1][2] ||
          ray.kbyi * box[1][0] - box[0][2] + ray.c_xz < 0 ||
          ray.ibyk * box[1][2] - box[0][0] + ray.c_zx < 0) ? false : true;
};
tests[MMO] = function testMMO(ray, box) {
  var ro = ray.ro;

  return (ro[2] < box[0][2] ||
          ro[2] > box[1][2] ||
          ro[0] < box[0][0] ||
          ro[1] < box[0][1] ||
          ray.jbyi * box[0][0] - box[1][1] + ray.c_xy > 0 ||
          ray.ibyj * box[0][1] - box[1][0] + ray.c_yx > 0) ? false : true;
};
tests[MPO] = function testMPO(ray, box) {
  var ro = ray.ro;

  return (ro[2] < box[0][2] ||
          ro[2] > box[1][2] ||
          ro[0] < box[0][0] ||
          ro[1] > box[1][1] ||
          ray.jbyi * box[0][0] - box[0][1] + ray.c_xy < 0 ||
          ray.ibyj * box[1][1] - box[1][0] + ray.c_yx > 0) ? false : true;
};
tests[PMO] = function testPMO(ray, box) {
  var ro = ray.ro;

  return (ro[2] < box[0][2] ||
          ro[2] > box[1][2] ||
          ro[0] > box[1][0] ||
          ro[1] < box[0][1] ||
          ray.jbyi * box[1][0] - box[1][1] + ray.c_xy > 0 ||
          ray.ibyj * box[0][1] - box[0][0] + ray.c_yx < 0) ? false : true;
};
tests[PPO] = function testPPO(ray, box) {
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

isect.classify = classify;

function classify(i, j, k) {
  // sign
  i = (i>0) - (i<0);
  j = (j>0) - (j<0);
  k = (k>0) - (k<0);

  // b00110100 === MPO
  //    ||||||_ k non-zero (false)
  //    |||||_ k negative (false)
  //    ||||_ j non-zero (true)
  //    |||_ j negative (false)
  //    ||_ i non-zero (true)
  //    |_ i negative (true)
  return (i>>>-1) << 5 | ((i>>>0)&1) << 4 |
         (j>>>-1) << 3 | ((j>>>0)&1) << 2 |
         (k>>>-1) << 1 | (k>>>0)&1;
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
