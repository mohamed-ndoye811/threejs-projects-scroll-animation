uniform float time;
uniform float distanceFromCenter;
uniform vec2 pixels;
uniform sampler2D imgTexture;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;

#define PI 3.14159265358979323

void main() {
    vec4 t = texture2D(imgTexture, vUv);
    float bwt = (t.r, t.b, t.g);
    vec4 black_and_white = vec4(bwt, bwt, bwt, 0.3);
    gl_FragColor = mix(black_and_white, t, distanceFromCenter);
}
