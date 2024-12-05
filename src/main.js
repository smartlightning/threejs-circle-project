import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'

// Scene
const scene = new THREE.Scene()

// Canvas
const canvas = document.querySelector('.webgl')
// sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

// Create a sphere
const geometry = new THREE.SphereGeometry(3, 64, 64)
const material = new THREE.MeshStandardMaterial({
  color: '#00ff83',
  roughness: 0.5,
})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Lights
const pointLight = new THREE.PointLight('#ffffff', 70, 100, 1.7)
pointLight.position.set(0, 10, 10)
pointLight.intensity = 100
scene.add(pointLight)

// Camera
const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  0.1,
  100
)
camera.position.z = 20
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(2)
renderer.render(scene, camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true
controls.autoRotateSpeed = 5

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
  controls.update()
}
loop()

// Timeline magic

const timeline = gsap.timeline({ defaults: { duration: 1 } })
timeline.fromTo(mesh.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 })
timeline.fromTo('nav', { y: '-100%' }, { y: '0%' })
timeline.fromTo('h1', { opacity: 0 }, { opacity: 1 })

//Mouse animation colour
let mouseDown = false
let rgb = []
window.addEventListener('mousedown', () => (mouseDown = true))
window.addEventListener('mouseup', () => (mouseDown = false))

window.addEventListener('mousemove', (e) => {
  if (mouseDown) {
    rgb = [
      Math.round((e.pageX / window.innerWidth) * 255),
      Math.round((e.pageY / window.innerHeight) * 255),
      150,
    ]
    // Let's animate
    let newColor = new THREE.Color(`rgb(${rgb.join(',')})`)
    gsap.to(mesh.material.color, {
      r: newColor.r,
      g: newColor.g,
      b: newColor.b,
    })
  }
})
