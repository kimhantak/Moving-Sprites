import { Level } from './levels/field0.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

var level = [];
var init = [];
var decor = [];
var background;
var sprites;
var grass;
var decoration;
var spider;
var monsters = [];
var hero;
var multikey = {};
var pos = 2;

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

    if (this.isDown == true && this.gravity == 0) {
        if (pos % 18 == 0) {
            this.scene = this.scene++ % 2 + 1;
            pos = 0;
        }
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

Hero.prototype.deathScene = function() {

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

function Monster(scene, x, y, width, height, speed, direction) {
    this.scene = scene;
    this.x = x;
    this.minX = this.x-5;
    this.maxX = this.x+245;
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
    if (this.deathSpritedelay++ % 7 == 0) {
        this.scene = this.deathSprite[this._deathSprite++];
    }
}

Monster.prototype.collideByHero = function() {
    if (this.x < hero.x + hero.width &&
        this.x + this.width > hero.x &&
        this.y < hero.y + hero.height &&
        this.height + this.y > hero.y && 
        hero.gravity > 0 && this.isDeath == false) 
    {
        hero.gravity = -15;
        this.deathScene();
        setTimeout(() => { 
            monsters.splice(monsters.indexOf(this), 1);
        }, 1000);
    } else if (
        this.x < hero.x + hero.width &&
        this.x + this.width > hero.x &&
        this.y < hero.y + hero.height &&
        this.height + this.y > hero.y && 
        hero.gravity == 0 && this.isDeath == false) 
    {
        console.log("hero death");
        hero.deathScene();
    }
}

background = new Image();
background.src = 'assets/background.png';

grass = new Image();
grass.src = 'assets/grass_8x1.png';

decoration = new Image();
decoration.src = "assets/decor.png";

spider = new Image();
spider.src = "assets/spider.png";

sprites = new Image();
sprites.src = 'assets/hero.png';
sprites.onload = draw;

level = Level['grass'];
init = Level['hero'];
decor = Level['decor'];

hero = new Hero(0, init.x, init.y, 36, 42, 6, -25, 0, 1, 1);
monsters.push(new Monster(0, 35, 168, 42, 32, 1, 1));
monsters.push(new Monster(0, 285, 318, 42, 32, 2, 1));
monsters.push(new Monster(0, 1255, 168, 42, 32, 2, 1));
monsters.push(new Monster(0, 1005, 318, 42, 32, 1, 1));

function keyAction() {
    if (multikey['w']) {
        hero.jump();
        hero.disableJump();
    }
    if (multikey['a']) {
        hero.move(-1);
    }
    if (multikey['d']) {
        hero.move(1);
    }
}

function drawMonster() {
    for (let i = 0; i < monsters.length; i++) { 
        ctx.drawImage(spider, 
            monsters[i].scene*monsters[i].width,
            0,
            monsters[i].width,
            monsters[i].height,
            monsters[i].x,
            monsters[i].y,
            monsters[i].width,
            monsters[i].height
        );    
        if (monsters[i].isDeath == true) {
            monsters[i].deathScene();
        } else {
            monsters[i].autoMove();
        }
        monsters[i].mapCollision();
        monsters[i].collideByHero();
    }
}

function drawGrass() {
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
}

function drawDecor() {
    for (let i = 0; i < decor.length; i++) {
        ctx.drawImage(decoration, 
            decor[i].scene*42, 
            0, 
            42, 
            decor[i].height, 
            decor[i].x, 
            decor[i].y, 
            decor[i].width, 
            decor[i].height
        );
    }
}

function draw() {
    ctx.drawImage(background, 0, 0, background.width, background.height, 0, 0, width, height);

    drawGrass();
    drawDecor();
    drawMonster();

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

    keyAction();
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

window.addEventListener('keydown', (e) => {
    multikey[e.key] = true;
}, false);

window.addEventListener('keyup', (e) => { 
    if (e.key == 'w') {
        hero.enableJump();
    } 
    hero.stop();
    delete multikey[e.key];
}, false);