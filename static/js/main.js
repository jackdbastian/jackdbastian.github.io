const element = document.getElementById('text');
const playButton = document.getElementById('play-button');

const melodyWaveType = "triangle";
const melodyFilterCutoff = 2300;
const melodyFilterQ = 40;
const melodySeqNotes = ["D5", "G5", "F5", "A5", "G5", "C6", "D6"];

const delayWaveType = "pulse";
const delayFilterCutoff = 1300;
const delayFilterQ = 40;
const delaySeqNotes = ["D4", "F4", ["G4", "A4"], "A#4", "G4", "F4"];

const bassWaveType = "sawtooth";
const bassFilterCutoff = 900;
const bassFilterQ = 40;
const bassSeqNotes = ["C2", "G2"];

const reverb = new Tone.Reverb(0.6).toDestination();

const melodySynthChannel = new Tone.Channel(-2, 0.4).connect(reverb);
const delaySynthChannel = new Tone.Channel(-11, -0.4).connect(reverb);
const bassChannel = new Tone.Channel(6, 0).connect(reverb);

const melodyFilter = new Tone.Filter(melodyFilterCutoff, "lowpass");
melodyFilter.Q = melodyFilterQ;

const delayFilter = new Tone.Filter(delayFilterCutoff, "lowpass");
delayFilter.Q = delayFilterQ;

const bassFilter = new Tone.Filter(bassFilterCutoff, "lowpass");
delayFilter.Q = bassFilterQ;

const delay = new Tone.FeedbackDelay("4n", 0.7);

// Melody synth
const melodySynth = new Tone.Synth({
    oscillator: {
        type: melodyWaveType
    },
    envelope: {
        attack: 0.3,
        decay: 80,
        sustain: 1,
        release: 50
    }
}).chain(melodyFilter, melodySynthChannel);

// Delay synth
const delaySynth = new Tone.Synth({
    oscillator: {
        type: delayWaveType
    },
    envelope: {
        attack: 0.3,
        release: 5
    }
}).chain(delay, delayFilter, delaySynthChannel);

// Bass synth
const bassSynth  = new Tone.Synth({
    oscillator: {
        type: bassWaveType
    },
    envelope: {
        attack: 0.7,
        decay: 7,
        release: 15
    }
}).chain(bassFilter, bassChannel);

// Melody synth sequence
const melodySeq = new Tone.Sequence((time, note) => {
    melodySynth.triggerAttackRelease(note, "32n", time);
    Tone.Draw.schedule(() => {
        element.textContent = note;
    }, time);
}, melodySeqNotes, "1n").start("1n");

// Delay synth sequence
const delaySeq = new Tone.Sequence((time, note) => {
    delaySynth.triggerAttackRelease(note, "32n", time);
}, delaySeqNotes).start(0);

// Bass synth sequence
const bassSeq = new Tone.Sequence((time, note) => {
    bassSynth.triggerAttackRelease(note, "32n", time);
}, bassSeqNotes, "1n").start("4n");

const canvas = document.querySelector('#c');
const renderer = new THREE.WebGLRenderer({antialias: true, canvas});

const fov = 75;
const aspect = 2;  // the canvas default
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


// Add an event listener to the document that listens for the 'keydown' event
document.addEventListener('keydown', async () => {
// Check if the pressed key is the spacebar (key code 32 or key " ")
    if (event.keyCode === 32 || event.key === " " && Tone.context.state != "running" ) {
        await Tone.start()
        Tone.Transport.start()
        console.log('audio is ready')
        animate()
    }
});

// Stop button
playButton.addEventListener('click', () => {
    Tone.Transport.stop()
});

// Set sequence bpm
Tone.Transport.bpm.value = 90;
