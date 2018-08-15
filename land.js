var landCanvas = document.getElementById('land')
landCanvas.width = window.innerWidth;
landCanvas.height = window.innerHeight;
var lc = landCanvas.getContext('2d');
var skyColor = "#48BAFF";
var nightColor = "linear-gradient(90deg, #16133a,#363D59";
var moonColor = "#D7D7D7";
var craterColor = "#A3A3A3";
var craterOutlineColor = "#656565";
var moonOutlineColor = "1px 1px 20px 10px rgba(255,255,255.4)"
var sunColor = "#DEB841";
var sunOutlineColor = "1px 1px 20px 10px #dea641";
 
var mobileNum = .5;

// landCanvas.style.backgroundColor = "#48BAFF";
landCanvas.style.background = skyColor;
var isDay = true;

window.addEventListener("resize", function() {
 landCanvas.width = window.innerWidth;
 landCanvas.height = window.innerHeight;
 drawLand();
})

var headerEl = document.querySelector("header");
var headerHeight = headerEl.offsetHeight;
var welcomeCanvas = document.getElementById("welcome");
var canvasHeight =  headerHeight + screenHeight;
var landClass = document.getElementById("land-container");

if (screenWidth > 600) {
 welcomeCanvas.style.marginTop = -headerHeight + "px";
}
welcomeCanvas.style.height = screenHeight + "px";


landClass.style.height = screenHeight + "px";


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



function makeNight() {
 landCanvas.style.background = nightColor;
}

function makeDay() {
 landCanvas.style.background = skyColor;
}


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

// MOON
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
var dirtColor = "#926429"; 
var moutainColor = "#B8C1C8";
var moutainStrokeColor = "rgba(255,255,255, .9)";
var dirtHeight = -30;
var grassLocation = dirtHeight;
var grassHieght = -180;
var mountainLocation = screenHeight + grassLocation + grassHieght;





drawSun();
drawMoon();

// CLOUDS
lc.beginPath();
lc.arc(150, 150, 25, 0, Math.PI * 2, false);
lc.arc(200, 130, 25, 0, Math.PI * 2, false);
lc.arc(210, 150, 25, 0, Math.PI * 2, false);
lc.arc(175, 140, 25, 0, Math.PI * 2, false);
lc.arc(190, 150, 25, 0, Math.PI * 2, false);
lc.fillStyle = "white";
lc.fill();

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

// lc.quadraticCurveTo(300, 90 , 350 , 100 );
lc.fill();





// MOUTAINS
// LEFT MOUTNAIN
lc.beginPath();
lc.moveTo((15 * mobileNum),mountainLocation )
lc.lineTo((150 * mobileNum) , (mountainLocation) - (270 * mobileNum));
lc.lineTo((300 * mobileNum) , mountainLocation)
lc.fillStyle = moutainColor ;
lc.strokeStyle = moutainStrokeColor;
lc.stroke();
lc.fill();

// LEFT MOUTAIN CAP
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

// MIDDLE MOUTAIN
lc.beginPath();
lc.moveTo((400 * mobileNum), mountainLocation )
lc.lineTo((650 * mobileNum) , (mountainLocation) - (370 * mobileNum));
lc.lineTo((900 * mobileNum) , mountainLocation)
lc.fillStyle = moutainColor ;
lc.strokeStyle = moutainStrokeColor;
lc.stroke();
lc.fill();

// MIDDLE MOUTAIN CAP
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







// GRASS
lc.beginPath();
lc.fillStyle = grassGreenColor;
lc.fillRect( 0 ,screenHeight + grassLocation, screenWidth, grassHieght);

// RIVER
lc.beginPath();
lc.fillStyle = "#0F5E9C";
lc.moveTo(330 , mountainLocation);
lc.lineTo(350 , mountainLocation);
lc.quadraticCurveTo(370 , mountainLocation + 70 , 315 , mountainLocation + 100 );
lc.quadraticCurveTo(270 , mountainLocation + 120 , 250 , screenHeight);
lc.lineTo(150 , screenHeight);
lc.quadraticCurveTo(180 , mountainLocation + 120 , 270 , mountainLocation + 80);
lc.quadraticCurveTo(320 , mountainLocation + 50 , 330 , mountainLocation);
lc.fill();


// DIRT
lc.beginPath();
lc.fillStyle = dirtColor;
lc.fillRect( 0 ,screenHeight, screenWidth, dirtHeight);
 
drawSun();
}


drawLand();
