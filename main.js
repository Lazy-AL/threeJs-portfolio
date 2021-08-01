import './styles/style.css'

import * as THREE from 'three'
import  {OrbitControls} from  'three/examples/jsm/controls/OrbitControls';
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas : document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene,camera);


// creating object with material and shape
const geometry = new THREE.TorusGeometry(10 , 3 , 16, 100)
const material = new THREE.MeshStandardMaterial({ color: 0xFF6347});
const torrus = new THREE.Mesh(geometry,material);

scene.add(torrus)

// lighting for the object
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5,5,5)
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight,ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200,50);
scene.add(lightHelper,gridHelper)

const controls = new OrbitControls(camera,renderer.domElement);


function addStar() {
    const geometry = new THREE.SphereGeometry(0.25,24,24);
    const material = new THREE.MeshBasicMaterial({color:0xffffff})
    const star = new THREE.Mesh(geometry,material);

    const [x, y, z] = Array(3).fill(undefined, undefined, undefined).map(() => THREE.MathUtils.randFloatSpread(100));
    star.position.set(x, y ,z);
    scene.add(star)
}

Array(200).fill(undefined, undefined, undefined).forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('./pictures/space.jpg')
scene.background = spaceTexture;


// avatar
const avatar = new THREE.TextureLoader().load('./pictures/312321.png');

const me = new THREE.Mesh(
    new THREE.BoxGeometry(3,3,3),
    new THREE.MeshBasicMaterial({map:avatar})
);
scene.add(me);

function animate() {
    requestAnimationFrame( animate);

    torrus.rotation.x += 0.01;
    torrus.rotation.y += 0.005;
    torrus.rotation.z += 0.01;

    controls.update();

    renderer.render(scene, camera);
}

animate()
