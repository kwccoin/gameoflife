var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

// c.fillStyle = 'rgba(255, 0, 0, 0.5)';
// // (x, y, width, height)
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = 'rgba(0, 0, 255, 0.5)';
// c.fillRect(400, 100, 100, 100);
// c.fillStyle = 'rgba(0, 255, 0, 0.5)';
// c.fillRect(300, 300, 100, 100);
// c.fillRect(600, 300, 200, 400);


// Line
// c.beginPath();
// // (x, y)
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.lineTo(400, 300);
// c.lineTo(600, 400);

// // color
// c.strokeStyle = '#6ee2bb';
// // call stroke method for line to show
// c.stroke();


// ARC or Circle
// (x, y, radius, startAngle: float, engAngle: float, drawCounterClockwise: Bool (false));

// c.beginPath();
// c.arc(300, 300, 30, 0, Math.PI * 2, false);
// c.strokeStyle = 'purple';
// c.stroke();

// for(let i = 0; i < 110; i++) {
//     var x = Math.random() * window.innerWidth;
//     var y = Math.random() * window.innerHeight;

//     c.beginPath();
//     c.arc(x, y, 30, 0, Math.PI * 2, false);
//     c.strokeStyle = 'purple';
//     c.stroke();
// }

var mouse = {
    x: undefined,
    y: undefined
}

var maxRadius = 40;
var minRadius = 2;

var colorArr = [
    '#F2D7EE',
    '#D3BCC0',
    '#A5668B',
    '#69306D',
    '#0E103D',
]

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y
})

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
})


function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArr[Math.floor(Math.random() * colorArr.length)]

    this.draw = () => {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }

    this.update = () => {
        if( this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
    
        if(this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
    
        this.x += this.dx;
        this.y += this.dy;

        // interactivity
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 
            && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < maxRadius) {
                this.radius +=1;
            }
        } else if (this.radius > minRadius){
            this.radius -= 1;
        }

        this.draw();
    }
}



var circleArr = [];

function init() {

    circleArr = [];
    
    for(let i = 0; i < 2000; i++) {
        var x = Math.random() * (innerWidth - radius * 2) + radius;
        var y = Math.random() * (innerHeight - radius * 2) + radius;
        // velocity
        var dy = (Math.random() - 0.5);
        var dx = (Math.random() - 0.5);
        // a range of 1-4 and not 0-3
        var radius = Math.random() * 3 + 1;

        circleArr.push(new Circle(x, y, dx, dy, radius));
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    for(var i = 0; i < circleArr.length; i++) {
        circleArr[i].update();
    }

}

init();
animate();
