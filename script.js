import { Level } from './levels/field0';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

var level = [];
var init = [];
var background;
var sprites;
var grass;
var hero;
var multikey = {};

var pos = 2;

var keyID;

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
    this.isDown = true;
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

    if (pos % 6 == 0) {
        this.scene = this.scene++ % 2 + 1;
        pos = 0;
    }
    pos += 2;
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

Hero.prototype.collision = function() {
    let heroPos = {
        x: this.x + Math.floor(this.width/2),
        y: this.y + this.height
    }
    for (let i = 0; i < level.length; i++) {
        if ((heroPos.x >= level[i].x && heroPos.x <= level[i].x+level[i].width) 
            && (this.y + this.height <= level[i].y+42 && this.y + this.height >= level[i].y-10)) {
            if (0 < this.gravity) {
                this.y = level[i].y - this.height;
                this.gravity = 0;
            }
        } 
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

background = new Image();
background.src = 'assets/background.png';

sprites = new Image();
sprites.src = 'assets/hero.png';
sprites.onload = draw;

grass = new Image();
grass.src = 'assets/grass_8x1.png';

level = Level['grass'];
init = Level['hero'];
hero = new Hero(0, init.x, init.y, 36, 42, 6, -25, 0, 1, 1);

function draw() {
    ctx.drawImage(background, 0, 0, background.width, background.height, 0, 0, width, height);

    for (let i = 0; i < level.length; i++) {
        ctx.drawImage(grass, 
            0, 
            0, 
            grass.width, 
            grass.height, 
            level[i].x, 
            level[i].y, 
            level[i].width, 
            level[i].height
        );
    }

    if (hero.direction == -1) {
        ctx.scale(-1, 1);
        ctx.drawImage(sprites, 
            hero.scene*hero.width, 
            0, 
            hero.width, 
            hero.height, 
            -hero.x - hero.width, 
            hero.y, 
            hero.width, 
            hero.height
        );
        ctx.scale(-1, 1);
    } else {
        ctx.drawImage(sprites, 
            hero.scene*hero.width, 
            0, 
            hero.width, 
            hero.height, 
            hero.x, 
            hero.y, 
            hero.width, 
            hero.height
        );
    }
}

function loop() {
    hero.execGravity();
    hero.mapCollision();
    hero.collision();
    hero.execjumpSprite();
    draw();
    requestAnimationFrame(loop);
}

loop();

window.addEventListener('keypress', (e) => {
    multikey[e.key] = true;
    keyID = setInterval(() => {
        if (multikey['w'] && multikey['a']) {
            hero.jump();
            hero.disableJump();
            hero.move(-1);
        } else if (multikey['w'] && multikey['d']) {
            hero.jump();
            hero.disableJump();
            hero.move(1);
        } else if (multikey['w']) {
            hero.jump();
            hero.disableJump();
        } else if (multikey['a']) {
            hero.move(-1);
        } else if (multikey['d']) {
            hero.move(1);
        }
    }, 200);
});

window.addEventListener('keyup', (e) => { 
    clearInterval(keyID);
    keyID = null;
    if (e.key == 'w') {
        hero.enableJump();
    } 
    hero.stop();
    multikey = {};
});