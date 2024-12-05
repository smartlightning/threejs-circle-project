import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import './style.css'
import * as THREE from 'three'

// Scene
const scene = new THREE.Scene()

// Canvas
const canvas = document.querySelector('.webgl')
// sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}


// Create a sphere
const geometry = new THREE.SphereGeometry(3, 64, 64)
const material = new THREE.MeshStandardMaterial({ color: '#00ff83' })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Lights
const pointLight = new THREE.PointLight('#ffffff',70, 100,1.7)
pointLight.position.set(0, 10, 10)
scene.add(pointLight)

// Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 20
scene.add(camera)


// Renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(window.devicePixelRatio)
renderer.render(scene, camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Resize handler (optional)
window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight
  // Update Camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Render sizes
  renderer.setSize(sizes.width, sizes.height)
})

// Rerenders scene when the window is resized
const loop = () => {
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
}
loop()