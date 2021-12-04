import utils, { randomColor, randomIntFromRange } from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

// Objects

var gravity = 1;
var friction = .9;

class Ball {
  constructor(x, y, dx, dy, radius, color) {
    this.x = x
    this.y = y
    this.dx = dx // not much but can be useful if one do also x movement
    this.dy = dy
    this.radius = radius
    this.color = color
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.stroke(); // give it a kind of boundary
    c.closePath()
  }

  update() {

    if (this.y + this.radius > canvas.height){ 
        // once exceed the height it change the sign
        // before draw it already less than the height
        // hence max height
      this.dy = - this.dy * friction}
      // / 1.1 slow too much // / 0.9 cannot slow enough 
      
    else {
      this.dy += gravity;
    }
    this.y += this.dy;

    if (this.x + this.radius > canvas.width || 
        this.x - this.radius < 0){
        this.dx = -this.dx // * friction
        } 
    
    this.x += this.dx

    
    // console.log("dy= this.dy"+" , y="+this.y)
    this.draw();
  }
}

// Implementation
// let objects // not sure it seems the object array is change to just array here
// var ball;
var ballArray = []; // no special array of object actually??
var noOfBalls = 500; // 500;
// var initial_dx = 2;
// var initial_dy = 3;
var ball_radius = 5;
var colorArray = ['red', 'green', 'blue']
// var ball_color = 'red';

function init() {
  // objects = []
  
  ballArray = []; // for resize

  for (var i=0; i < noOfBalls; i++  ){
    var initial_x = randomIntFromRange(0, canvas.width);
    var initial_y = randomIntFromRange(0, canvas.height);
    var initial_dx = randomIntFromRange(-3, 3);
    var initial_dy = randomIntFromRange(3, 20);
    var ball_color = randomColor(colorArray);
    ballArray.push(new Ball(initial_x, initial_y, 
      initial_dx, initial_dy, ball_radius, ball_color));
  }

  //ball = new Ball(canvas.width / 2, 
  //                    canvas.height / 2, 0, 2, 30, 'red')
  // console.log(ball)
  // console.log(ballArray)
  // for (let i = 0; i < 400; i++) {
  //   // objects.push()
  // }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)

  c.fillText('......', mouse.x, mouse.y)

  for (var i=0 ; i < ballArray.length; i++) {
    ballArray[i].update();
  }

  //ball.update();
  // objects.forEach(object => {
  //  object.update()
  // })
}

init()
animate()
