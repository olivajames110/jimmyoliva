var canvas = document.getElementById('orb')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var s = canvas.getContext('2d');

var maxRadius = 20;
var minRadius = 1;
var numOfCircles = 350;
var mouse = {
  x: undefined,
  y: undefined
};
var colorArray = [
  '#D1D1D1',
  '#BBB8B2',
  '#BFBDC1',
  "#DEB841"
];


window.addEventListener('mousemove', function(e){
  mouse.x = e.x;
  mouse.y = e.y;
})




window.addEventListener('resize', function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  if (window.innerWidth > 400) {
    init();
    drawLand();
  } 

  
})

function Circle(x,y,dx,dy,radius) {
 this.x = x;
 this.y = y;
 this.dx = dx;
 this.dy = dy;
 this.radius = radius;
 this.minRadius = radius;
 this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
//  this.color = "rgb(" + Math.random() * 255 + ", " + Math.random() * 255 + ", " + Math.random() * 255 + ")";
 
//  Draws the Circle
 this.draw = () => {
  
  s.beginPath();
  s.arc(this.x , this.y , this.radius , 0, Math.PI * 2, false);
  s.fillStyle = this.color;
  s.fill();
 }

 this.update = function() {
  if (this.x + this.radius > innerWidth || this.x - this.radius < 0 ) {
   this.dx = -this.dx;
  }
 
  if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
   this.dy = -this.dy;
  }

  this.x += this.dx;
  this.y += this.dy;

  // Interactivity
  if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
    if(this.radius < maxRadius){
      this.radius += 1;
    }

  } else if (this.radius > this.minRadius){
    this.radius -= 1;
  }


  this.draw();
 }

 //End circle function
}

var circleArray= [];
function init(){

    if (window.innerWidth < 400) {
        numOfCircles = 70;
      } else if (window.innerWidth < 600){
        numOfCircles = 100;
      }
circleArray = [];
// Adds new Circle objects to the circleArrray array
for (var i=0; i < numOfCircles; i++) { 
  var radius = Math.random() * 2 + 1;
  var x = Math.random() * (innerWidth - radius * 2) + radius;
  var y = Math.random() * (innerHeight - radius * 2) + radius;
  var dx = (Math.random() - 0.5) * .3;
  var dy = (Math.random() - 0.5) * .5;

  circleArray.push(new Circle(x,y,dx,dy,radius))
}

}





function animate() {
  requestAnimationFrame(animate);
  s.clearRect(0,0, innerWidth , innerHeight);
  for (var i = 0; i < circleArray.length; i++) {
    s.fillStyle = "white";
    var currentCircle = circleArray[i];
    var update = currentCircle.update;
    currentCircle.update();
    
  }
  
}

animate();
 init();
