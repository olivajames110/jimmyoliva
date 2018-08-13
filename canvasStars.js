
var starCanvas = document.getElementById('stars')
starCanvas.width = window.innerWidth;
starCanvas.height = window.innerHeight;
var sc = starCanvas.getContext('2d');


var sx = 150;
var sy = 200;
var sr = 30;
var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;





//DRAWS CUSTOM CONSTELLATION
var starSize = 8;
var starCenter = starSize/2;
var customStars = [];

var isCleared = false;
var drawBtn = document.getElementById("star-btn-draw");
drawBtn.addEventListener('click' , function() {
  window.addEventListener('click' , function(e){
    
    if (!isCleared) {  var xLocation = e.clientX;
      var yLocation = e.clientY;
      
      function NewStar(xLocation, yLocation, starSize) {
       this.xLocation = xLocation;
       this.yLocation = yLocation;
       this.starSize = starSize;
      
       this.drawRect = () => {
        sc.fillStyle = 'white';
        sc.fillRect(xLocation , yLocation , starSize,starSize);
        if (customStars.length === 0) {
         sc.beginPath(); 
         sc.moveTo(xLocation  + (starSize/2), yLocation  + (starSize/2));
         sc.strokeStyle = 'white';
         sc.stroke();
        } else {
         sc.lineTo(xLocation  + (starSize/2), yLocation  + (starSize/2));  
         sc.strokeStyle = 'white';
         sc.stroke();
        }
       }
       this.drawRect();
      }
      
      customStars.push(new NewStar(xLocation,yLocation,starSize));
      console.log(customStars)
     } else {
      isCleared = false;
     }
    })
})


// CLEARS THE ENTIRE CANVAS
var button = document.getElementById('contact');
button.addEventListener('click' , function(e){
 e.preventDefault();
 sc.clearRect(0,0, innerWidth , innerHeight);
 customStars = [];
 isCleared = true;
})


// DRAWS BIG DIPPER
var bigDipBtn = document.getElementById("star-btn-big");
bigDipBtn.addEventListener('click', function() {
  var ranWidth = Math.floor(Math.random() * (innerWidth - 400) + 400)
  var ranHeight = Math.floor(Math.random() * (innerHeight - 400) + 300)
  vons

  var bigDipStars = {
   s1: {
    x:ranWidth - 50,
    y:(ranHeight) - 50 
   },
   s2: {
    x:ranWidth - 100,
    y:(ranHeight) + 80 
   },
   s3: {
    x:ranWidth - 315,
    y:(ranHeight) + 40 
   },
   s4: {
    x:ranWidth - 300,
    y:(ranHeight) - 100 
   },
   s5: {
    x:ranWidth - 400,
    y:(ranHeight) - 150 
   },
   s6: {
    x:ranWidth - 500,
    y:(ranHeight) - 200 
   },
   s7: {
    x:ranWidth - 600,
    y:(ranHeight) - 215
   },
  }
  
  sc.fillStyle = 'white';
  sc.fillRect(bigDipStars.s1.x , bigDipStars.s1.y , starSize,starSize);
  sc.fillRect(bigDipStars.s2.x , bigDipStars.s2.y , starSize,starSize);
  sc.fillRect(bigDipStars.s3.x , bigDipStars.s3.y , starSize,starSize);
  sc.fillRect(bigDipStars.s4.x , bigDipStars.s4.y , starSize,starSize);
  sc.fillRect(bigDipStars.s5.x , bigDipStars.s5.y , starSize,starSize);
  sc.fillRect(bigDipStars.s6.x , bigDipStars.s6.y , starSize,starSize);
  sc.fillRect(bigDipStars.s7.x , bigDipStars.s7.y , starSize,starSize);
  sc.beginPath(); 
  sc.moveTo(bigDipStars.s4.x + (starSize/2) , bigDipStars.s4.y +(starSize/2));
  sc.lineTo(bigDipStars.s1.x +(starSize/2) , bigDipStars.s1.y +(starSize/2));
  sc.lineTo(bigDipStars.s2.x+(starSize/2) , bigDipStars.s2.y+(starSize/2));
  sc.lineTo(bigDipStars.s3.x+(starSize/2) , bigDipStars.s3.y+(starSize/2));
  sc.lineTo(bigDipStars.s4.x+(starSize/2) , bigDipStars.s4.y+(starSize/2));
  sc.lineTo(bigDipStars.s5.x+(starSize/2) , bigDipStars.s5.y+(starSize/2));
  sc.lineTo(bigDipStars.s6.x+(starSize/2) , bigDipStars.s6.y+(starSize/2));
  sc.lineTo(bigDipStars.s7.x+(starSize/2) , bigDipStars.s7.y+(starSize/2));
  sc.strokeStyle = 'white';
  sc.stroke();
  console.log("Width: " + innerWidth)
  console.log("Height: " + innerHeight)
  console.log("Star 2 X: " + bigDipStars.s2.x);
  console.log("Star 3 Y: " + bigDipStars.s3.y);
  console.log("Star 3 X: " + bigDipStars.s7.x);
  console.log("Star 3 Y: " + bigDipStars.s7.y);
})


