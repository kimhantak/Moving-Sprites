const width = window.innerWidth;
const height = window.innerHeight;

function Hero(scene, x, y, width, height, speed, jumpHeight, gravity, gravitySpeed, direction) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.jumpHeight = jumpHeight;
    this.gravity = gravity;
    this.gravitySpeed = gravitySpeed;
    this.direction = direction;
    this.deathSprite = [6, 5, 6, 5, 6];
    this._deathSprite = 0;
    this.deathSpritedelay = 0;
    this.isDown = true;
    this.isDeath = false;
    this.pos = 2;
}

Hero.prototype.disableJump = function() {
    this.isDown = false;
} 

Hero.prototype.enableJump = function() {
    this.isDown = true;
}

Hero.prototype.move = function(direction) {
    this.direction = direction;
    this.x += this.speed*this.direction;

    if (this.isDown == true && this.gravity == 0) {
        if (this.pos % 18 == 0) {
            this.scene = this.scene++ % 2 + 1;
            this.pos = 0;
        }
    }
    this.pos += 2;
}   

Hero.prototype.stop = function() {
    this.scene = 0;
}

Hero.prototype.execGravity = function() {
    this.gravity += this.gravitySpeed;
    this.y += this.gravity;
}

Hero.prototype.jump = function() {
    if (this.isDown == true && this.gravity == 0) {
        this.gravity = this.jumpHeight;
    }
}

Hero.prototype.execjumpSprite = function () {
    if (this.isDown == false) {
        if (this.gravity <= -15) {
            this.scene = 3;
        } else if (this.gravity <= -5) {
            this.scene = 4;
        } else if (this.gravity < 0) {
            this.scene = 5;
        } 
    }   
}

Hero.prototype.deathScene = function() {
    this.speed = 0;
    this.isDeath = true;
    this.disableJump();
    if (this.deathSpritedelay++ % 14 == 0) {
        this.scene = this.deathSprite[this._deathSprite++ % this.deathSprite.length];
    }
}

Hero.prototype.mapCollision = function() {
    if (this.x < 0) {
        this.x = 0;
    }
    if (this.x + this.width > width) {
        this.x = width - this.width;
    }
    if (this.y < 0) {
        this.y = 0;
    }
    if (this.y + this.height > height) {
        this.y = height - this.height;
        this.gravity = 0;
    }
}

export { Hero };