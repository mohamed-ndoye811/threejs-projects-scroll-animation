import Sketch from "./sketch";

let sketch = new Sketch(document.getElementById('gl'));

// js code here
Number.prototype.clamp = function(min, max) {
    return Math.min(Math.max(this, min), max);
};

// Scroll logic
let speed = 0,
    position = 0,
    rounded = 0,
    block = document.getElementById('block'),
    elems = [...document.querySelectorAll('.line')],
    elemsWrapper = document.getElementById('lines-wraper'),
    objects = Array(elems.length).fill({
        dist: 0
    });
addEventListener('wheel', e => {
    speed += e.deltaY * 0.0002;
});

function raf() {
    position += speed;
    speed *= 0.8;

    objects.forEach((object, index) => {
        object.dist = Math.min(Math.abs(position - index), 1);
        object.dist = object.dist ** 2;

        let scale = 1 - object.dist * 0.15;

        sketch.meshes[index].position.y = 1.05 * (position - index);
        sketch.meshes[index].scale.set(scale, scale, scale);
        sketch.meshes[index].material.opacity = 0.2;
        sketch.meshes[index].material.uniforms.distanceFromCenter.value = 1 - object.dist;
    })

    rounded = Math.round(position).clamp(0, elems.length - 1);
    let diff = (rounded - position);
    position += Math.sign(diff) * Math.pow(Math.abs(diff), 0.7) * 0.006;

    // elemsWrapper.style.transform = `translate(0, ${-position * 100 - 50}px)`;

    requestAnimationFrame(raf)
}

raf();