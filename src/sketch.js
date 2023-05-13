import * as THREE from 'three';
import vertex from './shaders/vertex.glsl';
import fragment from './shaders/fragment.glsl';

export default class Sketch {
    constructor(canvas) {
        this.renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: true,
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.01, 10);
        this.camera.position.z = 2.5;

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xefefef);


        this.addMesh();
        this.time = 0;
        this.render();
        this.setupResize();

        this.meshes = [];
        this.materials = [];
        this.groups = [];
        this.handleImages();
    }

    handleImages() {
        let images = [...document.querySelectorAll('img')];
        images.forEach((img, i) => {
            let mat = this.material.clone();

            this.materials.push(mat);
            mat.uniforms.imgTexture.value = new THREE.Texture(img);
            mat.uniforms.imgTexture.value.needsUpdate = true;
            // mat.wireframe = true;

            let geometry = new THREE.PlaneGeometry(1.3, 1, 20, 20)
            let mesh = new THREE.Mesh(geometry, mat);
            let group = new THREE.Group();
            group.add(mesh);
            this.scene.add(group);
            this.meshes.push(mesh);

            group.position.x = 0.5;

            group.rotation.y = -0.6;
            group.rotation.x = -0.5;
            group.rotation.z = -0.2;
        })
    }

    addMesh() {
        this.geometry = new THREE.PlaneGeometry(1, 1, 20, 20);
        this.material = new THREE.ShaderMaterial({
            side: THREE.DoubleSide,
            vertexShader: vertex,
            fragmentShader: fragment,
            transparent: true,
            uniforms: {
                progress: {
                    type: 'f',
                    value: 0.
                },
                time: {
                    type: 'f',
                    value: 0.
                },
                imgTexture: {
                    type: 't',
                    value: null,
                },
                distanceFromCenter: {
                    type: 'f',
                    value: 0.,
                }
            }
        })

        this.mesh = new THREE.Mesh(this.geometry, this.material);
        // this.scene.add(this.mesh);
    }

    setupResize() {
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();

            this.renderer.setSize(window.innerWidth, window.innerHeight);
        }, false);
    }

    render() {
        this.time += 0.05;
        this.material.uniforms.time.value = this.time;
        if (this.materials) {
            this.materials.forEach((mat) => {
                mat.uniforms.time.value = this.time;
            });
        }

        requestAnimationFrame(this.render.bind(this));
        this.renderer.render(this.scene, this.camera);
    }
}