// DRAWS ORIAN
var orianBtn = document.getElementById("star-btn-or");
orianBtn.addEventListener('click', function() {
  var ranWidth = Math.floor(Math.random() * (innerWidth - 400) + 400)
  var ranHeight = Math.floor(Math.random() * (innerHeight - 400) + 300)
  var orianStars = {
   s1: {
    x:ranWidth - 50,
    y:(ranHeight) + 50 
   },
   s2: {
    x:ranWidth - 200,
    y:(ranHeight) + 80 
   },
   s3: {
    x:ranWidth - 350,
    y:(ranHeight) + 100 
   }
  }
  
  sc.fillStyle = 'white';
  sc.fillRect(orianStars.s1.x , orianStars.s1.y , starSize,starSize);
  sc.fillRect(orianStars.s2.x , orianStars.s2.y , starSize,starSize);
  sc.fillRect(orianStars.s3.x , orianStars.s3.y , starSize,starSize);
  sc.beginPath(); 
  sc.moveTo(orianStars.s1.x + (starSize/2) , orianStars.s1.y +(starSize/2));
  sc.lineTo(orianStars.s2.x+(starSize/2) , orianStars.s2.y+(starSize/2));
  sc.lineTo(orianStars.s3.x+(starSize/2) , orianStars.s3.y+(starSize/2));
  sc.strokeStyle = 'white';
  sc.stroke();
  console.log("Width: " + innerWidth)
  console.log("Height: " + innerHeight)
  console.log("Star 2 X: " + orianStars.s2.x);
  console.log("Star 3 Y: " + orianStars.s3.y);
  console.log("Star 3 X: " + orianStars.s7.x);
  console.log("Star 3 Y: " + orianStars.s7.y);
})




 function Firework(sx, sy, tx , ty) {
  this.x = sx;
  this.y = sy; 
  this.sx = sx;
  this.sy = sy;
  this.tx = tx;
  this.ty = ty;
  this.distanceToTarget = calculatedDistance(sx,sy, tx, ty);
  this.distanceTraveled = 0;
  this.coordinates = [];
	this.coordinateCount = 3;
	// populate initial coordinate collection with the current coordinates
	while( this.coordinateCount-- ) {
		this.coordinates.push( [ this.x, this.y ] );
	}
	this.angle = Math.atan2( ty - sy, tx - sx );
	this.speed = 2;
	this.acceleration = 1.05;
	this.brightness = random( 50, 70 );
	// circle target indicator radius
	this.targetRadius = 1;
 }
 
//  sc.fillStyle = 'white';
//  sc.fillRect(bigDipStars.s1.x , bigDipStars.s1.y , starSize,starSize);
//  sc.fillRect(bigDipStars.s2.x , bigDipStars.s2.y , starSize,starSize);
//  sc.fillRect(bigDipStars.s3.x , bigDipStars.s3.y , starSize,starSize);
//  sc.fillRect(bigDipStars.s4.x , bigDipStars.s4.y , starSize,starSize);
//  sc.fillRect(bigDipStars.s5.x , bigDipStars.s5.y , starSize,starSize);
//  sc.fillRect(bigDipStars.s6.x , bigDipStars.s6.y , starSize,starSize);
//  sc.fillRect(bigDipStars.s7.x , bigDipStars.s7.y , starSize,starSize);
//  sc.beginPath(); 
//  sc.moveTo(bigDipStars.s4.x + (starSize/2) , bigDipStars.s4.y +(starSize/2));
//  sc.lineTo(bigDipStars.s1.x +(starSize/2) , bigDipStars.s1.y +(starSize/2));
//  sc.lineTo(bigDipStars.s2.x+(starSize/2) , bigDipStars.s2.y+(starSize/2));
//  sc.lineTo(bigDipStars.s3.x+(starSize/2) , bigDipStars.s3.y+(starSize/2));
//  sc.lineTo(bigDipStars.s4.x+(starSize/2) , bigDipStars.s4.y+(starSize/2));
//  sc.lineTo(bigDipStars.s5.x+(starSize/2) , bigDipStars.s5.y+(starSize/2));
//  sc.lineTo(bigDipStars.s6.x+(starSize/2) , bigDipStars.s6.y+(starSize/2));
//  sc.lineTo(bigDipStars.s7.x+(starSize/2) , bigDipStars.s7.y+(starSize/2));
//  sc.strokeStyle = 'white';
//  sc.stroke();


