import { Level1 } from './levels/field0.js';
import { Hero } from './Objects/Player.js';
import { Monster } from './Objects/Monster.js';
import { ScoreBoard } from './Objects/ScoreBoard.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
var mapWidth = canvas.width = window.innerWidth;
var mapHeight = canvas.height = window.innerHeight;

// round
var level = [Level1];
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

function Game(scoreBoard, player, monsters, round) {
    this.scoreBoard = scoreBoard;
    this.player = player;
    this.monsters = monsters;
    this.round = round;
}

function drawMap() {
    levelObj.forEach((level) => {
        ctx.drawImage(grass, 0, 0, grass.width, grass.height, ...level);
    });
    decorationObj.forEach((decor) => {
        ctx.drawImage(decoration, ...decor);
    })
}

function keyAction() {
    if (multikey['w']) {
        hero.jump();
    }
    if (multikey['a']) {
        hero.move(-1);
    } else if (multikey['d']) {
        hero.move(1);
    }
}

function draw() {
    ctx.drawImage(background, 0, 0, background.width, background.height, 0, 0, mapWidth, mapHeight);

    drawMap();
    game.monsters.forEach((mst) => {
        ctx.drawImage(spider, 
            mst.scene*mst.width, 
            0, 
            mst.width,     
            mst.height, 
            mst.x, 
            mst.y, 
            mst.width, 
            mst.height );    
        (mst.isDeath == true) ? mst.deathScene() : mst.autoMove();
        mst.mapCollision();
        mst.collideByHero(game.player, game.monsters, game.scoreBoard);
    });
    game.scoreBoard.drawScore(ctx, spider, numbers, mapWidth);
    game.player.execGravity();
    game.player.mapCollision();
    game.player.collisionGrass(levelObj);
    game.player.execjumpSprite();
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

scoreBoard = new ScoreBoard();

function loadRound() {
    round = level[_level++];
    levelObj = round['grass'];
    heroObj = round['hero'];
    decorationObj = round['decor'];
    monsterObj = round['monsters'];

    hero = new Hero(...heroObj);
    monsterObj.forEach((mst) => { monsters.push(new Monster(...mst)); });
    game = new Game(scoreBoard, hero, monsters, _level);
}

function loop() {
    draw();
    requestAnimationFrame(loop);
}

loadRound();
loop();


// key Event, resize Event
window.addEventListener('keydown', (e) => {
    multikey[e.key] = true;
}, false);

window.addEventListener('keyup', (e) => { 
    hero.stop();
    delete multikey[e.key];
}, false);

window.addEventListener('resize', (e) => {
    mapWidth = window.innerWidth;
    canvas.width = window.innerWidth;
    mapHeight = window.innerHeight;
    canvas.height = window.innerHeight;
}, false);