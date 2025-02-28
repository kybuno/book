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


//book cover texture! 
const bookCover= new THREE.TextureLoader().load('images/extracted_book.jpg');

//make spine and back cover the most common colour on the cover (for now? how to do that)
// add page textures, maybe possible can do those like coloured pages but still have the page texture looking thing?

//add le book
//const material = new THREE.MeshStandardMaterial({color: 0xFF6347});
const geometry = new THREE.BoxGeometry (6,10,3)
const bookTexture = new THREE.MeshStandardMaterial({map:bookCover})
const book = new THREE.Mesh(geometry,bookTexture);
book.castShadow=true;

scene.add(book);




//move the book a bit
/*book.position.z=30;
book.position.setX(-10);*/

//adding shadows
renderer.shadowMap.enabled = true

//lighting
const directionalLight = new THREE.DirectionalLight(0xffffff,0.88);
directionalLight.position.set(10,10,6);
directionalLight.castShadow=true;

const ambientLight = new THREE.AmbientLight(0x404040,1);
scene.add(directionalLight,ambientLight)


//grid and light helper
const lightHelper = new THREE.DirectionalLightHelper(directionalLight);
const gridHelper = new THREE.GridHelper(200,50);
scene.add(lightHelper,gridHelper)


//controls
const controls = new OrbitControls(camera,renderer.domElement);


//background texture
const backGround = new THREE.TextureLoader().load('images/pedestal.jpg');
scene.background = backGround;



//texture mapping test
/*const jeffTexture = new THREE.TextureLoader().load('jeff.png');

const jeff = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({map:jeffTexture})
);*/

//add random objects ('stars')
/*function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24,24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff});
  const star = new THREE.Mesh(geometry,material);

  const [x,y,z]=Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(100));

  star.position.set(x,y,z);
  scene.add(star);
}
Array(200).fill().forEach(addStar);*/



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

/*use npm run dev in the myproject folder to run locally for testing*/