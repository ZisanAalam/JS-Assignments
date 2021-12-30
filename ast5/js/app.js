let bird = document.querySelector(".bird");
let gameArea = document.querySelector('.gameArea');
let btn = document.querySelector('.startBtn');
let ground = document.querySelector('.ground');
let startScreen = document.querySelector('.startScreen');
const scoreBoard = document.querySelector('.scoreBoard');

let score = 0;
let highScore = 0;
let bgSpeed = 0;

// game box hieigh and width
let gameAreaWidth = gameArea.clientWidth;
let gameAreaHeight = gameArea.clientHeight;
let groundHeight = ground.clientHeight;
let groundTop = gameAreaHeight - groundHeight;

//bird position values
let birdHeight = bird.clientHeight;
let birdWidth = bird.clientWidth;
let birdLeft = bird.offsetLeft;
let birdTop = bird.offsetTop;


// player statu;
let player_status = false;
btn.addEventListener('click', startGame);


//setting space key status
let key_status = false;
document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        event.preventDefault();
        key_status = true;
    }
});
document.addEventListener("keyup", (event) => {
    if (event.code === "Space") {
        event.preventDefault();
        key_status = false;
    }
});




// Bird Class
//initial bird image index
let index = 1;
class Bird {
    constructor() {
        bird.style.top = 250 + "px";
        this.speed = 0;
        this.gravity = 0.25;
        this.jump = 4.6;
    }
    flap() {
        bird.style.backgroundImage = `url(images/bird${index}.png)`;
        index = ((index + 1) % 3) + 1;
    }
    move() {
        if (bird.offsetTop + bird.clientHeight >= groundTop - 5 || bird.offsetTop <= 0) {
            gameOver();
        }
        if (key_status) {
            bird.style.transform = 'rotate(-15deg)';
            this.speed = -this.jump;
        } else {
            bird.style.transform = 'rotate(15deg)';
            this.speed += this.gravity;
            if (this.speed > this.jump + 2) {
                bird.style.transform = 'rotate(90deg)';
            }
        }
        bird.style.top = parseInt(`${bird.style.top}`) + this.speed + "px";
    }


}

class Obstacle {
    constructor() {
        this.obsRight = 0;
        this.obsHeight = 0;
        this.gap = 150;
        this.speed = 2;
        bgSpeed = this.speed;

    }

    draw() {

        this.obsHeight = getRandomInt(150, 300);
        this.obs = document.createElement("div");
        this.obsTop = document.createElement("div");

        this.obs.setAttribute("class", 'obstracleBottom');
        this.obsTop.setAttribute("class", 'obstracleTop');

        this.obs.style.height = this.obsHeight + 'px';
        this.obsTop.style.height = (gameAreaHeight - this.obsHeight - this.gap) + 'px';

        this.obs.style.right = '-60px';
        this.obsTop.style.right = '-60px';

        gameArea.appendChild(this.obs);
        gameArea.appendChild(this.obsTop);

    }


    move() {

        if (!player_status) {
            this.resetChild();
        }

        if (this.obs.offsetLeft > birdLeft && this.obs.offsetLeft < birdLeft + birdWidth) {
            if (bird.offsetTop + birdHeight > gameAreaHeight - this.obsHeight || bird.offsetTop < this.obsTop.clientHeight) {
                this.resetChild();
                gameOver();
            }
        }

        if (parseInt(this.obs.style.right) >= gameAreaWidth) {
            this.obsHeight = getRandomInt(150, 300);
            this.obs.style.height = this.obsHeight + 'px';
            this.obsTop.style.height = (gameAreaHeight - this.obsHeight - this.gap) + 'px';
            this.obs.style.right = '-50px';
            this.obsTop.style.right = '-50px';
            score += 1;
            this.speed += 0.25;
            bgSpeed = this.speed;

        } else {
            this.obs.style.right = parseInt(`${this.obs.style.right}`) + this.speed + "px";
            this.obsTop.style.right = parseInt(`${this.obsTop.style.right}`) + this.speed + "px";

        }
        scoreBoard.innerHTML = `<p>High Score : ${highScore} <br> Your Score:${score}</p>`;

    }
    resetChild() {
        gameArea.removeChild(this.obs);
        gameArea.removeChild(this.obsTop);
        this.draw();
    }
}

function gameOver() {
    player_status = false;
    startScreen.classList.remove('hide');
    startScreen.classList.add('end');
    btn.classList.add('btn');
    if (score > highScore) {
        highScore = score;
    }

    score = 0;

}

let groundLeft = ground.offsetLeft;

function moveBackground() {
    ground.style.left = groundLeft - 5 + 'px';
    groundLeft = groundLeft - bgSpeed;
    if (groundLeft <= -300) {
        groundLeft = -5;
    }
}


let birdObj;
let ob;

function startGame() {
    startScreen.classList.add('hide');
    player_status = true;
    birdObj = new Bird();
    ob = new Obstacle();
    ob.draw();
    playGame();
    // ob.resetChild();
}

function playGame() {
    // ob.resetChild();

    if (player_status) {
        birdObj.flap();
        birdObj.move();
        ob.move();
        moveBackground();

        requestAnimationFrame(playGame);

    }

}