// const gameArea = document.querySelector('.gameArea');

let bird = document.querySelector('.bird');

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
console.log(window.getComputedStyle(bird).getPropertyPriority("tops"))
document.addEventListener('keydown', event => {
    if (event.code === 'Space') {
        console.log('Space pressed'); //whatever you want to do when space is pressed
        // console.log(window.getComputedStyle(bird).getPropertyPriority("tops"));
        // console.log(bird.getBoundingClientRect().y);
        // // bird.style.top = parseInt(`${bird.getBoundingClientRect().y}`) - 1 + 'px';
        // bird.style.top -= bird.getBoundingClientRect().y - 1 + 'px';
        // // bird.style.top = (350 - 0.1) + 'px';

        // console.log(birdO bj);
        // 

        console.log(bird);
    }
})


document.addEventListener('keyup', event => {
    if (event.code === 'Space') {
        console.log('Space released'); //whatever you want to do when space is pressed
    }
})

let index = 1;
class Bird {
    draw() {
        bird.style.backgroundImage = `url(images/bird${ index }.png)`;
        index = (index + 1) % 3 + 1;
        // bird.style.top = 250 + 'px';
    }

    update() {

    }
}

let birdObj = new Bird();
timer = setInterval(() => {
    birdObj.draw();
}, 100)