const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

var sprites;
var hero;
var pos = 2;

function Hero(scene, x, y, width, height, speed, gravity, gravitySpeed, direction = 0) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.gravity = gravity;
    this.gravitySpeed = gravitySpeed;
    this.direction = direction;
}

Hero.prototype.move = function() {
    if (pos % 10 == 0) {
        this.scene = this.scene++ % 2 + 1;
        pos = 0;
    }
    pos += 2;
}

Hero.prototype.collision = function() {

}

hero = new Hero(0, 0, 0, 36, 42, 10, 0, 0.5, 0);

ctx.fillStyle = 'gray';
ctx.fillRect(0, 0, width, height);

sprites = new Image();
sprites.src = 'assets/hero.png';
sprites.onload = draw;

function draw() {
    ctx.fillStyle = 'gray';
    ctx.fillRect(0, 0, width, height);

    // ctx.beginPath();
    // ctx.translate(0, 100);
    // ctx.translate(0 , 43);
    // ctx.scale(1, 1);
    // ctx.drawImage(sprites, 36, 0, sprites.width, sprites.height, 0, 0, sprites.width, sprites.height);
    // ctx.translate(0, 0);
    // ctx.closePath();

    // ctx.beginPath();
    // ctx.translate(36, 43);
    // ctx.scale(-1, 1);
    // ctx.drawImage(sprites, 36, 0, sprites.width, sprites.height, 0, 0, sprites.width, sprites.height);
    // ctx.translate(0, 0);
    // ctx.closePath();

    if (hero.direction) {
        ctx.scale(-1,1);
    } 
    ctx.drawImage(sprites, 
        hero.scene*hero.width, 
        0, 
        hero.width, 
        hero.height, 
        hero.x - hero.direction*hero.width, 
        0, 
        hero.width, 
        hero.height
    );
}

function loop() {
    draw();
    requestAnimationFrame(loop);
}

loop();

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'w':
            
            break;
        case 'a':
            hero.direction = 1;
            hero.move();
            break;
        case 'd':
            hero.direction = 0;
            hero.move();
            break;
        default:
    }
});

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'w':
            
            break;
        case 'a':
            ctx.scale(-1,1);
            break;
        case 'd':
            
            break;
        default:
    }
});