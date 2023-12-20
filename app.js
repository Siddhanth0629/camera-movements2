import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

gsap.registerPlugin(ScrollTrigger);

let sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

//canvas
const canvas = document.querySelector("canvas.webgl");
//scene
const scene = new THREE.Scene();
//canvas
const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(0, 0, 8);
scene.add(camera);

// adding light in the scene
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 2, 0);
scene.add(directionalLight);

// scene.background = new THREE.Color(0x2e2e2e);

// renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
  alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

let mesh;
let frontwheel;
let backwheel;
const loader = new GLTFLoader().setPath("assets/");
loader.load("Bike_and_road.glb", (gltf) => {
  mesh = gltf.scene;
  frontwheel = mesh.children[82];
  backwheel = mesh.children[83];

  mesh.position.set(-10.8, -3.3, 0);
  mesh.rotation.y = Math.PI / 2;
  mesh.scale.set(4.7, 4.7, 4.7);
  scene.add(mesh);
});

window.addEventListener("resize", () => {
  let sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  renderer.render(scene, camera);
});

function animate() {
  requestAnimationFrame(animate);
  if (frontwheel && backwheel) {
    frontwheel.rotation.x += 0.32;
    backwheel.rotation.x += 0.1;
  }
  renderer.render(scene, camera);
}

animate();
