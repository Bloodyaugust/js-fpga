import * as THREE from 'three';

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 10;

function render() {
	requestAnimationFrame( render );
	renderer.render( scene, camera );
}
render();

class Block {
  constructor (x, y) {
    this.geometry = new THREE.BoxGeometry(1, 1, 1);
    this.material = new THREE.MeshBasicMaterial({color: 0xff0000});
    this.cube = new THREE.Mesh(this.geometry, this.material);
    this.cube.translateX(x);
    this.cube.translateY(y);

    scene.add(this.cube);
  }
}

class Creature {
  constructor (x, y) {
    this.geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    this.material = new THREE.MeshBasicMaterial({color: 0x0000ff});
    this.cube = new THREE.Mesh(this.geometry, this.material);
    this.cube.translateX(x);
    this.cube.translateY(y);

    scene.add(this.cube);
  }
}

let map = [
  1, 1, 1, 1, 1, 1,
  0, 0, 0, 0, 0, 1,
  1, 1, 1, 1, 0, 1,
  0, 0, 0, 1, 0, 1,
  1, 1, 0, 0, 0, 1,
  1, 1, 1, 1, 1, 1
];
let blocks = [];

let creatureCreated = false;
let mapLength = Math.sqrt(map.length);

for (let i = 0; i < map.length; i++) {
  if (map[i]) {
    let x = (-mapLength / 2) + (i % mapLength);
    let y = (mapLength / 2) - Math.floor(i / mapLength);

    blocks.push(new Block(x, y));
  } else if (!creatureCreated) {
    let x = (-mapLength / 2) + (i % mapLength);
    let y = (mapLength / 2) - Math.floor(i / mapLength);

    new Creature(x, y);

    creatureCreated = true;
  }
}
