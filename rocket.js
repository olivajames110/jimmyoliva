var rocketCanvas = document.getElementById('rocket-canvas')
rocketCanvas.width = window.innerWidth;
rocketCanvas.height = window.innerHeight * 3;

// Global Variables
var rc = rocketCanvas.getContext('2d');
var rcHeight = window.innerHeight * 3;


function rocket(x,y,w,h){
 this.x = x;
 this.y = y;
 this.w = w;
 this.h = h;
 this.xV = xV;
 this.yV = yV;


 this.moveRocket = () => {
  rc.beginPath();
  rc.fillStyle = "red";
  rc.fillRect(this.x,this.y,this.w,this.h);
  rc.fill();
 }

 this.newPosition = () => {
  this.x = this.xV;
  this.y = this.xY;
 }

}

function moveUp() {

}

var myRocket = new Rocket(100,100,100,100);

rocket();