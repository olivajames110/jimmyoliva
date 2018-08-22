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
let boatX = 200;
let boatY = 250;

// var fishLineX = (((boatX / 100) + .07) * (screenWidth)) + imgWidth;
// var fishLineY = (((boatX / 100) - .07) * (screenWidth)) + imgWidth;



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
  boat.style.top = boatX + "px";
  boat.style.left = boatY + "px";
  inDock = false;
 } else {
  boat.style.top = "-25px";
  boat.style.left = "200px";
  cc.clearRect(0,0,screenWidth, screenHeight)
  inDock = true;
 }
})

//Draws fish line
boat.addEventListener("click" , function() {
 cc.beginPath();
 cc.moveTo(boatX, boatY);
 cc.fillStyle = "white";
 cc.fillRect(boatX + 100, boatY, 2, 500);
 cc.fill();
})

