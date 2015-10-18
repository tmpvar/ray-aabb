# ray-aabb

test if a ray intersects an aabb in 2d/3d space

Implemented via the techniques described in [Fast Ray/Axis-Aligned Bounding Box Overlap Tests using Ray Slopes](http://www.cg.cs.tu-bs.de/publications/Eisemann07FRA/)

## install

`npm install ray-aabb`

## use

```javascript
var createRay = require('ray-aabb');

/*
                    +------+
                   /      /|
(-1, 1, 0) ---->  +------+ |
                  |      | +
                  |      |/
                  +------+
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

var normal = [0, 0, 0];
var d = ray.intersects(box, normal);
console.log(d);
// outputs: 1

console.log(normal);
// outputs: [ -1, 0, 0 ]
```

## api surface

all vectors specified are arrays in the format: `[x, y, z]` with `z` being optional for 2d vectors

__createRay__(`ray_origin`, `ray_direction`)

_parameters_:

* `ray_origin` - a vector defining the ray origin
* `ray_direction` - a _normalized_ vector defining the ray direction
_returns_: a `Ray` instance

---

__Ray#update__(`ray_origin`, `ray_direction`)


Allows `Ray` instances to be reused by precomputing ray classification.  The intention here is that you will be casting a ray against __many__ aabbs

_parameters_: same as __createRay__

_returns_: `this` (e.g. `ray.update(ro, rd).intersects(box)`

---

__Ray#intersects__(`aabb`[, `normal`])
where `aabb` specifies the corners of the bounding box:

```javascript
[[x1, y1, z1], [x2, y2, z2]]
```

and the optional `normal` argument is a 2d/3d vec (e.g., `[0, 0]`) that will be populated with the _non-normalized_ normal of the corner/edge/face that the ray intersected with.


_returns_
if `normal` is not passed

 * `true` if intersection detected
 * `false` if no intersection

if `normal` is passed:

 * a number denoting how far along the ray the collision occurred. You can use this number to compute the point of intersection. See the demos for example usage.

## platforms

node and evergreen browsers using [browserify](browserify.io)

## Demos

### 2d

![random-ray](http://i.imgur.com/oo3nYo2.png)

`npm run demo-2d`

### 3d (software raytracer)

![random-ray](http://imgur.com/6tjoDEa.png)

`npm run demo-raytracer`


## license

[MIT](LICENSE.txt)
