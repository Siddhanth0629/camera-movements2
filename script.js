// Set up Three.js scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.3,
  1000
);
camera.lookAt(0, 0, 0);
camera.position.set(0, 0, 8);
camera.rotation.set(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
const container = document.querySelector(".canvas-container");
container.appendChild(renderer.domElement);

// Add lighting (optional)
const light = new THREE.PointLight(0xffffff);
light.position.set(5, 5, 5);
scene.add(light);

//Ambient Light
const ambientLight = new THREE.AmbientLight(0xffffff, 2); // Color can be adjusted (hex format)
scene.add(ambientLight);

//Directional Light
const directionalLight = new THREE.DirectionalLight(0xffffff, 3); // Color and intensity
directionalLight.position.set(1, 1, 1); // Set the light's direction
scene.add(directionalLight);

let model;
let frontwheel;
let backwheel;
let engine;

let mixer;
// GLTF Loader
const gltfLoader = new THREE.GLTFLoader();
gltfLoader.load("assets/bike_and_road.glb", (gltf) => {
  model = gltf.scene;
  frontwheel = model.children[65];
  backwheel = model.children[64];
  // Set up animation mixer
  mixer = new THREE.AnimationMixer(model);
  const animations = gltf.animations;

  if (animations && animations.length > 0) {
    const action = mixer.clipAction(animations[0]); // Assuming the first animation is the loop
    action.play();
  }

  model.position.y = -3;
  model.position.x = -15;
  model.rotation.y = 1.57;
  model.scale.set(5.3, 5.3, 5.3);

  //
  scene.add(model);

  // Check if model is defined before creating GSAP timeline
  if (model) {
    // GSAP animation timeline
    const modelAnimation = gsap.timeline();
    modelAnimation
      .to(model.position, {
        x: -7,
        duration: 2,
        ease: "power2.inOut",
      })
      .to(".light__img", { opacity: 1 })
      .to(".section-one .title", {
        opacity: 1,
        duration: 1.3,
      });
  }
});

const t1 = gsap.timeline({
  scrollTrigger: {
    trigger: ".section-one",
    start: "50% 50%",
    end: "bottom 50%",
    markers: true,
    scrub: 0.5,
    duration: 3,
  },
});

t1.to(
  ".section-one .title",
  {
    z: 1.8,
    y: 0.8,
    opacity: 0,
    duration: 10,
    scrub: 0.5,
  },
  "ss"
);

t1.to(".light__img", { opacity: 0, duration: 10 }, "ss");

const t2 = gsap.timeline({
  scrollTrigger: {
    trigger: ".section-two",
    start: "50% 50%",
    end: "bottom 50%",
    markers: true,
    scrub: 0.5,
    duration: 10,
  },
});

t2.from(".section-two .title", {
  opacity: 0,
});

t2.to(camera.position, {
  z: 6.4,
  x: -2.4,
  duration: 10,
}).to(".section-two .title", { opacity: 0, duration: 10 });

const t3 = gsap.timeline({
  scrollTrigger: {
    trigger: ".section-three",
    start: "50% 50%",
    end: "bottom 50%",
    markers: true,
    scrub: 0.5,
    duration: 10,
  },
});

t3.from(".section-three .title", {
  opacity: 0,
  duration: 5,
});

t3.to(camera.position, {
  z: 6.4,
  x: -1.4,
  y: -1,
  duration: 5,
}).to(".section-three .title", { opacity: 0, duration: 10 });

const t4 = gsap.timeline({
  scrollTrigger: {
    trigger: ".section-four",
    start: "50% 50%",
    end: "bottom 50%",
    markers: true,
    scrub: 0.5,
    duration: 3,
  },
});

t4.to(camera.position, {
  z: 8.4,
  x: -7.4,
  y: 1,
  duration: 10,
}).from(".section-four .title", { opacity: 0, duration: 15, delay: 2 });

const t5 = gsap.timeline({
  scrollTrigger: {
    trigger: ".section-five",
    start: "50% 50%",
    end: "bottom 50%",
    markers: true,
    scrub: 0.5,
    duration: 10,
  },
});

t5.to(camera.position, {
  z: 5.4,
  x: -7.4,
  y: -1,
  duration: 10,
}).from(".section-four .title", { opacity: 0, duration: 15, delay: 2 });

function onWindowResize() {
  const newWidth = window.innerWidth;
  const newHeight = window.innerHeight;
  camera.aspect = newWidth / newHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(newWidth, newHeight);
}

// Render the scene
function animate() {
  requestAnimationFrame(animate);
  if (mixer) {
    mixer.update(0.016); // Update with your frame time
  }
  frontwheel.rotation.x += 0.19;
  backwheel.rotation.x += 0.19;
  renderer.render(scene, camera);
}

animate();

// Handle window resize

// if (window.innerWidth < 768) {
//   console.log("True");
//   // Hide the desktop video and show the mobile video
//   document.getElementById("desktopVideo").style.visibility = "none";
// }

// const intro = document.querySelector(".page2");
// const video = intro.querySelector("video");
// const text = intro.querySelector("h1");
// //END SECTION
// const section = document.querySelector(".page2");
// const end = section.querySelector(".intro-title");

//SCROLLMAGIC
// const controller = new ScrollMagic.Controller();

//Scenes
// let scene1 = new ScrollMagic.Scene({
//   duration: 20000,
//   triggerElement: intro,
//   triggerHook: 0,
// })
//   .addIndicators()
//   .setPin(intro)
//   .addTo(controller);

//Text Animation
// const textAnim = TweenMax.fromTo(text, 1, { opacity: 1 }, { opacity: 0 });

// let scene2 = new ScrollMagic.Scene({
//   duration: 3000,
//   triggerElement: intro,
//   triggerHook: 0,
// })
//   .setTween(textAnim)
//   .addTo(controller);

//Video Animation
// let accelamount = 0.5;
// let scrollpos = 0.5;
// let delay = 0;
// let animationFrameId = null;

// scene1.on("update", (e) => {
//   scrollpos = e.scrollPos / 1000;
//   updateVideoCurrentTime();
// });

// setInterval(() => {
//   delay += (scrollpos - delay) * accelamount;
//   video.currentTime = delay;
// }, 33.3);

// function changeBodyClass(newClass) {
//   document.body.className = newClass;
// }

// let cardAnimation = gsap.timeline({
//   scrollTrigger: {
//     trigger: ".image-gallery",
//     markers: true,
//     pin: true,
//   },
// });

// cardAnimation.from(".card1", {
//   opacity: 0,
//   x: -30,
//   duration: 0.2,
//   ease: "power2.inOut",
// });
// cardAnimation.from(".card2", {
//   opacity: 0,
//   x: -30,
//   duration: 0.4,
//   ease: "power2.inOut",
// });
// cardAnimation.from(".card3", {
//   opacity: 0,
//   x: -30,
//   duration: 0.4,
//   ease: "power2.inOut",
// });
