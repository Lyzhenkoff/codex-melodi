let inputExit = document.getElementById('inputexit');
const note = document.getElementById('notes');
const save = document.getElementById('save');
const notes = document.querySelectorAll('.note');
let myString = [];
let alles = '';
const playButton = document.getElementById('play');

class Sound {//класс отвечающий за звук при нажатии клавиш синтезатора

    constructor(context) {
        this.context = context;
    }

    setup() {
        this.oscillator = this.context.createOscillator();
        this.gainNode = this.context.createGain();

        this.oscillator.connect(this.gainNode);
        this.gainNode.connect(this.context.destination);
        this.oscillator.type = 'sine';
    }

    play(value) {
        this.setup();

        this.oscillator.frequency.value = value;
        this.gainNode.gain.setValueAtTime(0, this.context.currentTime);
        this.gainNode.gain.linearRampToValueAtTime(1, this.context.currentTime + 0.01);

        this.oscillator.start(this.context.currentTime);
        this.stop(this.context.currentTime);
    }

    stop() {
        this.gainNode.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + 1);
        this.oscillator.stop(this.context.currentTime + 1);
    }

}


let context = new (window.AudioContext || window.webkitAudioContext)();//создание context


document.addEventListener('click', cursor);
const stick = document.querySelector('.stick');
const glow1 = document.querySelector('.stick .glow-1');
const glow2 = document.querySelector('.stick .glow-2');

notes.forEach((note) => {//нажатие клавиши
    note.addEventListener('click', () => {
        playSound(note);
        showGlow();
        setTimeout(hideGlow, 300);
    })
    note.addEventListener('click', hideGlow);
})

function playSound(note) {//проигрывание звука при нажатии
    let sound = new Sound(context);
    let values = note.dataset.frequency;
    sound.play(values);
    sound.stop();

}

function showGlow() {//функции,которые нельзя удалить(нарушится функционал)

}

function hideGlow() {

}

function cursor(e) {

}

for (let i = 0; i < notes.length; i++) {//добавление data-frequency в массив alles
    notes[i].addEventListener('click', () => {
        inputExit.value += `${notes[i].textContent}`;
        ''
        let myStrings = notes[i].getAttribute('data-frequency');
        myString.push(myStrings);
        alles = myString.join(',')
    })
}

class allmusic {//класс ,отвечающий за всю мелодию

    constructor(context) {
        this.context = context;
    }

    setup() {
        this.oscillator = this.context.createOscillator();
        this.gainNode = this.context.createGain();

        this.oscillator.connect(this.gainNode);
        this.gainNode.connect(this.context.destination);
        this.oscillator.type = 'sine';
    }

    play(values) {
        this.setup();

        this.oscillator.frequency.values = values;
        this.gainNode.gain.setValueAtTime(0, this.context.currentTime);
        this.gainNode.gain.linearRampToValueAtTime(1, this.context.currentTime + 0.01);

        this.oscillator.start(this.context.currentTime);
        this.stop(this.context.currentTime);
    }

    stop() {
        this.gainNode.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + 1);
        this.oscillator.stop(this.context.currentTime + 1);
    }

}

let context2 = new (window.AudioContext || window.webkitAudioContext)();//новый context

playButton.addEventListener('click', () => {//проигрывание всей мелодии с помоью массива с data-frequency
    const music = new AudioContext();
    (new allmusic(music)).play(alles, "sine");
})
