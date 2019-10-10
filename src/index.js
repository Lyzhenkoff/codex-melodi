const inputExit = document.getElementById('inputexit');
const note = document.getElementById('notes');
const save = document.getElementById('save');
const notes = document.querySelectorAll('.note');
const p = document.getElementById('p');
let noteRow = document.getElementById('note-row');
const saveButton = document.getElementById('save');
let notesInput = document.getElementById('notesinput');
/** кнопки нот */
const myString = [];
let myStringOne = [];
let alles = '';
const playButton = document.getElementById('play');

//import '../css/style.css';

/** class creates a sound */
class Sound {
  /**
   *
   * create a sound.
   * @param {string} -it creates a context.
   *
   */
  constructor(context) {
    /** создания контекста */
    this.context = context;
  }

  /**
   *
   * settings of oscillator
   *
   */
  setup() {
    /** создания осилятора в классе sound */
    this.oscillator = this.context.createOscillator();
    this.gainNode = this.context.createGain();
    this.oscillator.connect(this.gainNode);
    this.gainNode.connect(this.context.destination);
    this.oscillator.type = 'sine';
  }

  /**
   *
   * play a sound
   *
   */
  play(value) {
    /** воспроизводство звука */
    this.setup();

    this.oscillator.frequency.value = value;
    this.gainNode.gain.setValueAtTime(0, this.context.currentTime);
    this.gainNode.gain.linearRampToValueAtTime(1, this.context.currentTime + 0.01);

    this.oscillator.start(this.context.currentTime);
    this.stop(this.context.currentTime);
  }

  /**
   *
   * stop a sound
   *
   */
  stop() {
    /** остановка звука */
    this.gainNode.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + 1);
    this.oscillator.stop(this.context.currentTime + 1);
  }
}

const context = new (window.AudioContext || window.webkitAudioContext)();
/** создание context */

document.addEventListener('click', cursor);
const stick = document.querySelector('.stick');
const glow1 = document.querySelector('.stick .glow-1');
const glow2 = document.querySelector('.stick .glow-2');

notes.forEach((note) => {
  /** нажатие клавиши */
  note.addEventListener('click', () => {
    playSound(note);
    showGlow();
    setTimeout(hideGlow, 300);
  });
  note.addEventListener('click', hideGlow);
});

/**
 *
 * function which playes sound
 *
 */
function playSound(note) {
  /** проигрывание звука при нажатии */
  const sound = new Sound(context);
  const values = note.dataset.frequency;

  sound.play(values);
  sound.stop();
}

/**
 *
 * function
 *
 */
function showGlow() {
  /** функции,которые нельзя удалить(нарушится функционал) */
}

/**
 *
 * function
 *
 */
function hideGlow() {
  /** функции,которые нельзя удалить(нарушится функционал) */
}

/**
 *
 * function
 *
 */
function cursor(e) {
  /** функции,которые нельзя удалить(нарушится функционал) */
}

for (let i = 0; i < notes.length; i++) {
  /** добавление data-frequency в массив alles */
  notes[i].addEventListener('click', () => {
    inputExit.value += notes[i].textContent;
    const myStrings = notes[i].getAttribute('data-frequency');

    myString.push(myStrings);
    alles = myString.join(',');
  });
}
var playNote = function (frequency, startTime, duration) {
  var osc1 = context.createOscillator();
  var osc2 = context.createOscillator();
  var volume = context.createGain();

  osc1.type = 'triangle';
  osc2.type = 'triangle';

  volume.gain.value = 0.1;

  osc1.connect(volume);
  osc2.connect(volume);
  volume.connect(context.destination);

  osc1.frequency.value = frequency + 1;
  osc2.frequency.value = frequency - 2;

  volume.gain.setValueAtTime(0.1, startTime + duration - 0.05);
  volume.gain.linearRampToValueAtTime(0, startTime + duration);

  osc1.start(startTime);
  osc2.start(startTime);

  osc1.stop(startTime + duration);
  osc2.stop(startTime + duration);
};
var playSuccessSound = function () {
  for (var i = 0; i < myString.length; i++) {
    playNote(myString[i], context.currentTime, 1);
  }
};

playButton.addEventListener('click', () => {
  playSuccessSound();
  myStringOne = notesInput.value;
});

time = rng.value;

p.addEventListener('click', () => {
  noteRow.classList.remove('programm');
  inputExit.classList.remove('programm');
  save.classList.remove('programm');
});

save.addEventListener('click', () => {
  notesInput.value = inputExit.value;
});
