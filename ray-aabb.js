module.exports = isect;

var MMM = 0;
var MMP = 1;
var MPM = 2;
var MPP = 3;
var PMM = 4;
var PMP = 5;
var PPM = 6;
var PPP = 7;
var POO = 8;
var MOO = 9;
var OPO = 10;
var OMO = 11;
var OOP = 12;
var OOM = 13;
var OMM = 14;
var OMP = 15;
var OPM = 16;
var OPP = 17;
var MOM = 18;
var MOP = 19;
var POM = 20;
var POP = 21;
var MMO = 22;
var MPO = 23;
var PMO = 24;
var PPO = 25;

var tests = isect.tests = [
  function testMMM(ray, box) {
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
  },
  function testMMP(ray, box) {
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
  },
  function testMPM(ray, box) {
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
  },
  function testMPP(ray, box) {
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
  },
  function testPMM(ray, box) {
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
  },
  function testPMP(ray, box) {
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
  },
  function testPPM(ray, box) {
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
  },
  function testPPP(ray, box) {
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
  },
  function testPOO(ray, box) {
    var ro = ray.ro;

    return (ro[0] > box[1][0] ||
            ro[1] < box[0][1] ||
            ro[1] > box[1][1] ||
            ro[2] < box[0][2] ||
            ro[2] > box[1][2]) ? false : true;
  },
  function testMOO(ray, box) {
    var ro = ray.ro;

    return (ro[0] < box[0][0] ||
            ro[1] < box[0][1] ||
            ro[1] > box[1][1] ||
            ro[2] < box[0][2] ||
            ro[2] > box[1][2]) ? false : true;
  },
  function testOPO(ray, box) {
    var ro = ray.ro;

    return (ro[1] > box[1][1] ||
            ro[0] < box[0][0] ||
            ro[0] > box[1][0] ||
            ro[2] < box[0][2] ||
            ro[2] > box[1][2]) ? false : true;
  },
  function testOMO(ray, box) {
    var ro = ray.ro;

    return (ro[1] < box[0][1] ||
            ro[0] < box[0][0] ||
            ro[0] > box[1][0] ||
            ro[2] < box[0][2] ||
            ro[2] > box[1][2]) ? false : true;
  },
  function testOOP(ray, box) {
    var ro = ray.ro;

    return (ro[2] > box[1][2] ||
            ro[0] < box[0][0] ||
            ro[0] > box[1][0] ||
            ro[1] < box[0][1] ||
            ro[1] > box[1][1]) ? false : true;
  },
  function testOOM(ray, box) {
    var ro = ray.ro;

    return (ro[2] < box[0][2] ||
            ro[0] < box[0][0] ||
            ro[0] > box[1][0] ||
            ro[1] < box[0][1] ||
            ro[1] > box[1][1]) ? false : true;
  },
  function testOMM(ray, box) {
    var ro = ray.ro;

    return (ro[0] < box[0][0] ||
            ro[0] > box[1][0] ||
            ro[1] < box[0][1] ||
            ro[2] < box[0][2] ||
            ray.jbyk * box[0][2] - box[1][1] + ray.c_zy > 0 ||
            ray.kbyj * box[0][1] - box[1][2] + ray.c_yz > 0) ? false : true;
  },
  function testOMP(ray, box) {
    var ro = ray.ro;

    return (ro[0] < box[0][0] ||
            ro[0] > box[1][0] ||
            ro[1] < box[0][1] ||
            ro[2] > box[1][2] ||
            ray.jbyk * box[1][2] - box[1][1] + ray.c_zy > 0 ||
            ray.kbyj * box[0][1] - box[0][2] + ray.c_yz < 0) ? false : true;
  },
  function testOPM(ray, box) {
    var ro = ray.ro;

    return (ro[0] < box[0][0] ||
            ro[0] > box[1][0] ||
            ro[1] > box[1][1] ||
            ro[2] < box[0][2] ||
            ray.jbyk * box[0][2] - box[0][1] + ray.c_zy < 0 ||
            ray.kbyj * box[1][1] - box[1][2] + ray.c_yz > 0) ? false : true;
  },
  function testOPP(ray, box) {
    var ro = ray.ro;

    return (ro[0] < box[0][0] ||
            ro[0] > box[1][0] ||
            ro[1] > box[1][1] ||
            ro[2] > box[1][2] ||
            ray.jbyk * box[1][2] - box[0][1] + ray.c_zy < 0 ||
            ray.kbyj * box[1][1] - box[0][2] + ray.c_yz < 0) ? false : true;
  },
  function testMOM(ray, box) {
    var ro = ray.ro;

    return (ro[1] < box[0][1] ||
            ro[1] > box[1][1] ||
            ro[0] < box[0][0] ||
            ro[2] < box[0][2] ||
            ray.kbyi * box[0][0] - box[1][2] + ray.c_xz > 0 ||
            ray.ibyk * box[0][2] - box[1][0] + ray.c_zx > 0) ? false : true;
  },
  function testMOP(ray, box) {
    var ro = ray.ro;

    return (ro[1] < box[0][1] ||
            ro[1] > box[1][1] ||
            ro[0] < box[0][0] ||
            ro[2] > box[1][2] ||
            ray.kbyi * box[0][0] - box[0][2] + ray.c_xz < 0 ||
            ray.ibyk * box[1][2] - box[1][0] + ray.c_zx > 0) ? false : true;
  },
  function testPOM(ray, box) {
    var ro = ray.ro;

    return (ro[1] < box[0][1] ||
            ro[1] > box[1][1] ||
            ro[0] > box[1][0] ||
            ro[2] < box[0][2] ||
            ray.kbyi * box[1][0] - box[1][2] + ray.c_xz > 0 ||
            ray.ibyk * box[0][2] - box[0][0] + ray.c_zx < 0) ? false : true;
  },
  function testPOP(ray, box) {
    var ro = ray.ro;

    return (ro[1] < box[0][1] ||
            ro[1] > box[1][1] ||
            ro[0] > box[1][0] ||
            ro[2] > box[1][2] ||
            ray.kbyi * box[1][0] - box[0][2] + ray.c_xz < 0 ||
            ray.ibyk * box[1][2] - box[0][0] + ray.c_zx < 0) ? false : true;
  },
  function testMMO(ray, box) {
    var ro = ray.ro;

    return (ro[2] < box[0][2] ||
            ro[2] > box[1][2] ||
            ro[0] < box[0][0] ||
            ro[1] < box[0][1] ||
            ray.jbyi * box[0][0] - box[1][1] + ray.c_xy > 0 ||
            ray.ibyj * box[0][1] - box[1][0] + ray.c_yx > 0) ? false : true;
  },
  function testMPO(ray, box) {
    var ro = ray.ro;

    return (ro[2] < box[0][2] ||
            ro[2] > box[1][2] ||
            ro[0] < box[0][0] ||
            ro[1] > box[1][1] ||
            ray.jbyi * box[0][0] - box[0][1] + ray.c_xy < 0 ||
            ray.ibyj * box[1][1] - box[1][0] + ray.c_yx > 0) ? false : true;
  },
  function testPMO(ray, box) {
    var ro = ray.ro;

    return (ro[2] < box[0][2] ||
            ro[2] > box[1][2] ||
            ro[0] > box[1][0] ||
            ro[1] < box[0][1] ||
            ray.jbyi * box[1][0] - box[1][1] + ray.c_xy > 0 ||
            ray.ibyj * box[0][1] - box[0][0] + ray.c_yx < 0) ? false : true;
  },
  function testPPO(ray, box) {
    var ro = ray.ro;

    return (ro[2] < box[0][2] ||
            ro[2] > box[1][2] ||
            ro[0] > box[1][0] ||
            ro[1] > box[1][1] ||
            ray.jbyi * box[1][0] - box[0][1] + ray.c_xy < 0 ||
            ray.ibyj * box[1][1] - box[0][0] + ray.c_yx < 0) ? false : true;
  },
]

