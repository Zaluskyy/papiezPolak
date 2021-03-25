const sound = new Audio();
sound.src = "audio/jeszczeJak.mp3";

const player = document.querySelector("div.player");
const text = document.querySelector("div.text");
const item = document.createElement("div");
const result = document.querySelector("div.count")
item.classList.add("item");
const texts = ["JP2GMD"];
const win = document.createElement("div");
win.classList.add("win")
const h1 = document.createElement("h1");
const congratulation = document.createElement("div")
congratulation.classList.add("congratulation");
const timer = document.querySelector(".timer");

let timeIsGoing;
let timeTrue = true;
let time = 21.37;
let howMuch = 0;
let up = window.innerHeight / 2;
let left = window.innerWidth / 2;
let randTop = 0;
let randLeft = 0;
let sizeBall = 100;
let speed = 10;
let previousIndex = 1000;
text.style.fontSize = `${(window.innerWidth / 2)/3}px`;
result.style.fontSize = `${(window.innerWidth / 2)/15}px`;
timer.style.fontSize = `${(window.innerWidth / 2)/10}px`;
congratulation.style.fontSize = `${(window.innerWidth / 2)/15}px`;
h1.style.fontSize = `${(window.innerWidth / 2)/10}px`;


const stopTime = () => {
    clearInterval(timeIsGoing)
    win.style.width = `${window.innerWidth}px`
    win.style.height = `${window.innerHeight}px`
    document.body.appendChild(win);
    h1.textContent = 'Gratulacje!!!'
    congratulation.textContent = `Udało ci się zjeść ${howMuch} kremówek w czasie 21.37 sekund`;
    document.querySelector(".win").appendChild(h1);
    document.querySelector("h1").appendChild(congratulation);
}

const timerr = () => {
    const timee = () => {
        time -= 0.01
        timer.textContent = time.toFixed(2);
        if (time <= 0.00) stopTime();
    }

    timeIsGoing = setInterval(timee, 10)
}


const updateResult = () => {
    howMuch++;
    result.textContent = `ZJEDZONYCH KREMÓWEK: ${howMuch}`;
}


const addSound = () => {
    sound.pause();
    sound.currentTime = 0;
    sound.setAttribute("preload", "auto");
    document.body.appendChild(sound);
    sound.play()
}

const newText = () => {
    let index = Math.floor(Math.random() * texts.length);
    if (previousIndex == index) index++;
    if (index == texts.length) index = 0;
    text.textContent = texts[index].toUpperCase();
    previousIndex = index;
    // console.log(index);

}

const moveBall = (e) => {
    const x = e.clientX;
    const y = e.clientY;
    player.style.top = `${y}px`
    player.style.left = `${x}px`

    const playerBallTop = y - (sizeBall / 2)
    const playerBallBottom = y + (sizeBall / 2)
    const feedBallTop = randTop
    const feedBallBottom = randTop + 50;
    const playerBallLeft = x - (sizeBall / 2)
    const playerBallRight = x + (sizeBall / 2)
    const feedBallLeft = randLeft;
    const feedBallRight = randLeft + 50;
    // console.log(e.keyCode);
    player.style.height = `${sizeBall}px`;
    player.style.width = `${sizeBall}px`;

    if ((playerBallRight < feedBallLeft) || (playerBallLeft > feedBallRight)) {} else {
        if ((playerBallTop > feedBallBottom) || (playerBallBottom < feedBallTop)) {} else {
            if (timeTrue == true) {
                timerr();
                timeTrue = false;
            }

            if (time > 0.00) {
                sizeBall += 2;
                player.style.backgroundSize = `${sizeBall}px`;
                addSound()
                addFeed()
                // newText()
                updateResult()
            }
        }
    }
}


const addFeed = () => {
    randTop = Math.floor(Math.random() * (window.innerHeight - 140) + 70);
    randLeft = Math.floor(Math.random() * (window.innerWidth - 140) + 70);
    // console.log(randTop, randLeft);
    // console.log(window.innerHeight, window.innerWidth);
    item.style.top = `${randTop}px`
    item.style.left = `${randLeft}px`
    document.body.appendChild(item)
}
addFeed()
newText()

player.addEventListener('mousemove', start)

function start() {
    document.addEventListener('mousemove', moveBall)
}