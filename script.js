const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

var background;
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

}

Hero.prototype.collision = function() {
    if (this.x < 0) {
        this.x = 0;
    }
    if (this.x + this.width > width) {
        this.x = width - this.width;
    }
    if (this.y + this.height > height) {
        this.y = height - this.height;
        this.gravity = 0;
    }
}

Hero.prototype.execGravity = function() {
    this.gravity += this.gravitySpeed;
    this.y += this.gravity;
}

hero = new Hero(0, 0, 0, 36, 42, 5, 0, 0.25, 1);

background = new Image();
background.src = 'assets/background.png';

sprites = new Image();
sprites.src = 'assets/hero.png';
sprites.onload = draw;

function draw() {
    ctx.drawImage(background, 0, 0, background.width, background.height, 0, 0, width, height);

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
    hero.collision();
    hero.execGravity();
    draw();
    requestAnimationFrame(loop);
}

loop();

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'w':
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