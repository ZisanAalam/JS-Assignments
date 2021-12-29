let bird = document.querySelector(".bird");
let gameArea = document.querySelector('.gameArea');
let btn = document.querySelector('.startBtn');
let ground = document.querySelector('.ground');
let startScreen = document.querySelector('.startScreen');
const scoreBoard = document.querySelector('.scoreBoard');

let score = 0;
let highScore = 0;

// game box hieigh and width
let gameAreaWidth = gameArea.clientWidth;
let gameAreaHeight = gameArea.clientHeight;
let groundHeight = ground.clientHeight;
let groundTop = gameAreaHeight - groundHeight;

let birdHeight = bird.clientHeight;
let birdWidth = bird.clientWidth;
let birdLeft = bird.offsetLeft;
let birdTop = bird.offsetTop;
// console.log(birdTop)


// player statu;
let player_status = false;
btn.addEventListener('click', startGame);


//setting space key status
let key_status = false;
document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        event.preventDefault();
        key_status = true;
        // bird.style.top = parseInt(`${bird.style.top}`) - 50 + "px";
    }
});
document.addEventListener("keyup", (event) => {
    if (event.code === "Space") {
        event.preventDefault();
        // bird.style.top = parseInt(`${bird.style.top}`) + 1 + "px";
        key_status = false;
    }
});







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
        //bird.style.top = 250 + 'px';
    }
    move() {
        if (bird.offsetTop + bird.clientHeight >= groundTop - 5 || bird.offsetTop <= 0) {
            player_status = false;
            gameOver();
            // console.log(ob.children[0]);
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



        // console.log(bird.offsetTop);
    }


}

class Obstacle {
    constructor() {
        this.obsRight = 0;
        this.obsHeight = 0;
        this.gap = 100;
        this.speed = 5;

    }

    draw() {

        this.obsHeight = getRandomInt(150, 300);
        this.obs = document.createElement("div");
        this.obsTop = document.createElement("div");

        this.obs.setAttribute("class", 'obstracleBottom');
        this.obsTop.setAttribute("class", 'obstracleTop');

        this.obs.style.height = this.obsHeight + 'px';
        this.obsTop.style.height = (gameAreaHeight - groundHeight - this.obsHeight - this.gap) + 'px';
        // this.obsTop.style.height = '100px';

        this.obs.style.right = '-60px';
        this.obsTop.style.right = '-60px';

        gameArea.appendChild(this.obs);
        gameArea.appendChild(this.obsTop);
        // console.log(this.obsTop.style.right);

    }


    move() {

        if (!player_status) {
            this.resetChild();
        }

        if (this.obs.offsetLeft > birdLeft && this.obs.offsetLeft < birdLeft + birdWidth) {
            if (bird.offsetTop + birdHeight > gameAreaHeight - this.obsHeight - 5 || bird.offsetTop < this.obsTop.clientHeight) {
                player_status = false;
                this.resetChild();
                gameOver();
            }
        }
        if (parseInt(this.obs.style.right) >= gameAreaWidth) {
            this.obsHeight = getRandomInt(150, 300);
            this.obs.style.height = this.obsHeight + 'px';
            this.obsTop.style.height = (gameAreaHeight - groundHeight - this.obsHeight - this.gap) + 'px';
            this.obs.style.right = '-50px';
            this.obsTop.style.right = '-50px';
            score++;
            this.speed += 0.25;
            scoreBoard.innerHTML = `<p>High Score : ${highScore} <br> Your Score<br>${score}</p>`;
            // this.draw();
            // this.resetChild();

        } else {
            this.obs.style.right = parseInt(`${this.obs.style.right}`) + this.speed + "px";
            this.obsTop.style.right = parseInt(`${this.obsTop.style.right}`) + this.speed + "px";

        }


    }
    resetChild() {
        gameArea.removeChild(this.obs);
        gameArea.removeChild(this.obsTop);
        this.draw();
    }
}

function gameOver() {
    startScreen.classList.remove('hide');
    startScreen.classList.add('end');
    btn.classList.add('btn');

}
// console


let birdObj;
let ob;


function startGame() {
    scoreBoard.innerHTML = `<p>High Score : ${highScore} <br> Your Score:${score}</p>`;
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

        // requestAnimationFrame(playGame);

    }

}
setInterval(playGame, 20)



// timer = setInterval(() => {
//     birdObj.flap();
//     ob.move();
//     birdObj.move();
//     // birdObj.fall();
// }, 1000 / 60);