import { Level } from './levels/field0';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

var level = [];
var background;
var sprites;
var grass;
var hero;
var pos = 2;
var isDown = true;

function Hero(scene, x, y, width, height, speed, jumpSpeed, gravity, gravitySpeed, direction = 0) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.jumpSpeed = jumpSpeed;
    this.gravity = gravity;
    this.gravitySpeed = gravitySpeed;
    this.direction = direction;
}

Hero.prototype.move = function(direction) {
    this.direction = direction;
    this.x += this.speed*this.direction;

    if (pos % 10 == 0) {
        this.scene = this.scene++ % 2 + 1;
        pos = 0;
    }
    pos += 2;
}   

Hero.prototype.stop = function() {
    this.scene = 0;
}

Hero.prototype.jump = function() {
    if (isDown == true) {
        this.gravity = this.jumpSpeed;
        isDown = false;
    }
}

Hero.prototype.collision = function(field) {
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
        if (isDown == false) {
            isDown = true;
        }
    }

    let heroPos = {
        x: this.x + Math.floor(this.width/2),
        y: this.y + this.height
    }
    for (let i = 0; i < field.length; i++) {
        if ( (heroPos.x >= field[i].x && heroPos.x <= field[i].x+field[i].width) 
        || this.y + this.height == field[i].y) {
            this.y = field[i].y - this.height;
        }
    }
}

Hero.prototype.isJump = function () {
    // jump scene
    if (isDown == false) {
        if (this.gravity == this.jumpSpeed) {
            this.scene = 3;
        } else if (this.gravity >= -5 && this.gravity <= 0) {
            this.scene = 4;
        } else if (this.gravity > 5) {
            this.scene = 5;
        }
        if (this.gravity == -this.jumpSpeed-1) {
            this.scene = 0;
        }
    }
}

Hero.prototype.execGravity = function() {
    this.isJump();
    this.gravity += this.gravitySpeed;
    this.y += this.gravity;
}

background = new Image();
background.src = 'assets/background.png';

sprites = new Image();
sprites.src = 'assets/hero.png';
sprites.onload = draw;

grass = new Image();
grass.src = 'assets/grass_8x1.png';

level = Level["grass"];
hero = new Hero(0, Level['hero'].x, Level['hero'].y, 36, 42, 5, -25, 0, 1, 1);

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
    hero.collision(level);
    draw();
    requestAnimationFrame(loop);
}

loop();

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'w':
            hero.jump();
            break;
        case 'a':
            hero.move(-1);
            break;
        case 'd':
            hero.move(1);
            break;
        default:
    }
});

window.addEventListener('keyup', (e) => {   
    hero.stop();
});