const canvas = document.getElementById("gameArea");
const ctx = canvas.getContext("2d");

let x = 100;
let y = 100;
let radius = 50;
let speed = 10;

let upPressed = false;
let downPressed = false;
let leftPressed = false;
let rightPressed = false;

function drawGame() {
  requestAnimationFrame(drawGame);
  clearScreen();
  inputs();
  boundryCheck();
  drawGreenBlob();
}

function boundryCheck() {
  //up
  if (y < radius) {
    y = radius;
  }
  //down
  if (y > canvas.height - radius) {
    y = canvas.height - radius;
  }
  //left
  if (x < radius) {
    x = radius;
  }
  //right
  if (x > canvas.width - radius) {
    x = canvas.width - radius;
  }
}

function inputs() {
  if (upPressed) {
    y = y - speed;
  }
  if (downPressed) {
    y = y + speed;
  }
  if (leftPressed) {
    x = x - speed;
  }
  if (rightPressed) {
    x = x + speed;
  }
}

function drawGreenBlob() {
  ctx.fillStyle = "green";
  if (upPressed) {
    ctx.fillStyle = "red";
  }
  if (downPressed) {
    ctx.fillStyle = "blue";
  }
  if (leftPressed) {
    ctx.fillStyle = "yellow";
  }
  if (rightPressed) {
    ctx.fillStyle = "purple";
  }

  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
}

function clearScreen() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

document.body.addEventListener("keydown", keyDown);
document.body.addEventListener("keyup", keyUp);

function keyDown(event) {
  //up
  if (event.keyCode == 38) {
    upPressed = true;
  }

  //down
  if (event.keyCode == 40) {
    downPressed = true;
  }
  //left
  if (event.keyCode == 37) {
    leftPressed = true;
  }

  //right
  if (event.keyCode == 39) {
    rightPressed = true;
  }
}

function keyUp(event) {
  //up
  if (event.keyCode == 38) {
    upPressed = false;
  }

  //down
  if (event.keyCode == 40) {
    downPressed = false;
  }
  //left
  if (event.keyCode == 37) {
    leftPressed = false;
  }

  //right
  if (event.keyCode == 39) {
    rightPressed = false;
  }
}

class Canvas {
  constructor(emplacement, btnEffacer, btnCroix) {
    //btn pour effacer et afficher
    this.btnCroix = document.querySelector(".fermeture")
    this.btnEffacer = document.querySelector(btnEffacer);
    // emplacement du canvas
    this.canvas = document.querySelector(emplacement);
    this.cont = this.canvas.getContext("2d");
    //quelques variables
    this.signer = false;
    this.vide = true
    this.canvas.width = 190;
    this.canvas.height = 120;
    this.cont.lineWidth = 2;
    this.cont.strokeStyle = "#000";

    //les evenements
    //comencer a dessigner
    /*
    
    // see https://stackoverflow.com/questions/58337243/canvas-touch-event-js
    this.canvas.addEventListener("touchstart", this.touchstart.bind(this), false);
    this.canvas.addEventListener("touchmove", this.touchmove.bind(this), false);
    this.canvas.addEventListener("touchend", this.touchend.bind(this), false);
*/

this.canvas.addEventListener("ontouchstart", this.touchstart.bind(this), false);
this.canvas.addEventListener("ontouchmove", this.touchmove.bind(this), false);
this.canvas.addEventListener("ontouchend", this.touchend.bind(this), false);

    this.canvas.addEventListener("mousedown", this.demarrer.bind(this));
    //arreter de dessigner
    this.canvas.addEventListener("mouseup", this.arreter.bind(this));
    //le trece du dessin
    this.canvas.addEventListener("mousemove", this.dessiner.bind(this));
    //effacer le dessin
    this.btnCroix.addEventListener("click", this.effacer.bind(this));
    this.btnEffacer.addEventListener("click", this.effacer.bind(this));
  }
  //les methodes
  touchstart(e) {
    e.preventDefault()
    const touche = e.touches[0]
    this.demarrer(e)
  }

  touchmove(e) {
    e.preventDefault()
    const touche = e.touches[0]
    this.dessiner(e)
  }

  touchend(e) {
    e.preventDefault()
    this.arreter(e)
  }
  demarrer(e) {
    this.signer = true;
    this.vide = false
    this.dessiner(e);
  }

  arreter(e) {
    this.signer = false;
    this.cont.beginPath();
  }

  dessiner(e) {
    if (!this.signer) return;
    this.cont.lineTo(e.offsetX, e.offsetY);
    this.cont.stroke();
    this.cont.beginPath();
    this.cont.moveTo(e.offsetX, e.offsetY);
  }

  effacer() {
    this.cont.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.vide = true
  }
  

drawGame();