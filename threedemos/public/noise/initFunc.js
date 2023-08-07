import { Avatar } from "./avatar.js";
import { ChunkManager } from "./chunkManager.js";
export let global;
export let scene, camera, renderer, clock;
export let stats;
export let controller;
export let simplex;
export let avatar;

export function init(seed = 'RandomSeed-' + Math.random()) {
    simplex = new SimplexNoise(seed);

    scene = new THREE.Scene();
    clock = new THREE.Clock();

    const originPosition = new THREE.Vector3(0, 20, 20);
    camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.copy(originPosition);
    camera.lookAt(0, 5, 0)
    
    const chunkManager = new ChunkManager(simplex);
   
    avatar = new Avatar(originPosition, chunkManager);
    
    renderer = new THREE.WebGLRenderer({
      antialias: true, // 开启抗锯齿处理
      alpha: true,
    });
    renderer.setClearColor(0xbfd1e5) // set sky color
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio)
  
    stats = new Stats()
    document.body.appendChild( stats.dom );
  
    // controller = new THREE.OrbitControls(camera, renderer.domElement);
    controller = new THREE.FlyControls( camera, renderer.domElement );
    controller.movementSpeed = 12;
    controller.domElement = renderer.domElement;
    controller.rollSpeed = Math.PI / 48;
    controller.autoForward = false;
    controller.dragToLook = false;

    document.body.appendChild(renderer.domElement);
    window.onresize = onResize;

    return { simplex, scene, camera, avatar, global, chunkManager }
}

export function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    stats.update();
    controller.update(clock.getDelta());
    avatar.update(camera.position);
}

function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

export function addLights() {
    var directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
    directionalLight.position.set(400, 200, 300);
    // directionalLight.castShadow = true
    scene.add(directionalLight);
    // 方向光2
    var directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.9);
    directionalLight2.position.set(-400, -200, -300);
    scene.add(directionalLight2);
    //环境光
    var ambient = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambient);
}

export function initCube(r = 0, g = 0, b = 0) {
    const geometry = new THREE.BoxGeometry( 1, 1, 1, 1, 1 );
    const material = new THREE.MeshPhongMaterial( {
      color: new THREE.Color(g / 5, (g + 10) / 10, 0),
      } );
    const plane = new THREE.Mesh( geometry, material );
    plane.rotateX(-Math.PI/2);
    return plane;
}