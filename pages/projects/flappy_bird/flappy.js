var fcanvas = document.getElementById('flappy-canvas');
var fctx = fcanvas.getContext('2d');
var parentContainer = document.getElementById("parent").offsetWidth;
fcanvas.width = parentContainer;
// fcanvas.width = window.innerWidth;

//load images
var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

bird.src = 'images/rocket.png';
bg.src = 'images/bgBig.png';
// bg.style.backgroundRepeat = "repeat"

// fg.src = 'images/fg.png';
pipeNorth.src = 'images/cometNorth.png';
pipeSouth.src = 'images/cometSouth.png';


var currentPage = document.getElementById('#modal');
// if(currentPage === ' ') {
//  bird.src = 'images/rocket.png';
// bg.src = 'images/stars.png';
// // fg.src = 'images/fg.png';
// pipeNorth.src = 'images/cometNorth.png';
// pipeSouth.src = 'images/cometSouth.png';
// }

window.addEventListener("keydown", function(e) {
 // space and arrow keys
 if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
     e.preventDefault();
 }
}, false);
document.onkeydown = checkKey;

function checkKey(e) {
 console.log(e)
    e = e || window.event;

    if (e.keyCode == '38') {
     bY -= 10;
    }
    else if (e.keyCode == '40') {
        // down arrow
        bY += 10;
    }
    else if (e.keyCode == '37') {
       // left arrow
       bX -= 10;
    }
    else if (e.keyCode == '39') {
       // right arrow
       bX += 10;
    }

}



//pipe coordinates
var pipe = [];
pipe[0] = {
 x: fcanvas.width,
 y: 0
}


//draww images
var bX = 10;
var bY = 150;
var gap = 85;
var gravity = 0;

function draw() {
 var constant = pipeNorth.height + gap;
 fctx.drawImage(bg , 0 , 0);

 for (var i = 0; i < pipe.length; i++) {
  fctx.drawImage(pipeNorth, pipe[i].x , pipe[i].y);
  fctx.drawImage(pipeSouth, pipe[i].x ,  pipe[i].y + constant);
  pipe[i].x--;

  if(pipe[i].x == 500){
   pipe.push({
    x: fcanvas.width,
    y: Math.floor(Math.random()*pipeNorth.height) - pipeNorth.height
   })
  }

  // if(bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY + bird.height >= pipe[i].y + constant) ) {
  //  // location.reload();
  //  console.log('hit')
  // }


 }

 fctx.drawImage(fg , 0 , fcanvas.height - fg.height);
 fctx.drawImage(bird,bX,bY);
 bY += gravity;
 requestAnimationFrame(draw)
}

draw();
