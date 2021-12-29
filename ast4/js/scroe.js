let leaderBoard = {
    highScore: 0
};

function isHighScore(playerScore) {
    if (playerScore > leaderBoard.highScore) {
        return true;
    } else {
        return false;
    }
}