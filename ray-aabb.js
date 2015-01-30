module.exports = isect;

function isect(ro, rd, ird, b, near, far) {
  var l, m, n, o, p, q, sx, sy, sz, i0 = ird[0], i1 = ird[1], i2 = ird[2], r0 = ro[0], r1 = ro[1], r2 = ro[2];

  sx = i0<0?1:0;
  sy = i1<0?1:0;
  sz = i2<0?1:0;

  l = b[sx][0] - r0;
  l = !l?0:l*i0;
  m = b[1-sx][0] - r0;
  m = !m?0:m*i0;
  n = b[sy][1] - r1;
  n = !n?0:n*i1;
  o = b[1-sy][1] - r1;
  o = !o?0:o*i1;

  if (l > o || n > m) return false;

  l = n>l?n:l;
  m = o<m?o:m;

  p = b[sz][2] - r2;
  p = !p?0:p*i2;
  q = b[1-sz][2] - r2;
  q = !q?0:q*i2;

  if (l > q || p > m) return false;

  l = p>l?p:l;
  m = q<m?q:m;

  return l < far && m > near;
}
