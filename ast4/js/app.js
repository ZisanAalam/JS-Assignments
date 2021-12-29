const car = document.getElementById("car");
const road = document.getElementById("road");
const startScreen = document.querySelector('.startScreen');
const startBtn = document.getElementById('startBtn');
const gameArea = document.querySelector('.gameArea');
const lane = document.querySelector('.lane')
const scoreBoard = document.querySelector('.scoreBoard');
const msg = document.querySelector('.msg');


//Initiallizing Player car details
player_car = {
    x: car.offsetLeft,
    y: car.offsetTop,
    w: car.clientWidth,
    h: car.clientHeight,
    status: false,
    score: 0,
    speed: 5,
    speed_factor: 0.25
}

//Setting initial score board
// scoreBoard.innerHTML = `High Score : ${leaderBoard.highScore} <hr> Your Score<br>${player_car.score}`;

//Event linster for start button
startBtn.addEventListener('click', () => {
    player_car.status = true;
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
let rotationAngle = 15;
document.addEventListener("keydown", (event) => {
    if (event.code === "ArrowLeft") {
        index--;
        rotationAngle = -15;
        if (index < 0) index = 0;
        player_car.x = index * 100 + 25;

    } else if (event.code === "ArrowRight") {
        index++;
        rotationAngle = 15;
        if (index > laneCount - 1) index = laneCount - 1;
        player_car.x = index * 100 + 25;

    }

    const laneMapValue = laneMap[index];

    car.setAttribute("class", `car ${laneMapValue}`);
    car.style.transform = `rotate(${rotationAngle}deg)`;
});

document.addEventListener("keyup", (event) => {

    rotationAngle = 0;
    car.style.transform = `rotate(${rotationAngle}deg)`;


});

let carWidth = car.clientWidth;
let carHeight = car.clientHeight;
let leftOffset = 25;


//index of car that passes without collision
// since initially no car has passed, so index is set to -1
let prevIndex = -1;
let prevY = -2000;
class Obstacle {
    constructor(index, y, speed) {
        this.index = index;
        this.y = y;
        player_car.speed = speed;
        this.x = this.index * 100 + leftOffset;
        this.w = carWidth;
        this.h = carHeight;
    }

    draw() {
        this.element = document.createElement("div");
        const laneMapValue = laneMap[this.index];
        this.element.setAttribute("class", `car ${laneMapValue} enemyCar`);
        this.element.style.bottom = "auto";
        this.element.style.top = this.y + "px";
        this.element.style.transition = "none";
        road.appendChild(this.element);
        this.element.style.backgroundImage = `url(images/img${getRandomInt(2,6)}.png)`;
    }


    move() {
        if (player_car.status) {
            moveLines();
            this.y += player_car.speed;
            this.element.style.top = this.y + "px";
            for (let i = 0; i < obsArray.length; i++) {
                if (detectCollison(player_car, obsArray[i])) {
                    player_car.status = false;
                    if (isHighScore(player_car.score)) {
                        leaderBoard.highScore = player_car.score;
                        msg.innerHTML = `Game End <br> New High Score: ${player_car.score}`;
                    } else {
                        msg.innerHTML = `Game End <br> Your Score: ${player_car.score}`;
                    }
                    startBtn.innerHTML = 'Play Again';
                    startScreen.classList.remove('hide');

                    // console.log(localStorage.getItem('score'));
                }
            }

            if (this.y > laneLength) {
                player_car.speed += player_car.speed_factor;
                player_car.score++;
                scoreBoard.innerHTML = `<p>High Score : ${leaderBoard.highScore}<p> <hr> Your Score<br>${player_car.score}`;
                this.index = getRandomInt(0, 3);

                for (let i = 0; i < 10; i++) {
                    if (this.index == prevIndex) {
                        this.index = getRandomInt(0, 3);
                    } else {
                        prevIndex = this.index
                        break;
                    }
                }
                const laneMapValue = laneMap[this.index];
                this.element.setAttribute("class", `car ${laneMapValue} enemyCar`);
                this.x = this.index * 100 + leftOffset;
                obsArray[this] = this.element;
                this.y = getRandomInt(-150, -800);
                if (Math.abs(prevY - this.y) < carHeight) {
                    this.y -= carHeight;
                    prevY = this.y;
                }
                this.element.style.backgroundImage = `url('images/img${getRandomInt(2,6)}.png')`

            }
        }
    }



}

function detectCollison(rect1, rect2) {
    if (rect1.x < rect2.x + rect2.w &&
        rect1.x + rect1.w > rect2.x &&
        rect1.y < rect2.y + rect2.h &&
        rect1.h + rect1.y > rect2.y) {
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
    // scoreBoard.innerHTML = `Your Score<br>${player_car.score}`;
    scoreBoard.innerHTML = `<p>High Score : ${leaderBoard.highScore}<p> <hr> Your Score<br>${player_car.score}`;

    obsArray = [];

    let index;
    let y;
    let x;
    let speed;
    let dis;
    for (let i = 0; i < 2; i++) {
        index = getRandomInt(0, 3);
        y = getRandomInt(-150, -100);
        x = index * 100 + 25;
        speed = 5;
        const obs = new Obstacle(index, y, speed);
        obsArray.push(obs);
        obs.draw();
    }

}


function move() {
    obsArray.forEach((obs) =>
        obs.move()
    );

    requestAnimationFrame(move);
    // setTimeout(move, 500);

}

init();
move();