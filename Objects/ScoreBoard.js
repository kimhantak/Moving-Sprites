function ScoreBoard() {
    this.killPoint = 0;
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

ScoreBoard.prototype.drawScore = function(ctx, spider, numbers, mapWidth) {
    ctx.drawImage(spider, 0, 0, 42, 32, Math.floor(mapWidth/2)-75, 10, 42, 32); 
    ctx.drawImage(numbers, 80, 26, 20, 26, Math.floor(mapWidth/2)-20, 14, 20, 26);  
    ctx.drawImage(numbers, 
        this.numPosition[Math.floor(this.killPoint/10)][0],
        this.numPosition[Math.floor(this.killPoint/10)][1],
        20,
        26,
        Math.floor(mapWidth/2)+10,
        14,
        20,
        26
    );  
    ctx.drawImage(numbers, 
        this.numPosition[Math.floor(this.killPoint%10)][0],
        this.numPosition[Math.floor(this.killPoint%10)][1],
        20,
        26,
        Math.floor(mapWidth/2)+33,
        14,
        20,
        26
    );  
}

ScoreBoard.prototype.addScore = function() {
    this.killPoint++;
}

export { ScoreBoard };