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