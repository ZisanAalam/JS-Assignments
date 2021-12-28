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

player_car = {
    x: car.offsetLeft,
    y: car.offsetTop,
    w: car.clientWidth,
    h: car.clientHeight
}

// startBtn.addEventListener('click', () => {
//     gameArea.classList.remove('hide');
//     startScreen.classList.add('hide');

// })

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
        player_car.y = index * 100 + 25;

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
        this.y = getRandomInt(-150, laneLength);
        this.speed = 5;
        this.x = this.index * 100 + leftOffset;
        this.w = carWidth;
        this.h = carHeight;
        // console.log(this.x, this.w, this.h);

    }

    draw() {
        this.element = document.createElement("div");

        const laneMapValue = laneMap[this.index];
        console.log(laneMapValue)

        this.element.setAttribute("class", `car ${laneMapValue}`);
        this.element.style.bottom = "auto";
        this.element.style.top = this.y + "px";
        this.element.style.transition = "none";

        road.appendChild(this.element);
    }

    move() {
        // console.log(this.index);



        // if (player_car.x < this.x + this.w && player_car.x + player_car.w > this.x &&
        //     player_car.y < this.y + this.h && player_car.h + player_car.y > this.y) {
        //     console.log('colided');
        // }


        this.y += this.speed;
        this.element.style.top = this.y + "px";
        for (let i = 0; i < obsArray.length; i++) {
            // console.log(obsArray[i].index);

            if (detectCollison(player_car, obsArray[i])) {
                // console.log(player_car.x, this.x)
                console.log('colided');
            }
            // console.log(this);

        }

        if (this.y > laneLength) {
            // this.index = getRandomInt(0, 3);
            // const laneMapValue = laneMap[this.index];

            // this.element.setAttribute("class", `car ${laneMapValue}`);
            // obsArray[this] = this.element;
            this.y = getRandomInt(-150, -800);

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

const obsArray = [];

for (let i = 0; i < 2; i++) {
    const obs = new Obstacle();
    obs.draw();
    obsArray.push(obs);
}

function move() {
    obsArray.forEach((obs) =>
        obs.move()
    );

    requestAnimationFrame(move);
}

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