function isect(ray, box) {
  return tests[ray.classification] && tests[ray.classification](ray, box);
}

isect.classify = classify;

function classify(rd) {
  var i = rd[0];
  var j = rd[1];
  var k = rd[2];

  //ray slope classification
  if(i < 0) {
    if(j < 0) {
      if(k < 0) {
        return MMM;
      } else if(k > 0) {
        return MMP;
      } else { //(k >= 0)
        return MMO;
      }
    } else { //(j >= 0)
      if(k < 0) {

        if(j === 0) {
          return MOM;
        } else {
          return MPM;
        }
      } else { //(k >= 0)
        if(j === 0 && k === 0) {
          return MOO;
        } else if(k === 0) {
          return MPO;
        } else if(j === 0) {
          return MOP;
        } else {
          return MPP;
        }
      }
    }
  } else { //(i >= 0)
    if(j < 0) {
      if(k < 0) {
        if(i === 0) {
          return OMM;
        } else {
          return PMM;
        }
      } else { //(k >= 0)
        if(i === 0 && k === 0) {
          return OMO;
        } else if(k === 0) {
          return PMO;
        } else if(i === 0) {
          return OMP;
        } else {
          return PMP;
        }
      }
    } else { //(j >= 0)
      if(k < 0) {
        if (i === 0 && j === 0) {
          return OOM;
        } else if(i === 0) {
          return OPM;
        } else if(j === 0) {
          return POM;
        } else {
          return PPM;
        }
      } else { //(k > 0)
        if(i === 0) {
          if(j === 0) {
            return OOP;
          } else if(k === 0) {
            return OPO;
          } else {
            return OPP;
          }
        } else {
          if(j === 0 && k === 0) {
            return POO;
          } else if(j === 0) {
            return POP;
          } else if(k === 0) {
            return PPO;
          } else {
            return PPP;
          }
        }
      }
    }
  }
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

  ray.classification = classify(rd);

  return ray;
};
