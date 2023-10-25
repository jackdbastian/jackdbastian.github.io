function main() {
	
	const canvas = document.querySelector('#c');
    const button = document.querySelector("#startBtn");
	const renderer = new THREE.WebGLRenderer({antialias: true, canvas});

	const fov = 75;
	const aspect = 2; 
	const near = 0.1; 
	const far = 50;

	const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
	camera.position.z = 10;

	const scene = new THREE.Scene();
	
	if (document.getElementById("darkModeStyle").disabled == true) {
		scene.background = new THREE.Color(0xffffff);
	} else {
		scene.background = new THREE.Color(0x202124);
	}

	const lightColor = 0xFFFFFF;
	const lightIntensity = 5;
	const light = new THREE.DirectionalLight(lightColor, lightIntensity);
	light.position.set(-2, 1, 4);

	scene.add(light);

	function addEquallySpacedSpheres(scene, radius, totalSpheres, spacing) {
		const totalWidth = (totalSpheres - 1) * spacing; // Total width occupied by spheres
		const startX = -totalWidth / 2; // Starting X position to center the spheres

		const spheres = [];
	  
		for (let i = 0; i < totalSpheres; i++) {
		  const sphereGeometry = new THREE.SphereGeometry(radius, 32, 32);
		  const sphereMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
		  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
	  
		  // Calculate the X position based on the centered starting position and spacing
		  const xPos = startX + i * spacing;
	  
		  sphere.position.set(xPos, 0, 0);
	  
		  scene.add(sphere);
		  spheres.push(sphere)
		}
		return spheres;
	  }

	const spheres = addEquallySpacedSpheres(scene, 0.5, 6, 2);

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

		spheres.forEach((sphere, index) => {
			const newYPos = Math.sin(time + index) * (index + 1); // Example animation
			sphere.position.setY(newYPos);
		});

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
            event.preventDefault();
            button.click();
        }
    });

}

main();
