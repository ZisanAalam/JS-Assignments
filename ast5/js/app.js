let bird = document.querySelector(".bird");

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}
document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        event.preventDefault();
        bird.style.top = parseInt(`${bird.style.top}`) - 15 + "px";
    }
});

document.addEventListener("keyup", (event) => {
    if (event.code === "Space") {
        event.preventDefault();
    }
});

let index = 1;
class Bird {
    constructor() {
        bird.style.top = 250 + "px";
    }
    flap() {
        bird.style.backgroundImage = `url(images/bird${index}.png)`;
        index = ((index + 1) % 3) + 1;
    }

    update() {}
}

let birdObj = new Bird();
timer = setInterval(() => {
    birdObj.flap();
}, 100);