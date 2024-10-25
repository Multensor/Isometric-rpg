import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

// Add GUI and Stats
const gui = new GUI();
const stats = new Stats();
document.body.appendChild(stats.dom);

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

// Create scene with orbitcontrols
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const controls = new OrbitControls( camera, renderer.domElement );

// Add sun(DirectionalLight)
const sun = new THREE.DirectionalLight();
sun.position.set(1,2,3);
scene.add(sun);

// Add ambientLight for sides opposing "sunside" 
const ambient = new THREE.AmbientLight();
ambient.intensity = 0.5;
scene.add(ambient);

// Create box
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshStandardMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

// Set default camera position and controls
camera.position.z = 5;
controls.update();

function animate() {
	controls.update();
	renderer.render( scene, camera );
	stats.update();
}

window.addEventListener('resize', () => {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
})

// GUI Settings
const folder = gui.addFolder('Cube');
folder.add(cube.position, 'x', -2, 2, 0.1).name('X Position');
folder.addColor(cube.material, 'color');