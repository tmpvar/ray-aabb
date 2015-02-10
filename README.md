# ray-aabb

test if a ray intersects an aabb in 3d space

Implemented via the techniques described in [Fast Ray/Axis-Aligned Bounding Box Overlap Tests using Ray Slopes](http://www.cg.cs.tu-bs.de/publications/Eisemann07FRA/)

## install

`npm install ray-aabb`

## use

```javascript
var createRay = require('ray-aabb');

/*
                     _______
                    /      /|
                   /______/ |
                  | |_____|_|
(-1, 1, 0) ---->  | /     | /
                  |/______|/
*/

var ray_origin = [-1, 1, 0];
var ray_direction = [1, 0, 0];
var ray = createRay(ray_origin, ray_direction);

var box = [
  [0, 0, 0],
  [2, 2, 2]
];

console.log(ray.intersects(box));
// outputs: true

// avoid allocating new memory by reusing rays
ray.update(ray_origin, [-1, 0, 0]);

console.log(ray.intersects(box));
// outputs: false

```

## api surface

all vec3s specified are arrays in the format: `[x, y, z]`

`createRay(ray_origin, ray_direction)`'s parameters
* `ray_origin` - a vec3 defining the ray origin
* `ray_direction` - a vec3 defining the ray direction (does not need to be normalized)

_returns_: a `Ray` instance

---

`Ray#update(ray_origin, ray_direction)`

Allows `Ray` instances to be reused by precomputing ray classification.  The intention here is that you will be casting a ray against __many__ aabbs

_returns_: `this` (e.g. `ray.update(ro, rd).intersects(box)`

---

`Ray#intersects(aabb)`
where `aabb` specifies the corners of the bounding box:

```javascript
[[x1, y1, z1], [x2, y2, z2]]
```

_returns_
 * `true` if intersection detected
 * `false` if no intersection

## platforms

node, io.js, and evergreen browsers using [browserify](browserify.io)

## license

[MIT](LICENSE.txt)
