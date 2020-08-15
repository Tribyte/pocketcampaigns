// credit Tiffany Rayside
var canvas = document.getElementById('the_surface_background')
var w = canvas.width = window.innerWidth;
var h = canvas.height = window.innerHeight;
var canvasContext = canvas.getContext("2d");

canvas.style = "position: fixed; right: 0; top: 0; z-index: 0;";

function draw(c1, c2, s, rat, _x, _y) {
    var x = 0, y = 0;
    var col = 0, split = rat / 100;
    while (x <= w) {
        while (y <= h) {
            col = Math.random();
            if (col < split) canvasContext.fillStyle = c1;
            else canvasContext.fillStyle = c2;
            geo(x, y, s);
            y += (s * 1.0) + (_y * 1.0);
        }
        x += (s * 1.0) + (_x * 1.0); y = 0;
    }
}
function geo(x, y, l) {
    canvasContext.save();
    canvasContext.translate(x, y);
    canvasContext.rotate(Math.floor(Math.random() * 4) * (Math.PI / 2));
    canvasContext.shadowColor = 'hsla(0,0%,65%,.5)';
    canvasContext.shadowBlur = Math.random() * 100;
    canvasContext.shadowOffsetX = 1;
    canvasContext.shadowOffsetY = 1;
    canvasContext.beginPath();
    canvasContext.lineTo(l, -l);
    canvasContext.lineTo(l, 0);
    canvasContext.lineTo(0, l);
    canvasContext.lineTo(-l, 0);
    canvasContext.lineTo(-l, -l);
    canvasContext.lineTo(0, 0);
    canvasContext.closePath();
    canvasContext.fill();
    canvasContext.restore();
}
draw('hsla(0,0%,95%,1)', 'hsla(0,0%,90%,1)', 100, 55, 0, 0);

/*.....Resize.......*/
window.addEventListener('resize', function () {
    canvas.width = w = window.innerWidth;
    canvas.height = h = window.innerHeight;
    draw('hsla(0,0%,95%,1)', 'hsla(0,0%,90%,1)', 100, 55, 0, 0);
}, false);