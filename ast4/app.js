function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

const car = document.getElementById("car");
const road = document.getElementById("road");
const startScreen = document.querySelector('.startScreen');
const startBtn = document.getElementById('startBtn');
const gameArea = document.querySelector('.gameArea');
const lane = document.querySelector('.lane')
const scoreBoard = document.querySelector('.scoreBoard');
const msg = document.querySelector('.msg');




player_car = {
    x: car.offsetLeft,
    y: car.offsetTop,
    w: car.clientWidth,
    h: car.clientHeight,
    status: false,
    score: 0,
    speed: 5
}

scoreBoard.innerHTML = `Your Score<br>${player_car.score}`;

startBtn.addEventListener('click', () => {
    player_car.status = true;
    // gameArea.innerHTML = "";
    // document.querySelectorAll('.car').innerHTML = "";
    // gameArea.classList.remove('hide');
    startScreen.classList.add('hide');

    init();
    if (startBtn.innerText == "Play Again") {
        let enCars = document.querySelectorAll('.enemyCar');
        enCars.forEach((enCar) => {
            enCar.style.top = getRandomInt(-150, -100) + 'px';
        })
    }


})

let index = 1;

let laneCount = 3;
const laneLength = road.clientHeight;

const laneMap = {
    0: "lane-left",
    1: "lane-middle",
    2: "lane-right"
};

document.addEventListener("keydown", (event) => {
    if (event.code === "ArrowLeft") {
        index--;
        if (index < 0) index = 0;
        player_car.x = index * 100 + 25;

    } else if (event.code === "ArrowRight") {
        index++;
        if (index > laneCount - 1) index = laneCount - 1;
        player_car.x = index * 100 + 25;

    }

    const laneMapValue = laneMap[index];

    car.setAttribute("class", `car ${laneMapValue}`);
});

let carWidth = car.clientWidth;
let carHeight = car.clientHeight;
let leftOffset = 25;
// console.log(leftOffset);
class Obstacle {
    constructor() {
        this.index = getRandomInt(0, 3);
        this.y = getRandomInt(-150, -100);
        this.speed = 5;
        this.x = this.index * 100 + leftOffset;
        this.w = carWidth;
        this.h = carHeight;
        // console.log(this.x, this.w, this.h);

    }

    draw() {
        this.element = document.createElement("div");

        const laneMapValue = laneMap[this.index];
        //console.log(laneMapValue)

        this.element.setAttribute("class", `car ${laneMapValue} enemyCar`);
        this.element.style.bottom = "auto";
        this.element.style.top = this.y + "px";
        this.element.style.transition = "none";
        this.element.style.backgroundImage = `url(images/img${getRandomInt(2,6)}.png)`;
        // console.log(`url('images/img${getRandomInt(2,6)}.png')`);

        road.appendChild(this.element);
    }


    move() {
        if (player_car.status) {
            moveLines();
            this.y += this.speed;
            this.element.style.top = this.y + "px";
            for (let i = 0; i < obsArray.length; i++) {
                if (detectCollison(player_car, obsArray[i])) {
                    player_car.status = false;
                    msg.innerHTML = `Game End <br> Your Score: ${player_car.score}`;
                    startBtn.innerHTML = 'Play Again';
                    startScreen.classList.remove('hide');
                    // console.log('colided');
                }
            }

            if (this.y > laneLength) {
                player_car.score++;
                scoreBoard.innerHTML = `Your Score<br>${player_car.score}`;
                this.index = getRandomInt(0, 3);
                const laneMapValue = laneMap[this.index];

                this.element.setAttribute("class", `car ${laneMapValue} enemyCar`);
                this.x = this.index * 100 + leftOffset;
                obsArray[this] = this.element;
                this.y = getRandomInt(-150, -800);
                this.element.style.backgroundImage = `url('images/img${getRandomInt(2,6)}.png')`

            }
        }
    }



}

function detectCollison(rect1, rect2) {
    // console.log(rect1.x, rect1.y, rect2.x, rect2.y);
    if ((rect2.y + rect2.h) > rect1.y && rect2.x == rect1.x) {
        return true;
    }
}

let lineHeight = 140;
for (let i = 0; i < 7; i++) {
    let line1 = document.createElement('div');
    line1.setAttribute('class', 'line1 lines');
    line1.y = i * lineHeight;
    line1.style.top = line1.y + 'px';
    road.appendChild(line1);

    let line2 = document.createElement('div');
    line2.setAttribute('class', 'line2 lines');
    line2.y = i * lineHeight
    line2.style.top = line2.y + 'px';
    road.appendChild(line2);
}

function moveLines() {
    let lines = document.querySelectorAll('.lines');
    lines.forEach((line) => {
        // line.y += player_car.speed;
        if (line.y > 800) {
            line.y -= 850;
        }
        line.y += player_car.speed;
        line.style.top = line.y + 'px';

    })
}

let obsArray;

function init() {
    player_car.score = 0;
    scoreBoard.innerHTML = `Your Score<br>${player_car.score}`;

    obsArray = [];

    for (let i = 0; i < 2; i++) {
        const obs = new Obstacle();
        obs.draw();
        obsArray.push(obs);
    }
}

function move() {
    obsArray.forEach((obs) =>
        obs.move()
    );

    requestAnimationFrame(move);

}

init();
move();


// new Game({
//   keyBindings: {
//     left: 'ArrowLeft',
//     right: 'ArrowRight'
//   }
// })

// new Game({
//   keyBindings: {
//     left: 'A',
//     right: 'D'
//   }
// })