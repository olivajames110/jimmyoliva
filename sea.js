var seaCanvas = document.getElementById('sea-canvas')
seaCanvas.width = window.innerWidth;
seaCanvas.height = window.innerHeight;
var cc = seaCanvas.getContext('2d');

var fish = document.getElementById("fish");

var boat = document.getElementById("boat");
var boatBtn = document.getElementById("boat-btn");
var imgWidth = 120;

let fishX = 0;
let fishY = 0;



var BoatObj = {
 boatX: 200,
 boatY: 250,
}

var bP = {
 x: 200,
 y: -25,
}

// var boatCont = document.getElementById("boat-cont")
// var captionText = document.createTextNode("sd");
// var captionDiv = document.createElement('div');

// var caption = captionDiv.appendChild(captionText);



window.addEventListener("mousemove" , function() {
 console.log("x: " + event.clientX )
})
// boat.addEventListener("click" , function() {
//  fish.style.top = ++fishY + "%"
// })

var inDock = true;
var lineIsOut = false;

boatBtn.addEventListener("click" , function() {
 if (inDock === true) {
  cc.clearRect(0,0,screenWidth, screenHeight)
  boat.style.top = BoatObj.boatX + "px";
  boat.style.left = BoatObj.boatY + "px";
  bP.x = 220;
  bP.y = 250;
  inDock = false;
  boatBtn.innerHTML = "RETURN FROM FISHING";

 } else {
  boat.style.top = "-25px";
  boat.style.left = "200px";
  bP.x = 200;
  bP.y = -25;
  cc.clearRect(0,0,screenWidth, screenHeight)
  inDock = true;
  boatBtn.innerHTML = "LET'S GO FISHING";
 }
})

//Draws fish line
boat.addEventListener("click" , function() {
 if (lineIsOut === false) {

  cc.beginPath();
  cc.moveTo(bP.x + 100, bP.y);
  cc.fillStyle = "white";
  cc.fillRect(bP.x + 70, bP.y , 2, 500);
  cc.fill();
  lineIsOut = true;
 } else {
  cc.clearRect(0,0,screenWidth, screenHeight)
  lineIsOut = false;
 }
})

