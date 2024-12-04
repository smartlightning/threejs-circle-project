import './style.css'
import * as THREE from 'three'

// Scene
const scene = new THREE.Scene()

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
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100)
camera.position.z = 20
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('.webgl') })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)
renderer.render(scene, camera)

// Resize handler (optional)
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})