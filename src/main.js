import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import Stats from 'three/addons/libs/stats.module.js'
import { GUI } from 'three/addons/libs/lil-gui.module.min.js'
import { Terrain } from './terrain'

// Add GUI and Stats
const gui = new GUI()
const stats = new Stats()
document.body.appendChild(stats.dom)

// Renderer
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setAnimationLoop(animate)
document.body.appendChild(renderer.domElement)

// Create scene with orbitcontrols
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const controls = new OrbitControls(camera, renderer.domElement)

// Create and add terrain to scene
const terrain = new Terrain(10, 10)
scene.add(terrain)

// Add sun(DirectionalLight)
const sun = new THREE.DirectionalLight()
sun.intensity = 3
sun.position.set(1, 2, 3)
scene.add(sun)

// Add ambientLight for sides opposing "sunside"
const ambient = new THREE.AmbientLight()
ambient.intensity = 0.5
scene.add(ambient)

// Set default camera position and controls
camera.position.set(10, 2, 10)
controls.update()

function animate() {
  controls.update()
  renderer.render(scene, camera)
  stats.update()
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})

// GUI Settings
const terrainFolder = gui.addFolder('Terrain')
terrainFolder.add(terrain, 'width', 1, 20, 1).name('Width')
terrainFolder.add(terrain, 'height', 1, 20, 1).name('Height')
terrainFolder.addColor(terrain.terrain.material, 'color').name('Color')
terrainFolder.onChange(() => {
  terrain.createTerrain()
})
