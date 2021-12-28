const scoreBoard = document.querySelector('.score');
const startScreen = document.querySelector('.startScreen');
const startBtn = document.getElementById('startBtn');
const gameArea = document.querySelector('.gameArea');

startBtn.addEventListener('click', startGame);
let player = {};

let keys = {
    ArrowLeft: false,
    ArrowRight: false,
    ArrowUp: false,
    ArrowDown: false
}
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

function keyDown(event) {
    // event.preventDefault();
    keys[event.key] = true;
}

function keyUp(event) {
    // event.preventDefault();
    keys[event.key] = false;
}

function playGame() {
    if (player.start) {

        let car = document.getElementById('car');
        // car.style.backgroundColor = 'black';
        // car.style.position = 'absolute';

        if (keys.ArrowUp) {
            player.carY += player.speed;
        }
        if (keys.ArrowDown) {
            player.carY -= player.speed;
        }
        if (keys.ArrowRight) {
            car.style.left += 1 + 'px';
            console.log(car.offsetLeft);
            player.carX += player.speed;
        }
        if (keys.ArrowLeft) {
            player.carX -= player.speed;
        }
        car.style.top += player.carY + 'px';
        car.style.left += player.carX + 'px';
        requestAnimationFrame(playGame);
    }
}

function startGame() {
    gameArea.classList.remove('hide');
    startScreen.classList.add('hide');
    player.start = true;
    window.requestAnimationFrame(playGame);

    let car = document.createElement('div');

    car.setAttribute('id', 'car');

    gameArea.appendChild(car);

    player.carX = car.offsetLeft;
    player.carY = car.offsetTop;
    player.speed = 5;


    console.log(player);
}