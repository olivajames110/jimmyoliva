var fcanvas = document.getElementById("flappy-canvas");
var fctx = fcanvas.getContext("2d");
var parentContainer = document.getElementById("parent").offsetWidth;
fcanvas.width = parentContainer;
// fcanvas.width = window.innerWidth;

//load images
var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

bird.src = "images/rocket.png";
console.log(bird);
bg.src = "images/bgBig.png";
// bg.style.backgroundRepeat = "repeat"

// fg.src = 'images/fg.png';
pipeNorth.src = "images/cometNorth.png";
pipeSouth.src = "images/cometSouth.png";

var currentPage = document.getElementById("#modal");
// if(currentPage === ' ') {
//  bird.src = 'images/rocket.png';
// bg.src = 'images/stars.png';
// // fg.src = 'images/fg.png';
// pipeNorth.src = 'images/cometNorth.png';
// pipeSouth.src = 'images/cometSouth.png';
// }

document.body.addEventListener("keydown", function(e) {
  console.log(e);
  keys[e.keyCode] = true;
});
document.body.addEventListener("keyup", function(e) {
  keys[e.keyCode] = false;
});

//pipe coordinates
var pipe = [];
pipe[0] = {
  x: fcanvas.width,
  y: 0
};

//draw images
var bX = 10;
var bY = 150;
var gap = 85;
var gravity = 1;

// http://jsfiddle.net/dMYvG/1591/
var velY = 0,
  velX = 0,
  speed = 2,
  friction = 0.95,
  keys = [];

function draw() {
  if (keys[38]) {
    if (velY > -speed) {
      velY--;
    }
  }

  if (keys[40]) {
    if (velY < speed) {
      velY++;
    }
  }
  if (keys[39]) {
    if (velX < speed) {
      velX++;
    }
  }
  if (keys[37]) {
    if (velX > -speed) {
      velX--;
    }
  }

  velY *= friction;
  bY += velY;
  velX *= friction;
  bX += velX;

  //prevent flappy from moving outside the canvas
  var offset = 30;

  if (bX >= fcanvas.width - offset) {
    bX = fcanvas.width - offset;
  } else if (bX <= 5) {
    bX = 5;
  }
  if (bY > fcanvas.height - offset) {
    bY = fcanvas.height - offset;
  } else if (bY <= 5) {
    bY = 5;
  }

  var constant = pipeNorth.height + gap;
  fctx.drawImage(bg, 0, 0);

  for (var i = 0; i < pipe.length; i++) {
    fctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
    fctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);
    pipe[i].x--;

    if (pipe[i].x == 500) {
      pipe.push({
        x: fcanvas.width,
        y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
      });
    }

    // if(bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY + bird.height >= pipe[i].y + constant) ) {
    //  // location.reload();
    //  console.log('hit')
    // }
  }

  fctx.drawImage(fg, 0, fcanvas.height - fg.height);

  fctx.drawImage(bird, bX, bY);
  bY += gravity;

  requestAnimationFrame(draw);
}

draw();
