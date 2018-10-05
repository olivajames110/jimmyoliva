var toolbarWidth = 175;
var drawingCanvas = document.getElementById('drawing-canvas');
drawingCanvas.width = window.innerWidth - toolbarWidth - 16;
drawingCanvas.height = window.innerHeight;
const ctx = drawingCanvas.getContext('2d')
ctx.strokeStyle = 'black';
ctx.lineJoin = '';
ctx.lineCap = '';
var drawboardContainer = document.querySelector('.drawboard-container');
drawboardContainer.style.gridTemplateColumns = "1fr " + toolbarWidth + 'px' ;


let lineWidth = 200;
let direction = true;
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
var mouseX;
var mouseY;


let currentDrawTip = "circle";
let currentDrawSize = 'pulse';
let currentColor = 'black';
let currentBackground = 'white'
// `hsl(${hue++}, 100% , 50%)`


function draw(e) {
 if (!isDrawing) return;
  console.log(e);
  ctx.strokeStyle = currentColor;
  ctx.beginPath();
  ctx.moveTo(lastX , lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.lineWidth = lineWidth;
  ctx.stroke();
  [lastX , lastY] = [e.offsetX , e.offsetY];
  
  //Gives color
  if (hue >= 360) {
   hue = 0;
 }

 // For pulse
  if(ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
   direction = !direction
  }
 
  if (direction && currentDrawSize === 'pulse') {
   ctx.lineWidth++
   // document.getElementById('current-size-item').innerHTML = ctx.lineWidth;
  } else {
   ctx.lineWidth--
   // document.getElementById('current-size-item').innerHTML = ctx.lineWidth;
  }

 
}


// Drawing functionality
drawingCanvas.addEventListener('mousemove' , draw);
drawingCanvas.addEventListener('mousedown', (e) => {
 isDrawing = true;
 [lastX , lastY] = [e.offsetX , e.offsetY];
});
drawingCanvas.addEventListener('mouseup', () => isDrawing = false);
drawingCanvas.addEventListener('mouseout', () => isDrawing = false);


// Button functionality
var circleTip = document.getElementById('circle-pen-type');
var squareTip = document.getElementById('square-pen-type');
var randomTip = document.getElementById('random-pen-type');
var xsmallDrawSize = document.getElementById('xsmall-draw-type');
var smallDrawSize = document.getElementById('small-draw-type');
var mediumDrawSize = document.getElementById('medium-draw-type');
var largeDrawSize = document.getElementById('large-draw-type');
var pulseDrawSize = document.getElementById('pulse-draw-type');


//// Click changes the drawing tip of the pen
// Changes circle tip to round
circleTip.addEventListener('click' , function(){
 ctx.lineJoin = 'round';
 ctx.lineCap = 'round';
 document.getElementById('current-tip-item').innerHTML = 'Round';
})

// Changes circle tip to square
squareTip.addEventListener('click' , function(){
 ctx.lineJoin = 'square';
 ctx.lineCap = 'square';
 document.getElementById('current-tip-item').innerHTML = 'Square';
})

// Changes circle tip to random
randomTip.addEventListener('click' , function(){
 ctx.lineJoin = 'random';
 ctx.lineCap = 'random';
 document.getElementById('current-tip-item').innerHTML = 'Random';
})





//// Click changes the Drawing Size of the pen
smallDrawSize.addEventListener('click' , function(){
 lineWidth = 1;
 currentDrawSize = 'xsmall';
 document.getElementById('current-size-item').innerHTML = "1";
})

// Changes draw size to 5
smallDrawSize.addEventListener('click' , function(){
 lineWidth = 5;
 currentDrawSize = 'small';
 document.getElementById('current-size-item').innerHTML = "5";
})
// Changes draw size to 10
mediumDrawSize.addEventListener('click' , function(){
 lineWidth = 10;
 currentDrawSize = 'medium';
 document.getElementById('current-size-item').innerHTML = "10"
})
// Changes draw size to 15
largeDrawSize.addEventListener('click' , function(){
 lineWidth = 25;
 currentDrawSize = 'large';
 document.getElementById('current-size-item').innerHTML = "15"
})
// Changes draw size to pulse
pulseDrawSize.addEventListener('click' , function(){
 lineWidth = 0;
 currentDrawSize = 'pulse';
 document.getElementById('current-size-item').innerHTML = "Pulse"
})

//Fuctionality of pressing buttons
// const allNodes = document.querySelectorAll('.drawboard-toolbar .toolbar-button');
// const allNodesArray = Array.from(allNodes);

// Creates nodelist for choosing background style

const bgBtnNodes = document.querySelectorAll('#background-type-options .two-row-grid div');
const bgBtnArray = Array.from(bgBtnNodes);
const drawStyleNodes = document.querySelectorAll('#pen-type-options .two-row-grid div');
const drawStyleArray = Array.from(drawStyleNodes);

function makeBtnActive(button) {
 var parentArray;
 if(button.target.id === 'chalk-bg' || 'white-bg') {
  parentArray = bgBtnArray;
 } else if (button.target.id === 'circle-pen-type' || 'square-pen-type' || 'random-pen-type') {
  parentArray = drawStyleArray;
 }
  parentArray.forEach (button => button.classList.remove('btn-is-active'))
  button.target.classList.add('btn-is-active')
  console.log(button.target.id)
}

//Btn functionality for Drawing Styles
bgBtnArray.forEach (button => button.addEventListener('click' ,  makeBtnActive));
drawStyleArray.forEach (button => button.addEventListener('click' ,  makeBtnActive));


// drawingTipStyleBtn.forEach (button => button.addEventListener('click' ,  makeBtnActive));



////Click changes the colors
var redColor = document.getElementById('red-color');
var blue = document.getElementById('blue-color');
var greem = document.getElementById('green-color');
var rainbow = document.getElementById('rainbow-color');
let colorArrayNode = document.querySelectorAll('#color-type-options .toolbar-button');
let colorArray = Array.from(colorArrayNode);

colorArray.forEach(color => color.addEventListener('click' , function(){
 switch(color) {
  case 'blue': currentColor = "blue"
 }
}))


////Clears the canvas
var clearBtn = document.getElementById('clear-btn');
clearBtn.addEventListener('click' , function(){
 ctx.beginPath();
 ctx.clearRect(0,0, innerWidth , innerHeight);
})



////Changes the background

function changeBgColor(e) {
 if(e.target.id === 'chalk-bg') {
  drawingCanvas.style.background = "url('chalk.jpg')";
  currentColor = "white"
  document.getElementById('current-color-item').innerHTML = "White"
 } else {
  drawingCanvas.style.background = "white";
  currentColor = "black"
  document.getElementById('current-color-item').innerHTML = "Black"
 }
}

var chalkBgBtn = document.getElementById('chalk-bg');
var whiteBgBtn = document.getElementById('white-bg');
chalkBgBtn.addEventListener('click' , changeBgColor);
whiteBgBtn.addEventListener('click' , changeBgColor) 