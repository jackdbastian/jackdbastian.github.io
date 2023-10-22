const container = document.getElementById('canvas-container');

// Create a WebGLRenderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

const fov = 75;
const aspect = container.clientWidth / container.clientHeight;   // the canvas default
const near = 0.1;
const far = 5;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

camera.position.z = 4;


const scene = new THREE.Scene();

{

    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight( color, intensity );
    light.position.set( - 1, 2, 4 );
    scene.add( light );

}

const boxWidth = 1;
const boxHeight = 1;
const boxDepth = 1;
const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

function makeInstance(geometry, color, x) {
    const material = new THREE.MeshPhongMaterial({color});
   
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
   
    cube.position.x = x;
   
    return cube;
}

const cubes = [
    makeInstance(geometry, 0x44aa88,  0),
    makeInstance(geometry, 0x8844aa, -2),
    makeInstance(geometry, 0xaa8844,  2),
];

// Adjust the canvas size when the window is resized
window.addEventListener('resize', () => {
	const newWidth = container.clientWidth;
	const newHeight = container.clientHeight;

	// Update the camera's aspect ratio
	camera.aspect = newWidth / newHeight;
	camera.updateProjectionMatrix();

	// Update the renderer's size
	renderer.setSize(newWidth, newHeight);
});

function animate(time) {
    time *= 0.001;  // convert time to seconds
 
    cubes.forEach((cube, ndx) => {
      const speed = 1 + ndx * .1;
      const rot = time * speed;
      cube.rotation.x = rot;
      cube.rotation.y = rot;
    });
    
    renderer.render(scene, camera);
    
    requestAnimationFrame(animate);
};

animate()
