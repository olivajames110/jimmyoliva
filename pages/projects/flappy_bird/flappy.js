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
  var keycodes = [37, 38, 39, 40];
  if (keycodes.includes(e.keyCode)) {
    e.preventDefault();
  }
  keys[e.keyCode] = true;

  if (keys[80]) {
    isPaused = !isPaused;
  }
});
document.body.addEventListener("keyup", function(e) {
  e.preventDefault();
  keys[e.keyCode] = false;
});

//Game State
var isPaused = false,
  //active keys
  keys = [];

//draw images
var bX = 10;
var bY = 150;
var gap = 85;
var gravity = 0;

//pipe coordinates
var pipe = [];
pipe[0] = {
  pipeTop: {
    x: fcanvas.width,
    y: 0
  },
  pipeBottom: {
    x: fcanvas.width,
    y: 0
  },
  x: fcanvas.width
};

// http://jsfiddle.net/dMYvG/1591/
var velY = 0,
  velX = 0,
  speed = 2,
  friction = 0.95;

function draw() {
  // increase velocity on keydown per frame, Velocity is limited by maximum speed
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

  //move up/down per animation frame
  velY *= friction;
  bY += velY;

  //move left/right per animation frame
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

  //draw background
  fctx.drawImage(bg, 0, 0);

  for (var i = 0; i < pipe.length; i++) {
    fctx.drawImage(pipeNorth, pipe[i].pipeTop.x, pipe[i].pipeTop.y);
    fctx.drawImage(
      pipeSouth,
      pipe[i].pipeBottom.x,
      pipe[i].pipeBottom.y + constant
    );
    pipe[i].x--;
    pipe[i].pipeTop.x--;
    pipe[i].pipeBottom.x--;

    if (pipe[i].x == 500) {
      var random =
        Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height;
      pipe.push({
        pipeBottom: {
          x: fcanvas.width,
          y: random
        },
        pipeTop: {
          x: fcanvas.width,
          y: random
        },
        x: fcanvas.width
      });
    }
    // if(bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY + bird.height >= pipe[i].y + constant) ) {
    //  // location.reload();
    //  console.log('hit')
    // }

    var collisionCheck = {
      // check one and two ensure ship is inside the asteriod fields X axis
      one: bX + bird.width >= pipe[i].x,
      two: bX <= pipe[i].x + pipeNorth.width,

      // check if the ship collided with the topmost pipe
      northCollide: bY <= pipe[i].pipeTop.y + pipeNorth.height,

      // check if the ship collided with the bottommost pipe
      southCollide:
        bY + bird.height >= pipe[i].pipeBottom.y + constant &&
        bY <= pipe[i].pipeBottom.y + pipeSouth.height + constant
    };
    //check for collision
    if (
      collisionCheck.one &&
      collisionCheck.two &&
      (collisionCheck.northCollide || collisionCheck.southCollide)
    ) {
      // location.reload();
      // SpaceTrail.Caravan.spaceShip += 1;
      // madeSafely = false;
      console.log("Lost a ship");

      // fctx.clearRect(0, 0, fcanvas.width, fcanvas.height);
      // gameOver = true;
    }
  }

  fctx.drawImage(fg, 0, fcanvas.height - fg.height);

  fctx.drawImage(bird, bX, bY);
  bY += gravity;
}

//start game
function Start() {
  //resume frames if not paused.
  if (!isPaused) {
    draw();
  }
  requestAnimationFrame(Start);
}
Start();
