module.exports = intersectRayBox;

var sign = [0, 0, 0];

function intersectRayBox(origin, direction, inv_direction, box, near, far) {
  var tmin, tmax, tymin, tymax, tzmin, tzmax;

  sign[0] = inv_direction[0] < 0 ? 1 : 0;
  sign[1] = inv_direction[1] < 0 ? 1 : 0;
  sign[2] = inv_direction[2] < 0 ? 1 : 0;

  var a = box[sign[0]][0] - origin[0];
  var b = box[1-sign[0]][0] - origin[0];
  var c = box[sign[1]][1] - origin[1];
  var d = box[1-sign[1]][1] - origin[1];

  tmin = a * inv_direction[0];
  tmax = b * inv_direction[0];
  tymin = c * inv_direction[1];
  tymax = d * inv_direction[1];

  if (isNaN(tmin)) {
    tmin = a;
  }
  if (isNaN(tmax)) {
    tmax = b;
  }
  if (isNaN(tymin)) {
    tymin = c;
  }
  if (isNaN(tymax)) {
    tymax = d;
  }

  if (tmin > tymax || tymin > tmax) {
    console.log('bailed here');
    return false;
  }

  if (tymin > tmin) {
    tmin = tymin;
  }

  if (tymax < tmax) {
    tmax = tymax;
  }

  tzmin = (box[sign[2]][2] - origin[2]) * inv_direction[2];
  tzmax = (box[1-sign[2]][2] - origin[2]) * inv_direction[2];
  console.log(tmin, tzmax, tzmin, tmax);
  if (tmin > tzmax || tzmin > tmax) {
    return false;
  }

  if (tzmin > tmin) {
    tmin = tzmin;
  }

  if (tzmax < tmax) {
    tmax = tzmax;
  }
console.log(tmin, tmax);
  return (tmin < far && tmax > near);
}
