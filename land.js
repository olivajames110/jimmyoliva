var landCanvas = document.getElementById('land')
landCanvas.width = window.innerWidth;
landCanvas.height = window.innerHeight;

// Global Variables
var lc = landCanvas.getContext('2d');
var skyColor = "#48BAFF";
var nightColor = "linear-gradient(to right, #16133a,#363D59";
var moonColor = "#D7D7D7";
var craterColor = "#A3A3A3";
var craterOutlineColor = "#656565";
var moonOutlineColor = "1px 1px 20px 10px rgba(255,255,255.4)"
var sunColor = "#DEB841";
var sunOutlineColor = "1px 1px 20px 10px #dea641";
var mobileNum = .5;
var isDay = true;

// Sets the default background color for the canvas

// landCanvas.style.background = skyColor;


// Controls the canvas width when browser is resized
window.addEventListener("resize", function() {
 landCanvas.width = window.innerWidth;
 landCanvas.height = window.innerHeight;
 drawLand();
})


// Controls setting the height of the canvas so that it is full screen
var headerEl = document.querySelector("header");
var headerHeight = headerEl.offsetHeight;
var welcomeCanvas = document.getElementById("welcome");
var canvasHeight =  headerHeight + screenHeight;
var landClass = document.getElementById("land-container");
if (screenWidth > 600) {
 welcomeCanvas.style.marginTop = -headerHeight + "px";
}
welcomeCanvas.style.height = screenHeight + "px";



// Controls the height of the land class
landClass.style.height = screenHeight + "px";


// Controls the buttons increasing and decreasing the mountain sizes
var upBtn = document.getElementById("up-btn");
var downBtn = document.getElementById("down-btn")

upBtn.addEventListener("click" , function(){
 mobileNum += .05;
 lc.clearRect(0,0, innerWidth,innerHeight);
 drawLand();
})

downBtn.addEventListener("click" , function(){
 mobileNum -= .05;
 lc.clearRect(0,0, innerWidth,innerHeight);
 drawLand();
})


// Creates the moon when Turn Off The Lights is clicked
var nightBtn = document.getElementById("night-btn");
nightBtn.addEventListener("click" , function() {
 var sunMoon = document.getElementById("sun-moon");
 if (isDay === true) {
  makeNight();
  drawMoon();
  sunMoon.innerHTML = "Turn On The Lights";
  nightBtn.style.color = "Black";
  nightBtn.style.boxShadow = moonOutlineColor;
  isDay = false;
 } else {
  makeDay();
  drawSun();
  sunMoon.innerHTML = "Turn Off The Lights";
  nightBtn.style.color = "White";
  nightBtn.style.boxShadow = sunOutlineColor;
  isDay = true;
 }
} )

// -------------List of functions-------------

// Makes canvas background color night
function makeNight() {
 // landCanvas.style.background = nightColor;
 landCanvas.className = "land-night";
}


// Makes canvas background daytime
function makeDay() {
 // landCanvas.style.background = skyColor;
 landCanvas.className = "land-day";
}


// Draws the Sun
function drawSun() {
 if (screenWidth > 600) {
  lc.beginPath();
  lc.arc(screenWidth - 150, 150, 90, 0, Math.PI * 2, false);
  lc.fillStyle = "#DEB841";
  lc.fill();
 } else {
  lc.beginPath();
  lc.arc(screenWidth - (150 * mobileNum), (150 * mobileNum), (90 * mobileNum), 0, Math.PI * 2, false);
  lc.fillStyle = "#DEB841";
  lc.fill();
 }
}





// Draws the moon
function drawMoon() {
 lc.beginPath();
 lc.arc(screenWidth - 150, 150, 90, 0, Math.PI * 2, false);
 lc.fillStyle = moonColor;
 lc.fill();
 lc.beginPath();
 lc.fillStyle = craterColor;
 lc.strokeStyle = craterOutlineColor;
 lc.arc(screenWidth - 120, 100, 10, 0, Math.PI * 2, false);
 lc.fill();
 lc.beginPath();
 lc.fillStyle = craterColor;
 lc.strokeStyle = craterOutlineColor;
 lc.arc(screenWidth - 180, 100, 25, 0, Math.PI * 2, false);
 lc.fill();
 lc.beginPath();
 lc.fillStyle = craterColor;
 lc.strokeStyle = craterOutlineColor;
 lc.arc(screenWidth - 170, 180, 15, 0, Math.PI * 2, false);
 lc.fill();
 lc.beginPath();
 lc.fillStyle = craterColor;
 lc.strokeStyle = craterOutlineColor;
 lc.arc(screenWidth - 200, 200, 15, 0, Math.PI * 2, false);
 lc.fill();
 lc.beginPath();
 lc.fillStyle = craterColor;
 lc.strokeStyle = craterOutlineColor;
 lc.arc(screenWidth - 100, 200, 20, 0, Math.PI * 2, false);
 lc.fill();
 lc.fillStyle = craterColor;
 lc.strokeStyle = craterOutlineColor;
 lc.arc(screenWidth - 80, 130, 8, 0, Math.PI * 2, false);
 lc.fill();
}

