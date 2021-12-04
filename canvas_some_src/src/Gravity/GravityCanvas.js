import { randomIntFromRange, randomColor, distance } from '../utils'

// initial setup
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

// variables
const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

const colors = [
    '#2364AA', 
    '#3DA5D9', 
    '#73BFB8', 
    '#FEC601',
    '#EA7317',
];

var gravity = 1;

var friction = 0.89;

// Event Listeners
addEventListener('mousemove', event => {
    mouse.x = event.clientX
    mouse.y = event.clientY
})

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight

    init();
})

addEventListener('click', function() {
    init();

})


// Objects
function Ball(x, y, dx, dy, radius, color) {
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.radius = radius
    this.color = color

    this.update = () => {
        if (this.y + this.radius + this.dy > canvas.height) {
            // friction
            this.dy = -this.dy * friction;
        } else {
            // adding + 1 to velocity 
            this.dy += gravity;
        }

        if(this.x + this.radius + this.dx > canvas.width 
            || this.x - this.radius <= 0) {
            
            this.dx = -this.dx;

        }
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }

    this.draw = () => {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
        // c.stroke()
        c.closePath()

    }
}

// Implementation
var ball;
var ballArr = [];

function init() {
    ballArr = [];
    for (let i = 0; i < 200; i++) {
        var radius = randomIntFromRange(2, 30);
        var x = randomIntFromRange(radius, canvas.width - radius);
        var y = randomIntFromRange(0, canvas.height - radius);
        var dx = randomIntFromRange(-2, 2);
        var dy = randomIntFromRange(-2, 2);
        var color = randomColor(colors);

        ballArr.push(new Ball(x, y, dx, dy, radius, color));
    }
    console.log(ballArr)
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)

    for(let i = 0; i < ballArr.length; i++) {
        ballArr[i].update();
    }

}

init();
animate();
