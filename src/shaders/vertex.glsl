uniform float time;
uniform vec2 pixels;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;

#define PI 3.14159265358979323

void main() {
    vUv = (uv - vec2(0.5)) * 0.9 + vec2(0.5);
    vec3 pos = position;

    pos.y += sin(PI * uv.x) * 0.02;
    pos.z += sin(PI * uv.x) * 0.01;

    pos.y += sin(time * 0.05) * 0.03;
    vUv.y -= sin(time * 0.05) * 0.02;

    gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );
}