// sc.beginPath();
// sc.strokeStyle = 'white';
// sc.arc(sx,sy,sr,0, Math.PI * 2, false);

// ss.beginPath();
// // s.moveTo(50,300);
// // s.lineTo(300,100);
// // s.strokeStyle = 'white';
// ss.stroke();


// function makeOrian(sc, stars, starSize, starCenter) {
//   sc.fillStyle = 'white';
//   for(let star of stars) {
//    sc.fillRect(star.x, star.y, starSize, starSize);
//   }
//   sc.beginPath(); 
//   // for(let star of stars) {
//    sc.moveTo(star.x + starCenter, star.y +  starCenter)
//    sc.strokeStyle = 'white';
//    sc.stroke();
//   // }
// }
// makeOrian(sc, stars, starSize, starCenter);
// sc.fillStyle = 'white';
// sc.fillRect(orianStars.s1.x,orianStars.s1.y, starSize,starSize);
// sc.fillRect(orianStars.s2.x,orianStars.s2.y, starSize,starSize)
// sc.fillRect(orianStars.s3.x,orianStars.s3.y, starSize,starSize)
// sc.beginPath(); 
// sc.moveTo(orianStars.s1.x + starCenter, orianStars.s1.y +  starCenter);
// sc.lineTo(orianStars.s2.x + starCenter, orianStars.s2.y + starCenter);
// sc.lineTo(orianStars.s3.x + starCenter, orianStars.s3.y + starCenter);
// sc.strokeStyle = 'white';
// // sc.stroke();

// // Big dipper
// var littleDipStarSize = 6;

// var littleDipStars = {
//   s1: {
//    x:screenWidth - 0,
//    y:(screenHeight/2) - 50 
//   },
//   s2: {
//    x:screenWidth - 100,
//    y:(screenHeight/2) + 80 
//   },
//   s3: {
//    x:screenWidth - 15,
//    y:(screenHeight/2) + 40 
//   },
//   s4: {
//    x:screenWidth - 100,
//    y:(screenHeight/2) - 100 
//   },
//   s5: {
//    x:screenWidth - 200,
//    y:(screenHeight/2) - 150 
//   },
//   s6: {
//    x:screenWidth - 500,
//    y:(screenHeight/2) - 200 
//   },
//   s7: {
//    x:screenWidth - 600,
//    y:(screenHeight/2) - 215
//   },
//  }
 
//  sc.fillStyle = 'white';
//  sc.fillRect(littleDipStars.s1.x , littleDipStars.s1.y , littleDipStarSize,littleDipStarSize);
//  sc.fillRect(littleDipStars.s2.x , littleDipStars.s2.y , littleDipStarSize,littleDipStarSize);
//  sc.fillRect(littleDipStars.s3.x , littleDipStars.s3.y , littleDipStarSize,littleDipStarSize);
//  sc.fillRect(littleDipStars.s4.x , littleDipStars.s4.y , littleDipStarSize,littleDipStarSize);
//  sc.fillRect(littleDipStars.s5.x , littleDipStars.s5.y , littleDipStarSize,littleDipStarSize);
//  sc.fillRect(littleDipStars.s6.x , littleDipStars.s6.y , littleDipStarSize,littleDipStarSize);
//  sc.fillRect(littleDipStars.s7.x , littleDipStars.s7.y , littleDipStarSize,littleDipStarSize);
//  sc.beginPath(); 
//  sc.moveTo(littleDipStars.s4.x + (littleDipStarSize/2) , littleDipStars.s4.y +(littleDipStarSize/2));
//  sc.lineTo(littleDipStars.s1.x +(littleDipStarSize/2) , littleDipStars.s1.y +(littleDipStarSize/2));
//  sc.lineTo(littleDipStars.s2.x+(littleDipStarSize/2) , littleDipStars.s2.y+(littleDipStarSize/2));
//  sc.lineTo(littleDipStars.s3.x+(littleDipStarSize/2) , littleDipStars.s3.y+(littleDipStarSize/2));
//  sc.lineTo(littleDipStars.s4.x+(littleDipStarSize/2) , littleDipStars.s4.y+(littleDipStarSize/2));
//  sc.lineTo(littleDipStars.s5.x+(littleDipStarSize/2) , littleDipStars.s5.y+(littleDipStarSize/2));
//  sc.lineTo(littleDipStars.s6.x+(littleDipStarSize/2) , littleDipStars.s6.y+(littleDipStarSize/2));
//  sc.lineTo(littleDipStars.s7.x+(littleDipStarSize/2) , littleDipStars.s7.y+(littleDipStarSize/2));
//  sc.strokeStyle = 'white';
//  sc.stroke();