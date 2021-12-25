function Monster(scene, x, y, width, height, speed, direction, lWall, rWall) {
    this.scene = scene;
    this.x = x;
    this.minX = this.x-lWall;
    this.maxX = this.x+rWall;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.direction = direction;
    this.mPos = 2;
    this.deathSprite = [0, 4, 0, 4, 0, 2, 2, 3, 3];
    this._deathSprite = 0;
    this.deathSpritedelay = 0;
    this.isDeath = false;
}

Monster.prototype.autoMove = function() {
    this.x += this.speed*this.direction;

    if (this.mPos % 18 == 0) {
        this.scene = this.scene++ % 2 + 1;
        this.mPos = 0;
    }
    this.mPos += 2;
}

Monster.prototype.collideByHero = function(game) {
    if (this.x < game.player.x + game.player.width &&
        this.x + this.width > game.player.x &&
        this.y < game.player.y + game.player.height &&
        this.height + this.y > game.player.y && 
        game.player.gravity > 0 && this.isDeath == false) 
    {
        game.player.gravity = -15;
        this.deathScene();
        setTimeout(() => { 
            game.scoreBoard.addScore();
            game.monsters.splice(game.monsters.indexOf(this), 1);
            setTimeout(() => { 
                game.nextRound();
            }, 3000);
        }, 1500);
    } else if (
        this.x < game.player.x + game.player.width &&
        this.x + this.width > game.player.x &&
        this.y < game.player.y + game.player.height &&
        this.height + this.y > game.player.y && 
        game.player.gravity == 0 && this.isDeath == false) 
    {
        if (game.player.isDeath == false) {
            setTimeout(() => { 
                game.reloadRound();
            }, 1500);
        }
        game.player.deathScene();
    }
}

Monster.prototype.mapCollision = function() {
    if (this.x + this.width > this.maxX) {
        this.x = this.maxX - this.width;
        this.direction = -this.direction;
    } else if (this.x < this.minX) {
        this.x = this.minX;
        this.direction = -this.direction;
    }
}

Monster.prototype.deathScene = function() {
    this.speed = 0;
    this.isDeath = true;
    if (this.deathSpritedelay++ % 10 == 0) {
        this.scene = this.deathSprite[this._deathSprite++ % this.deathSprite.length];
    }
}

export { Monster };