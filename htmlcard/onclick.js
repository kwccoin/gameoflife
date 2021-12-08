ect.btn {
    stroke:#fff;
    fill:#fff;
    fill-opacity:0;
    stroke-opacity:0;
  }

// 

<div>
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <g>
    <circle ... //your img svg
    <rect class="btn" x="0" y="0" width="10" height="10" onclick="alert('click!')" />
  </g>
</svg>
</div



// --------------

//html: <canvas id="canvas"></canvas>

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Create circle
const circle = new Path2D();
circle.arc(150, 75, 50, 0, 2 * Math.PI);
ctx.fillStyle = 'red';
ctx.fill(circle);

// Listen for mouse moves
canvas.addEventListener('mousemove', function(event) {
  // Check whether point is inside circle
  if (ctx.isPointInPath(circle, event.offsetX, event.offsetY)) {
    ctx.fillStyle = 'green';
  }
  else {
    ctx.fillStyle = 'red';
  }

  // Draw circle
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fill(circle);
});

// ---

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Create ellipse
const ellipse = new Path2D();
ellipse.ellipse(150, 75, 40, 60, Math.PI * .25, 0, 2 * Math.PI);
ctx.lineWidth = 25;
ctx.strokeStyle = 'red';
ctx.fill(ellipse);
ctx.stroke(ellipse);

// Listen for mouse moves
canvas.addEventListener('mousemove', function(event) {
  // Check whether point is inside ellipse's stroke
  if (ctx.isPointInStroke(ellipse, event.offsetX, event.offsetY)) {
    ctx.strokeStyle = 'green';
  }
  else {
    ctx.strokeStyle = 'red';
  }

  // Draw ellipse
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fill(ellipse);
  ctx.stroke(ellipse);
});


// --- css ?? : html {cursor: crosshair;} 


const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const circle = new Path2D();
circle.arc(50, 75, 50, 0, 2 * Math.PI);
ctx.fillStyle = 'red';
ctx.fill(circle);

const circletwo = new Path2D();
circletwo.arc(200, 75, 50, 0, 2 * Math.PI);
ctx.fillStyle = 'red';
ctx.fill(circletwo);

// Listen for mouse moves
canvas.addEventListener('mousemove', function(event) {
  // Check whether point is inside circle
  if (ctx.isPointInPath(circle, event.offsetX, event.offsetY)) {
    ctx.fillStyle = 'green';
    ctx.fill(circle);
  }
  else {
    ctx.fillStyle = 'red';
    ctx.fill(circle);
  }
  
    if (ctx.isPointInPath(circletwo, event.offsetX, event.offsetY)) {
    ctx.fillStyle = 'blue';
    ctx.fill(circletwo);
  }
  else {
    ctx.fillStyle = 'red';
    ctx.fill(circletwo);
  }
  
});

// ---

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
var elementslist = []

const circle = new Path2D();
circle.arc(50, 75, 30, 0, 2 * Math.PI);
ctx.fillStyle = 'red';
ctx.fill(circle);

const circletwo = new Path2D();
circletwo.arc(150, 75, 30, 0, 2 * Math.PI);
ctx.fillStyle = 'red';
ctx.fill(circletwo);

const circlethree = new Path2D();
circlethree.arc(250, 75, 30, 0, 2 * Math.PI);
ctx.fillStyle = 'red';
ctx.fill(circlethree);

elementslist.push(circle,circletwo,circlethree)

document.getElementById("canvas").addEventListener('mousemove', function(event) {
event = event || window.event;
var ctx = document.getElementById("canvas").getContext("2d")

for (var i = window.elementslist.length - 1; i >= 0; i--){  

if (window.elementslist[i] && ctx.isPointInPath(window.elementslist[i], event.offsetX, event.offsetY)) {
document.getElementById("canvas").style.cursor = 'pointer';
    ctx.fillStyle = 'orange';
    ctx.fill(window.elementslist[i]);
return
} else {
document.getElementById("canvas").style.cursor = 'default';
    ctx.fillStyle = 'red';
    for (var d = window.elementslist.length - 1; d >= 0; d--){ 
    ctx.fill(window.elementslist[d]);
    }
}
}  

});

// ---

// canvas.addEventListener('click', function() { }, false);

var elem = document.getElementById('myCanvas'),
    elemLeft = elem.offsetLeft + elem.clientLeft,
    elemTop = elem.offsetTop + elem.clientTop,
    context = elem.getContext('2d'),
    elements = [];

// Add event listener for `click` events.
elem.addEventListener('click', function(event) {
    var x = event.pageX - elemLeft,
        y = event.pageY - elemTop;

    // Collision detection between clicked offset and element.
    elements.forEach(function(element) {
        if (y > element.top && y < element.top + element.height 
            && x > element.left && x < element.left + element.width) {
            alert('clicked an element');
        }
    });

}, false);

// Add element.
elements.push({
    colour: '#05EFFF',
    width: 150,
    height: 100,
    top: 20,
    left: 15
});

// Render elements.
elements.forEach(function(element) {
    context.fillStyle = element.colour;
    context.fillRect(element.left, element.top, element.width, element.height);
});​
