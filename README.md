# ray-aabb

test if a ray intersects an aabb in 3d space

ported from http://www.cs.utah.edu/~awilliam/box/

> Amy Williams, Steve Barrus, R. Keith Morley, and Peter Shirley
> "An Efficient and Robust Ray-Box Intersection Algorithm"
> Journal of graphics tools, 10(1):49-54, 2005


## install

`npm install ray-aabb`

## use

```javascript
var intersectRayAABB = require('ray-aabb');

// setup an interval in which the ray is valid (i.e. inside the frustnum of a 3d scene)
var near = 0;
var far = 10;

/*
                     _______
                    /      /|
                   /______/ |
                  | |_____|_|
(-1, 1, 0) ---->  | /     | /
                  |/______|/
*/

var ray_origin = [-1, 1, 0];
var box = [
  [0, 0, 0],
  [2, 2, 2]
];
var ray_direction = [1, 0, 0];

// this needs to be computed outside `ray-aabb` to avoid recomputing on every ray cast
var ray_inv_direction = [
  1/ray_direction[0],
  1/ray_direction[1],
  1/ray_direction[2]
];

console.log(intersectRayAABB(ray_origin, ray_direction, ray_inv_direction, box, near, far));
// outputs: true
```

## api surface

all vec3s specified are in the format of an array `[x, y, z]`

`intersectRayAABB`'s parameters
* `ray_origin` - a vec3 defining the ray origin
* `ray_direction` - a __normalized__ vec3 defining the ray direction
* `ray_inv_direction` - the reciprical of reciprocal `ray_direction` - precomputed for performance
* `box` - an array containing two vec3s `[[minx, miny, minz], [maxx, maxy, maxz]]`
* `near` - the starting point of the interval of the ray under test (`0` will start at `ray_origin`)
* `far` - the end of the ray interval under test

## license

[MIT](LICENSE.txt)
