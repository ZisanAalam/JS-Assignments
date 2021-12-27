const box = document.querySelector('.box');

// console.log(box);
box.style.width = '800px';
box.style.height = '600px';
box.style.border = '2px solid black';
box.style.position = 'relative';
box.style.left = '200px';
box.style.top = '20px';

const boxWidth = box.clientWidth;
const boxHeight = box.clientHeight;

function Circle(x, y, radius, color) {
    this.x = x;
    this.y = y
    this.radius = radius;
    this.color = color;
    this.speed = 5;
    this.dx = Math.random() - 0.5;
    this.dy = Math.random() - 0.5;
    this.circle = null;
    this.draw = function() {
        let circle = document.createElement('div');
        this.circle = circle;
        circle.style.width = radius * 2 + 'px';
        circle.style.height = radius * 2 + 'px';
        circle.style.borderRadius = '50%';
        circle.style.position = 'absolute';
        circle.style.top = y + 'px';
        circle.style.left = x + 'px';
        circle.style.background = this.color;
        // circle.style.borderColor = this.color;

        box.appendChild(circle);
    }


    this.dx = this.dx * this.speed;
    this.dy = this.dy * this.speed;
    this.update = function() {

        this.detectBoxCollision();
        this.x += this.dx;
        this.y += this.dy;

        this.circle.style.left = this.x + 'px';
        this.circle.style.top = this.y + 'px';
    }

    this.detectBoxCollision = function() {
        if (this.x + radius * 2 > boxWidth || this.x < 0) {
            this.dx = -this.dx
        }
        if (this.y + radius * 2 > boxHeight || this.y < 0) {
            this.dy = -this.dy
        }
    }

    this.detectBallCollision = function() {

    }

}

//Utility Methods
function getDistance(x1, y1, x2, y2) {
    let dx = x2 - x1;
    let dy = y2 - y1;

    return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
}

function getRandomFromRange(max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


/* Randomly generating circles at different position without collision */
let circles = [];
let radius = 50;
let maxX = 800 - radius * 2;
let maxY = 600 - radius * 2;
let minX = 0;
let minY = 0;
for (let i = 0; i < 10; i++) {
    let x = getRandomFromRange(maxX, minX);
    let y = getRandomFromRange(maxY, minY);

    if (circles.length != 0) {
        for (let j = 0; j < circles.length; j++) {
            let dis = (getDistance(x, y, circles[j].x, circles[j].y)) - (radius * 2)
            if (dis < 0) {
                x = getRandomFromRange(maxX, minX);
                y = getRandomFromRange(maxY, minY);
                j = -1;
            }
        }
    }

    circles.push(new Circle(x, y, radius, 'blue'));
    circles[i].draw();

}

function move() {
    setInterval(() => {

        circles.forEach((circle) => {
            circle.update();
        })

    }, 1);
}

move();