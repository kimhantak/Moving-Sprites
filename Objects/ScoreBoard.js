function ScoreBoard(killPoint) {
    this.killPoint = killPoint;
    this.numPosition = {
        "0": [0, 0],
        "1": [20, 0],
        "2": [40, 0],
        "3": [60, 0],
        "4": [80, 0],
        "5": [100, 0],
        "6": [0, 26],
        "7": [20, 26],
        "8": [40, 26],
        "9": [60, 26],
    };
}

ScoreBoard.prototype.addScore = function() {
    this.killPoint++;
    this.canNextRound();
}

export { ScoreBoard };