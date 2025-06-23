import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(0, 0, 10);



// Groun
const groundGeometry = new THREE.PlaneGeometry(40, 40);
const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x000 });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
ground.castShadow = false;
scene.add(ground);

// Lighting
const spotLight = new THREE.SpotLight(0xffffff, 2);
spotLight.angle = Math.PI / 6;
spotLight.position.set(10, 5, 0);
spotLight.target.position.set(0, 1, 0);
spotLight.castShadow = true;
spotLight.receiveShadow = false;
spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;
spotLight.shadow.bias = -0.0001;
scene.add(spotLight);
scene.add(spotLight.target);

// Ambient Light
scene.add(new THREE.AmbientLight(0xffffff));

// Variables for model and animation
let model;
let mixer; // For handling animations

// Load GLTF
const loader = new GLTFLoader();
loader.load('public/triangle/scene.gltf', (gltf) => {
    model = gltf.scene;

    model.traverse((child) => {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;

            if (!child.material.map) {
                child.material = new THREE.MeshStandardMaterial({ color: 0xffffff });
            }
        }
    });

    model.position.set(0, 1.05, -1);
    scene.add(model);

    // Check if there are animations in the model
    if (gltf.animations && gltf.animations.length > 0) {
        mixer = new THREE.AnimationMixer(model);

        // Play all available animations
        gltf.animations.forEach((clip) => {
            const action = mixer.clipAction(clip);
            action.play();
        });
    } else {
        // If no animations, create automatic rotation
        model.userData.rotate = true;
    }
}, undefined, (error) => {
    console.error('Error loading GLTF:', error);
});

// Clock for animation
const clock = new THREE.Clock();

// Animate
function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();

    // Update animation mixer if available
    if (mixer) {
        mixer.update(delta);
    }

    // Automatic rotation if no animation
    if (model && model.userData.rotate) {
        model.rotation.y += 0.01;
    }

    renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});