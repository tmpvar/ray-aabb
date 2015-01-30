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

var origin = [-1, 1, 0];
var box = [
  [0, 0, 0],
  [2, 2, 2]
];
var direction = [1, 0, 0];

// this needs to be computed outside `ray-aabb` to avoid recomputing on every ray cast
var inv_direction = [
  1/direction[0],
  1/direction[1],
  1/direction[2]
];

console.log(intersectRayAABB(origin, direction, inv_direction, box, near, far));
// outputs: true
```

## api surface



## license

[MIT](LICENSE.txt)
