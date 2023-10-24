function main() {
	
	const canvas = document.querySelector('#c');
    const button = document.querySelector("#startBtn");
	const renderer = new THREE.WebGLRenderer({antialias: true, canvas});

	const fov = 75;
	const aspect = 2; 
	const near = 0.1; 
	const far = 5;

	const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
	camera.position.z = 2;

	const scene = new THREE.Scene();

	scene.background = new THREE.Color(0x202124);

	{
		const color = 0xFFFFFF;
		const intensity = 10;
		const light = new THREE.DirectionalLight(color, intensity);
		light.position.set(-2, 2, 4);
		scene.add(light);
	}

	const boxWidth = 1;
	const boxHeight = 1;
	const boxDepth = 1;
	const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

	const material = new THREE.MeshPhongMaterial({color: 0x5a62a3});

	const cube = new THREE.Mesh(geometry, material);

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

    button.addEventListener("click", function() {
        requestAnimationFrame(render);
        button.style.opacity = 0;
	canvas.style.opacity = 1;
    });

    document.addEventListener("keydown", function(event) {
        if (event.key === " " || event.key === "Spacebar") {
            // Prevent the default behavior of the spacebar (e.g., scrolling the page)
            event.preventDefault();
    
            // Trigger a click event on the button
            button.click();
        }
    });

}

main();
