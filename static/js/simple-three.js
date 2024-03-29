function main() {
	
	// select the html element with id="c"
	const canvas = document.querySelector('#c');

	// create a renderer in that html element
	const renderer = new THREE.WebGLRenderer({antialias: true, canvas});

	// field of view
	const fov = 75;
	
	// aspect ratio, i.e. the proportion of the width to the height
	const aspect = 2; 

	// the limits of what will be rendered
	const near = 0.1; 
	const far = 5;

	// create the camera
	const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

	// move the camera back so we can see stuff
	camera.position.z = 4;

	// create a scene, the root of everything
	const scene = new THREE.Scene();

	// set the scene background color to match the website
	scene.background = new THREE.Color(0x202124);

	// defining the lighting source
	{
		const color = 0xFFFFFF;
		const intensity = 10;
		const light = new THREE.DirectionalLight(color, intensity);
		light.position.set(-2, 2, 4);
		scene.add(light);
	}

	// define the cube geometry
	const boxWidth = 1;
	const boxHeight = 1;
	const boxDepth = 1;
	const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

	// add a material
	const material = new THREE.MeshPhongMaterial({color: 0x5a62a3});

	// create a mesh
	const cube = new THREE.Mesh(geometry, material);

	// add the mesh to the scene
	scene.add(cube);

	function resizeRendererToDisplaySize(renderer) {
		const canvas = renderer.domElement;
		const width = canvas.clientWidth;
		const height = canvas.clientHeight;
		const needResize = canvas.width !== width || canvas.height !== height;
		if (needResize) {
			renderer.setSize(width, height, false);
		}
		return needResize;
	}

	function render(time) {
		time *= 0.001; // convert time to seconds

		if (resizeRendererToDisplaySize(renderer)) {
			const canvas = renderer.domElement;
			camera.aspect = canvas.clientWidth / canvas.clientHeight;
			camera.updateProjectionMatrix();
		}

		cube.rotation.x = time;
		cube.rotation.y = time/2;

		renderer.render(scene, camera);
		requestAnimationFrame(render);
	}

	requestAnimationFrame(render);

}

main();
