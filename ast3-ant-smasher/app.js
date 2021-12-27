//Utility Functions
function getDistance(x1, y1, x2, y2) {
    let dx = x2 - x1;
    let dy = y2 - y1;

    return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
}

function getRandomFromRange(max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


/*==================================================================================*/


const box = document.querySelector('.box');
box.style.width = '95%';
box.style.height = '95vh';
box.style.margin = '10px auto'
box.style.border = '2px solid black';
box.style.position = 'relative';


let boxWidth = box.clientWidth;
let boxHeight = box.clientHeight;

window.addEventListener('resize', () => {
    boxWidth = box.clientWidth;
    boxHeight = box.clientHeight;
    init();
});

let mouse = {
    x: undefined,
    y: undefined
};
window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
    // console.log(mouse);
});
console.log(mouse.x, mouse.y);


function Circle(x, y, radius, color, speed) {
    this.x = x;
    this.y = y
    this.radius = radius;
    this.color = color;
    this.speed = speed;
    this.dx = (Math.random() - 0.5) * this.speed;
    this.dy = (Math.random() - 0.5) * this.speed;
    this.circle = null;




    this.update = function(circles) {
        // this.detectBoxCollision(circles);
        for (let i = 0; i < circles.length; i++) {
            if (this != circles[i]) {

                let dis = getDistance(this.x, this.y, circles[i].x, circles[i].y);
                if (dis - 2 * this.radius <= 0) {

                    this.dx = -this.dx;
                    this.dy = -this.dy;
                    circles[i].dx = -circles[i].dx;
                    circles[i].dy = -circles[i].dy;


                }

            }

        }


        if (getDistance(mouse.x, mouse.y, this.x, this.y) <= 30) {

            box.removeChild(this.circle);
        }



        this.detectBoxCollision();
        this.x += this.dx;
        this.y += this.dy;
        this.circle.style.left = this.x + 'px';
        this.circle.style.top = this.y + 'px';
    }

    this.draw = function() {
        let circle = document.createElement('img');
        circle.src = 'imgs/ant.jfif';
        this.circle = circle;
        circle.style.width = radius * 2 + 'px';
        circle.style.height = radius * 2 + 'px';
        circle.style.borderRadius = '50%';
        circle.style.position = 'absolute';
        circle.style.top = y + 'px';
        circle.style.left = x + 'px';
        circle.style.background = this.color;
        box.appendChild(circle);
    }

    // this.removeObj = function(){
    //     box.removeChild(this.circle);
    // }


    this.detectBoxCollision = function() {
        if (this.x + radius * 2 > boxWidth || this.x < 0) {
            this.dx = -this.dx
        }
        if (this.y + radius * 2 > boxHeight || this.y < 0) {
            this.dy = -this.dy

        }
    }

    this.detectBallCollision = function(circles) {
        for (let i = 0; i < circles.length; i++) {
            if (this != circles[i]) {
                let dis = getDistance(this.x, this.y, circles[i].x, circles[i].y);
                if (dis - 2 * this.radius < 0) {
                    console.log('colided');
                }

            }
        }
    }

}


/* Randomly generating circles at different position without collision */
let circles = [];
let radius = 50;
let maxX = boxWidth - radius * 2;
let maxY = boxHeight - radius * 2;
let minX = 0;
let minY = 0;
let speed = 5;

function init() {
    for (let i = 0; i < 10; i++) {
        radius = getRandomFromRange(50, 30);
        speed = getRandomFromRange(10, 2);
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

        circles.push(new Circle(x, y, radius, getRandomColor(), speed));
        circles[i].draw();

    }
}


function animate() {
    requestAnimationFrame(animate);
    circles.forEach((circle) => {
        circle.update(circles);
    })
}

init();
animate();