// Draws the entire landscape
function drawLand() {
var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight; 
var grassGreenColor = "#78B52A";
var sandColor = "#E2CBA2" ;
var dirtColor = "#DDC5A3"; 
var moutainColor = "#B8C1C8";
var moutainStrokeColor = "rgba(255,255,255, .9)";
var dirtHeight = -30;
var grassLocation = dirtHeight;
var grassHieght = -180;
var mountainLocation = screenHeight + grassLocation + grassHieght;


 // Draws left cloud
 lc.beginPath();
 lc.arc(150, 150, 25, 0, Math.PI * 2, false);
 lc.arc(200, 130, 25, 0, Math.PI * 2, false);
 lc.arc(210, 150, 25, 0, Math.PI * 2, false);
 lc.arc(175, 140, 25, 0, Math.PI * 2, false);
 lc.arc(190, 150, 25, 0, Math.PI * 2, false);
 lc.fillStyle = "white";
 lc.fill();


 // Draws right cloud
 lc.beginPath();
 lc.fillStyle = "white";
 lc.moveTo(350 , 100);
 lc.quadraticCurveTo(375 ,150 , 400 , 100 );
 lc.moveTo(390 , 100);
 lc.quadraticCurveTo(400 ,150 , 450 , 100 );
 lc.moveTo(420 , 100);
 lc.quadraticCurveTo(450 ,160 , 500 , 100 );
 lc.moveTo(470 , 100);
 lc.quadraticCurveTo(500,165 , 535 , 100 );
 lc.moveTo(490 , 120);
 lc.quadraticCurveTo(575,120 , 535 , 70 );
 lc.quadraticCurveTo(500,50 , 500 , 70 );
 lc.quadraticCurveTo(470,30 , 450 , 70 );
 lc.quadraticCurveTo(420,35 , 400 , 70 );
 lc.quadraticCurveTo(365,20 , 350 , 70 );
 lc.bezierCurveTo(320,80,330,100,350,100);
 lc.fill();


 // Draws left mountain
 lc.beginPath();
 lc.moveTo((15 * mobileNum),mountainLocation )
 lc.lineTo((150 * mobileNum) , (mountainLocation) - (270 * mobileNum));
 lc.lineTo((300 * mobileNum) , mountainLocation)
 lc.fillStyle = moutainColor ;
 lc.strokeStyle = moutainStrokeColor;
 lc.stroke();
 lc.fill();


 // Draws left mountain cap
 lc.beginPath();
 lc.moveTo((150 * mobileNum) , (mountainLocation - 270 * mobileNum));
 lc.lineTo((170 * mobileNum) , (mountainLocation - 235 * mobileNum));
 lc.lineTo((160 * mobileNum) , (mountainLocation - 225 * mobileNum));
 lc.lineTo((150 * mobileNum) , (mountainLocation - 235 * mobileNum));
 lc.lineTo((140 * mobileNum) , (mountainLocation - 215 * mobileNum));
 lc.lineTo((130 * mobileNum) , (mountainLocation - 230 * mobileNum));
 lc.fillStyle = "white" ;
 lc.strokeStyle = moutainStrokeColor;
 lc.stroke();
 lc.fill();


 // Draws middle mountain
 lc.beginPath();
 lc.moveTo((400 * mobileNum), mountainLocation )
 lc.lineTo((650 * mobileNum) , (mountainLocation) - (370 * mobileNum));
 lc.lineTo((900 * mobileNum) , mountainLocation)
 lc.fillStyle = moutainColor ;
 lc.strokeStyle = moutainStrokeColor;
 lc.stroke();
 lc.fill();


 // Draws middle mountain cap
 lc.beginPath();
 lc.moveTo((650 * mobileNum) , (mountainLocation - 370 * mobileNum));
 lc.lineTo((730 * mobileNum) , (mountainLocation - 250 * mobileNum));
 lc.lineTo((690 * mobileNum) , (mountainLocation - 230 * mobileNum));
 lc.lineTo((680 * mobileNum) , (mountainLocation - 240 * mobileNum));
 lc.lineTo((675 * mobileNum) , (mountainLocation - 220 * mobileNum));
 lc.lineTo((660 * mobileNum) , (mountainLocation - 215 * mobileNum));
 lc.lineTo((655 * mobileNum) , (mountainLocation - 215 * mobileNum));
 lc.lineTo((580 * mobileNum) , (mountainLocation - 250 * mobileNum));
 lc.lineTo((590 * mobileNum) , (mountainLocation - 280 * mobileNum));
 lc.fillStyle = "white" ;
 lc.strokeStyle = moutainStrokeColor;
 lc.stroke();
 lc.fill();


 // Draws grass
 lc.beginPath();
 lc.fillStyle = grassGreenColor;
 lc.fillRect( 0 ,screenHeight + grassLocation, screenWidth, grassHieght);


 
 // lc.fill();

 // lc.lineTo(350 , mountainLocation);
 // lc.quadraticCurveTo(330 , mountainLocation + 20 , 315 , mountainLocation + 80 );
 // lc.quadraticCurveTo(200 , mountainLocation + 150 , 250 , screenHeight);
 // lc.lineTo(150 , screenHeight);
 // lc.quadraticCurveTo(180 , mountainLocation + 120 , 270 , mountainLocation + 80);
 // lc.quadraticCurveTo(300 , mountainLocation + 50 , 330 , mountainLocation);
 // lc.fill();


 // draws dirt
 lc.beginPath();
 lc.fillStyle = dirtColor;
 lc.fillRect( 0 ,screenHeight, screenWidth, dirtHeight);

 // Draws river
 lc.beginPath();
 lc.fillStyle = "#0F5E9C";
 lc.moveTo(330 , mountainLocation);
 lc.lineTo(350 , mountainLocation);
 lc.quadraticCurveTo(380 , mountainLocation + 20 , 300 , mountainLocation + 80 );
 lc.quadraticCurveTo(230 , mountainLocation + 120 , 300 , screenHeight );
 lc.lineTo(235 , screenHeight );
 lc.quadraticCurveTo(230 , mountainLocation + 120 , 280 , screenHeight - 140 );
 lc.quadraticCurveTo(360 , mountainLocation + 20 , 330 , mountainLocation );
 lc.stroke();
 lc.fill();
  
// Draws Sand
 lc.beginPath();
 lc.fillStyle = "#DDC5A3";
 lc.moveTo(screenWidth - 300 , screenHeight)
 lc.quadraticCurveTo(screenWidth - 200  , mountainLocation + 150 , screenWidth - 300 , screenHeight - 95);
 lc.quadraticCurveTo(screenWidth - 420 , mountainLocation + 65 , screenWidth - 158 , screenHeight - 155);
 lc.quadraticCurveTo(screenWidth - 10 , mountainLocation + 60 , screenWidth - 60 , screenHeight - 95);
 lc.quadraticCurveTo(screenWidth - 105 , mountainLocation + 170 , screenWidth - 15 , screenHeight);

 lc.fill();

 // Draws bay
 lc.beginPath();
 lc.fillStyle = "#48b9fe";
 lc.moveTo(screenWidth - 300 , screenHeight)
 lc.quadraticCurveTo(screenWidth - 140  , mountainLocation + 150 , screenWidth - 300 , screenHeight - 100);
 lc.quadraticCurveTo(screenWidth - 400 , mountainLocation + 70 , screenWidth - 150 , screenHeight - 150);
 lc.quadraticCurveTo(screenWidth - 10 , mountainLocation + 70 , screenWidth - 80 , screenHeight - 80);
 lc.quadraticCurveTo(screenWidth - 110 , mountainLocation + 170 , screenWidth - 20 , screenHeight);
 lc.stroke();
 lc.fill();

 // Draws building
 lc.beginPath();
 lc.fillStyle = "#A5A5A5";
 lc.strokeStyle = "black"
 lc.fillRect(screenWidth/2, mountainLocation + 80 , 100, -250)
 lc.stroke();
 lc.fill();

 drawSun();
}


drawLand();
