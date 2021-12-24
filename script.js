import { Level1 } from './levels/field0.js';
import { Level2 } from './levels/filed1.js';

import { Hero } from './Objects/Player.js';
import { Monster } from './Objects/Monster.js';
import { ScoreBoard } from './Objects/ScoreBoard.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
var mapWidth = canvas.width = window.innerWidth;
var mapHeight = canvas.height = window.innerHeight;

// round
var level = [Level1, Level2];
var _level = 0;
var round = level[_level];

// level objects
var levelObj = [];
var heroObj = [];
var decorationObj = [];
var monsterObj = [];

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
var game;

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
            monsters.splice(monsters.indexOf(this), 1);
            scoreBoard.addScore();
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
    ctx.drawImage(spider, 0, 0, 42, 32, Math.floor(mapWidth/2)-75, 10, 42, 32); 
    ctx.drawImage(numbers, 80, 26, 20, 26, Math.floor(mapWidth/2)-20, 14, 20, 26);  
    ctx.drawImage(numbers, 
        scoreBoard.numPosition[Math.floor(scoreBoard.killPoint/10)][0],
        scoreBoard.numPosition[Math.floor(scoreBoard.killPoint/10)][1],
        20,
        26,
        Math.floor(mapWidth/2)+10,
        14,
        20,
        26
    );  
    ctx.drawImage(numbers, 
        scoreBoard.numPosition[Math.floor(scoreBoard.killPoint%10)][0],
        scoreBoard.numPosition[Math.floor(scoreBoard.killPoint%10)][1],
        20,
        26,
        Math.floor(mapWidth/2)+33,
        14,
        20,
        26
    );  
}

Hero.prototype.collision = function() {
    let heroPos = {
        x: this.x + Math.floor(this.width/2),
        y: this.y + this.height
    }
    for (let i = 0; i < levelObj.length; i++) {
        if ((heroPos.x >= levelObj[i].x && heroPos.x <= levelObj[i].x+levelObj[i].width) 
            && (this.y + this.height <= levelObj[i].y+42 && this.y + this.height >= levelObj[i].y-10)) {
            if (0 < this.gravity) {
                this.y = levelObj[i].y - this.height;
                this.gravity = 0;
            }
        } 
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

numbers = new Image();
numbers.src = 'assets/numbers.png';

heroSprite = new Image();
heroSprite.src = 'assets/hero.png';
heroSprite.onload = draw;

function Game(scoreBoard, player, monster, round) {
    this.scoreBoard = scoreBoard;
    this.player = player;
    this.monster = monster;
    this.round = round;
}

scoreBoard = new ScoreBoard(0);
scoreBoard.canNextRound = function() {
    if (monsters.length == 0) {
        loadRound();
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
    for (let i = 0; i < levelObj.length; i++) {
        ctx.drawImage(grass, 
            0, 
            0, 
            grass.width, 
            grass.height, 
            levelObj[i].x, 
            levelObj[i].y, 
            levelObj[i].width, 
            levelObj[i].height
        );
    }
}

function drawDecor() {
    for (let i = 0; i < decorationObj.length; i++) {
        ctx.drawImage(decoration, 
            decorationObj[i].scene*42, 
            0, 
            42, 
            decorationObj[i].height, 
            decorationObj[i].x, 
            decorationObj[i].y, 
            decorationObj[i].width, 
            decorationObj[i].height
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
    ctx.drawImage(background, 0, 0, background.width, background.height, 0, 0, mapWidth, mapHeight);

    drawGrass();
    drawDecor();
    scoreBoard.drawScore();
    drawMonster();
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

window.addEventListener('resize', (e) => {
    mapWidth = window.innerWidth;
    canvas.width = window.innerWidth;
    mapHeight = window.innerHeight;
    canvas.height = window.innerHeight;
}, false);

function loop() {
    draw();
    requestAnimationFrame(loop);
}

function loadRound() {
    round = level[_level++];

    levelObj = round['grass'];
    heroObj = round['hero'];
    decorationObj = round['decor'];
    monsterObj = round['monsters'];

    hero = new Hero(0, 
        heroObj.x, 
        heroObj.y, 
        heroObj.width, 
        heroObj.height, 
        heroObj.speed, 
        heroObj.jumpHeight, 
        heroObj.gravity, 
        heroObj.gravitySpeed, 
        heroObj.direction
    );
    for (let k = 0; k < monsterObj.length; k++) {
        monsters.push(
            new Monster(...monsterObj[k])
            );
    }

    game = new Game(scoreBoard, hero, monsters, round);
}

loadRound();
loop();