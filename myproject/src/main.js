import { seededRandom } from "three/src/math/MathUtils.js";
import "./style.css"

import * as THREE from 'three';

import { OrbitControls } from "three/examples/jsm/Addons.js";
import { materialReference } from "three/tsl";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);
camera.position.setZ(30);

renderer.render(scene,camera);

//add something to see
const geometry = new THREE.BoxGeometry (6,10,3)
const material = new THREE.MeshStandardMaterial({color: 0xFF6347});
const book = new THREE.Mesh(geometry,material);
book.castShadow=true;

scene.add(book);

//move the book a bit
/*book.position.z=30;
book.position.setX(-10);*/

//adding shadows
renderer.shadowMap.enabled = true

//lighting
const directionalLight = new THREE.DirectionalLight(0xffffff,0.8);
directionalLight.position.set(10,10,6);
directionalLight.castShadow=true;

const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(directionalLight,ambientLight)


//grid and light helper
const lightHelper = new THREE.DirectionalLightHelper(directionalLight);
const gridHelper = new THREE.GridHelper(200,50);
scene.add(lightHelper,gridHelper)


//controls
const controls = new OrbitControls(camera,renderer.domElement);

//add random objects ('stars')
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24,24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff});
  const star = new THREE.Mesh(geometry,material);

  const [x,y,z]=Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(100));

  star.position.set(x,y,z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

//background texture
const backGround = new THREE.TextureLoader().load('images/pic.jpg');
scene.background = backGround;


//texture mapping test
const jeffTexture = new THREE.TextureLoader().load('jeff.png');

const jeff = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({map:jeffTexture})
);



//animation and movement (mouse)
function animate() {
  requestAnimationFrame(animate);
  book.rotation.x +=0.0001;
  book.rotation.y +=0.003;
  book.rotation.z +=0.0002;

  controls.update()

  renderer.render(scene,camera);
}

animate();


 