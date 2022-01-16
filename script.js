import { Level1 } from './levels/field0.js';
import { Level2 } from './levels/field1.js';
import { Level3 } from './levels/field2.js';
import { Level4 } from './levels/field3.js';
import { Level5 } from './levels/field4.js';
import { Hero } from './Objects/Player.js';
import { Monster } from './Objects/Monster.js';
import { ScoreBoard } from './Objects/ScoreBoard.js';
import { Win, Lose } from './message/msg.js';

var userName = "";
userName = window.prompt("게임에 사용할 이름을 입력하십시오!", "John wick");

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
var mapWidth = canvas.width = window.innerWidth;
var mapHeight = canvas.height = window.innerHeight;

var jumpAudio = new Audio('sounds/jump.wav');
var bgm = new Audio('sounds/bgm.mp3');
bgm.muted = true;

const checkbox = document.querySelector('#bgmCheck');
checkbox.addEventListener('click', () => {
    if (checkbox.checked) {
        bgm.muted = false;
        bgm.loop = true;
        bgm.play();
    } else {
        bgm.pause();
    }
});

// round
var level = [Level1, Level2, Level3, Level4, Level5];
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

class Game {
    constructor(scoreBoard, player, monsters) {
        this.scoreBoard = scoreBoard;
        this.player = player;
        this.monsters = monsters;
        this.loseText = Lose[Math.floor(Math.random() * Lose.length)];
        this.winText = Win[Math.floor(Math.random() * Win.length)];
    }
    MainSplash() {
        ctx.strokeStyle = "lightblue";
        ctx.lineWidth = 5;
        ctx.strokeRect(mapWidth/10, mapHeight/10, mapWidth-(mapWidth/10)*2, mapHeight-(mapHeight/10)*2);
        let centerX = (mapWidth-(mapWidth/10))/2;
        let centerY = (mapHeight-(mapHeight/10))/2+55;
        ctx.drawImage(spider, 0, 0, 42, 32, centerX, centerY, 42, 32); 
        ctx.drawImage(numbers, 80, 26, 20, 26, centerX+50, centerY, 20, 26);  
        ctx.drawImage(numbers, 
            this.scoreBoard.numPosition[Math.floor(this.scoreBoard.killPoint/10)][0],
            this.scoreBoard.numPosition[Math.floor(this.scoreBoard.killPoint/10)][1],
            20,
            26,
            centerX+80,
            centerY,
            20,
            26
        );  
        ctx.drawImage(numbers, 
            this.scoreBoard.numPosition[Math.floor(this.scoreBoard.killPoint%10)][0],
            this.scoreBoard.numPosition[Math.floor(this.scoreBoard.killPoint%10)][1],
            20,
            26,
            centerX+110,
            centerY,
            20,
            26
        );  
    }
    PlayerDeathSplash() {
        ctx.fillStyle = "rgba(255, 0, 0, .6)";
        ctx.fillRect(0, 0, mapWidth, mapHeight);
        let centerX = mapWidth/2;
        let centerY = (mapHeight-(mapHeight/10))/2;
        ctx.textAlign = "center";
        ctx.fillStyle = "lightblue";
        ctx.font = "bold 36px gothic";
        ctx.fillText("실패!", centerX, centerY-75);
        ctx.fillStyle = "red";
        ctx.fillText(this.loseText, centerX, centerY);
        this.MainSplash();    
    }
    MonsterAllDeathSplash() {
        ctx.fillStyle = "rgba(255, 255, 255, .6)";
        ctx.fillRect(0, 0, mapWidth, mapHeight);
        let centerX = mapWidth/2;
        let centerY = (mapHeight-(mapHeight/10))/2;
        ctx.textAlign = "center";
        ctx.fillStyle = "lightblue";
        ctx.font = "bold 36px gorhic";
        ctx.fillText("성공!", centerX, centerY-75);
        ctx.fillStyle = "blue";
        ctx.fillText(this.winText, centerX, centerY);
        this.MainSplash();    
    }
    GameStateCheck() {
        if (this.player.isDeath == true) {
            this.PlayerDeathSplash();
        }
        if (this.monsters.length == 0) {
            this.MonsterAllDeathSplash();
        }
    }
    reloadRound() {
        game.scoreBoard.killPoint = 0;
        loadRound();
    }
    nextRound() {
        if (game.monsters.length == 0) {
            _level += 1;
            if (level[_level] == undefined) {
                _level = 0;
            }
            loadRound();
        }
    }
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
        if (hero.isDown == false && hero.gravity < -19)
            jumpAudio.play();
    }
    if (multikey['a']) {
        hero.move(-1);
    } 
    if (multikey['d']) {
        hero.move(1);
    }
}

function drawName() {
    ctx.textAlign = "center";
    ctx.fillStyle = "black";
    ctx.font = "12px gothic";
    ctx.fillText(userName, game.player.x+game.player.width/2, game.player.y-6);
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
        mst.collideByHero(game);
    });
    game.scoreBoard.drawScore(ctx, spider, numbers, mapWidth);
    game.player.execGravity();
    game.player.mapCollision();
    game.player.collisionGrass(levelObj);
    
    drawName();
    keyAction();
    game.GameStateCheck();

    if (game.player.direction == -1) {
        ctx.scale(-1, 1);
        ctx.drawImage(heroSprite, 
            game.player.scene*game.player.width, 
            0, 
            game.player.width, 
            game.player.height, 
            -game.player.x - game.player.width, 
            game.player.y, 
            game.player.width, 
            game.player.height
        );
        ctx.scale(-1, 1);
    } else {
        ctx.drawImage(heroSprite, 
            game.player.scene*game.player.width, 
            0, 
            game.player.width, 
            game.player.height, 
            game.player.x, 
            game.player.y, 
            game.player.width, 
            game.player.height
        );
    }
}

scoreBoard = new ScoreBoard();

function loadRound() {
    round = level[_level];
    levelObj = round['grass'];
    heroObj = round['hero'];
    decorationObj = round['decor'];
    monsterObj = round['monsters'];

    hero = new Hero(...heroObj);
    monsters = [];
    monsterObj.forEach((mst) => { monsters.push(new Monster(...mst)); });
    game = new Game(scoreBoard, hero, monsters);
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
    game.player.stop();
    delete multikey[e.key];
}, false);

window.addEventListener('resize', (e) => {
    mapWidth = window.innerWidth;
    canvas.width = window.innerWidth;
    mapHeight = window.innerHeight;
    canvas.height = window.innerHeight;
}, false);