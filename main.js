const element = document.getElementById('text');
const playButton = document.getElementById('play-button');

let melodyWaveType = "triangle";
let melodyFilterCutoff = 2300;
let melodyFilterQ = 40;
let melodySeqNotes = ["D5", "G5", "F5", "A5", "G5", "C6", "D6"];

let delayWaveType = "pulse";
let delayFilterCutoff = 1300;
let delayFilterQ = 40;
let delaySeqNotes = ["D4", "F4", ["G4", "A4"], "A#4", "G4", "F4"];

let bassWaveType = "sawtooth";
let bassFilterCutoff = 700;
let bassFilterQ = 40;
let bassSeqNotes = ["C2", "G2"];

const reverb = new Tone.Reverb(0.5).toDestination();

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

// Set sequence bpm
Tone.Transport.bpm.value = 90;
