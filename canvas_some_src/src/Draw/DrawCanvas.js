var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

})

window.addEventListener('load', () => {

    // variables
    let painting = false;

    function startPosition(e) {
        painting = true;
        draw(e);
    }

    function finishedPosition() {
        painting = false;
        c.beginPath();
    }

    function draw(e) {
        if (!painting) return;
        c.lineWidth = 5;
        // make line round
        c.lineCap = 'round';

        c.lineTo(e.clientX, e.clientY);
        c.stroke();
        c.beginPath();
        c.moveTo(e.clientX, e.clientY);
    }

    // eventlistener
    canvas.addEventListener('mousedown', startPosition)
    canvas.addEventListener('mouseup', finishedPosition)
    canvas.addEventListener('mousemove', draw)

})
