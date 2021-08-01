import './styles/style.css'

import * as THREE from 'three'

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
const material = new THREE.MeshBasicMaterial({ color: 0xFF6347,wireframe:true});
const torrus = new THREE.Mesh(geometry,material);

scene.add(torrus)

function animate() {
    requestAnimationFrame( animate);

    torrus.rotation.x += 0.01;
    torrus.rotation.y += 0.005;
    torrus.rotation.z += 0.01;

    renderer.render(scene, camera);
}

animate()
