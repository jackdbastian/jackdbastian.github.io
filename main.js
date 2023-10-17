const element = document.getElementById('text');
const playButton = document.getElementById('play-button');

let bassWaveType = "sawtooth";
let bassFilterCutoff = 1500;
let bassFilterQ = 10;

let delayWaveType = "sawtooth";

const delaySynthChannel = new Tone.Channel(-9, -0.3).toDestination();
const bassChannel = new Tone.Channel(-10, .3).toDestination();

const delayFilter = new Tone.Filter(1200, "lowpass")
delayFilter.Q = 2000;
delayFilter.connect(delaySynthChannel);
const delay = new Tone.FeedbackDelay("4n", 0.7).connect(delayFilter);

// Add an event listener to the document that listens for the 'keydown' event
document.addEventListener('keydown', async () => {
// Check if the pressed key is the spacebar (key code 32 or key " ")
    if (event.keyCode === 32 || event.key === " " && Tone.context.state != "running" ) {
        await Tone.start()
        Tone.Transport.start()
        console.log('audio is ready')
    }
});

// Stop button
playButton.addEventListener('click', () => {
    Tone.Transport.stop()
});

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
}).connect(bassChannel);

const delaySynth = new Tone.Synth({
    oscillator: {
        type: delayWaveType
    },
    envelope: {
        attack: 0.2,
        release: 5
    }
}).connect(delay);

const seq = new Tone.Sequence((time, note) => {
    delaySynth.triggerAttackRelease(note, "32n", time);
    element.textContent = note;
}, ["D4", "F4", ["G4", "A4"], "A#4", "G4", "F4"]).start(0);

const bassSeq = new Tone.Sequence((time, note) => {
    bassSynth.triggerAttackRelease(note, "32n", time);
}, ["C2", "G2"], "1n").start("4n");

Tone.Transport.bpm.value = 90;
