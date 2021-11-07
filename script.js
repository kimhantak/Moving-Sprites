const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

var sprites;
var hero;

function Hero(x, y, width, height, speed, gravity, gravitySpeed) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.gravity = gravity;
    this.gravitySpeed = gravitySpeed;
}

Hero.prototype.move = function() {
    
}

Hero.prototype.collision = function() {

}

hero = new Hero(0, 0, 36, 42, 10, 0, 0.5);

ctx.fillStyle = 'gray';
ctx.fillRect(0, 0, width, height);

sprites = new Image();
sprites.src = 'assets/hero.png';
sprites.onload = draw;

function draw() {
    ctx.translate(300, 200);
    ctx.scale(1, 1);
    ctx.drawImage(sprites, 36, 0, 36, 42, 0, 0, 36, 42);
    ctx.translate(36, 43);
    ctx.scale(-1, 1);
    ctx.drawImage(sprites, 36, 0, 36, 42, 0, 0, 36, 42);
}

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'w':

            break;
        case 'a':

            break;
        case 'd':

            break;
        default:
    }
});