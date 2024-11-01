import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { World } from './world';
import { Player } from './player';

// Add GUI and Stats
const gui = new GUI();
const stats = new Stats();
document.body.appendChild(stats.dom);

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
renderer.setPixelRatio(devicePixelRatio);
document.body.appendChild(renderer.domElement);

// Create scene with orbitcontrols
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const controls = new OrbitControls(camera, renderer.domElement);

// Set default camera position and controls
controls.target.set(4, 0, 5);
camera.position.set(0, 2, 0);
controls.update();

// Create and add terrain to scene
const world = new World(10, 10);
scene.add(world);

// Add player
const player = new Player(camera, world.terrain);
scene.add(player);

// Add sun(DirectionalLight)
const sun = new THREE.DirectionalLight();
sun.intensity = 3;
sun.position.set(1, 2, 3);
scene.add(sun);

// Add ambientLight for sides opposing "sunside"
const ambient = new THREE.AmbientLight();
ambient.intensity = 0.5;
scene.add(ambient);

function animate() {
  controls.update();
  renderer.render(scene, camera);
  stats.update();
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// GUI Settings
const worldFolder = gui.addFolder('World');
worldFolder.add(world, 'width', 1, 20, 1).name('Width');
worldFolder.add(world, 'height', 1, 20, 1).name('Height');
worldFolder.add(world, 'treeCount', 1, 100, 1).name('Tree Count');
worldFolder.add(world, 'rockCount', 1, 100, 1).name('Rock Count');
worldFolder.add(world, 'bushCount', 1, 100, 1).name('Bush Count');
worldFolder.add(world, 'generate').name('Generate');
