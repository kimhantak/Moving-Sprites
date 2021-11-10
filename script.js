import { Level } from './levels/field0.js';

import { Hero } from './Objects/Player.js';
import { Monster } from './Objects/Monster.js';
import { ScoreBoard } from './Objects/ScoreBoard.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// levels
var level = [];
var init = [];
var decor = [];

// asset
var background;
var heroSprite;
var grass;
var decoration;
var spider;
var numbers;

// objects
var monsters = [];
var hero;
var scoreBoard;

// key event
var multikey = {};

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
            scoreBoard.addScore();
            monsters.splice(monsters.indexOf(this), 1);
        }, 1000);
    } else if (
        this.x < hero.x + hero.width &&
        this.x + this.width > hero.x &&
        this.y < hero.y + hero.height &&
        this.height + this.y > hero.y && 
        hero.gravity == 0 && this.isDeath == false) 
    {
        hero.deathScene();
        setTimeout(() => { 
            window.location.reload();
        }, 1000);
    }
}

ScoreBoard.prototype.drawScore = function() {
    ctx.drawImage(spider, 0, 0, 42, 32, Math.floor(width/2)-75, 10, 42, 32); 
    ctx.drawImage(numbers, 80, 26, 20, 26, Math.floor(width/2)-20, 14, 20, 26);  
    ctx.drawImage(numbers, 
        scoreBoard.numPosition[Math.floor(scoreBoard.killPoint/10)][0],
        scoreBoard.numPosition[Math.floor(scoreBoard.killPoint/10)][1],
        20,
        26,
        Math.floor(width/2)+10,
        14,
        20,
        26
    );  
    ctx.drawImage(numbers, 
        scoreBoard.numPosition[Math.floor(scoreBoard.killPoint%10)][0],
        scoreBoard.numPosition[Math.floor(scoreBoard.killPoint%10)][1],
        20,
        26,
        Math.floor(width/2)+33,
        14,
        20,
        26
    );  
}

level = Level['grass'];
init = Level['hero'];
decor = Level['decor'];

background = new Image();
background.src = 'assets/background.png';

grass = new Image();
grass.src = 'assets/grass_8x1.png';

decoration = new Image();
decoration.src = "assets/decor.png";

spider = new Image();
spider.src = "assets/spider.png";

numbers = new Image();
numbers.src = 'assets/numbers.png';

heroSprite = new Image();
heroSprite.src = 'assets/hero.png';
heroSprite.onload = draw;

hero = new Hero(0, init.x, init.y, 36, 42, 6, -25, 0, 1, 1);
monsters.push(new Monster(0, 35, 168, 42, 32, 1, 1));
monsters.push(new Monster(0, 285, 318, 42, 32, 2, 1));
monsters.push(new Monster(0, 1255, 168, 42, 32, 2, 1));
monsters.push(new Monster(0, 1005, 318, 42, 32, 1, 1));
scoreBoard = new ScoreBoard(0);

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

function HeroAction() {
    hero.execGravity();
    hero.mapCollision();
    hero.collision();
    hero.execjumpSprite();
}

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

function draw() {
    ctx.drawImage(background, 0, 0, background.width, background.height, 0, 0, width, height);

    drawGrass();
    drawDecor();
    drawMonster();
    scoreBoard.drawScore();
    HeroAction();
    keyAction();

    if (hero.direction == -1) {
        ctx.scale(-1, 1);
        ctx.drawImage(heroSprite, 
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
        ctx.drawImage(heroSprite, 
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

function loop() {
    draw();
    requestAnimationFrame(loop);
}

loop();