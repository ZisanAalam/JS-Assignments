function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}


let leaderBoard = {
    highScore: 0
};

localStorage.setItem('score', 0);
let score;

function isHighScore(playerScore) {
    score = localStorage.getItem('score');
    if (playerScore > score) {
        localStorage.setItem('score', playerScore);
        return true;
    } else {
        return false;
    }


    // if (playerScore > leaderBoard.highScore) {
    //     return true;
    // } else {
    //     return false;
    // }
}