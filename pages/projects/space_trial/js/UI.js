var OregonH = OregonH || {};
var discoveredItems = [];

OregonH.UI = {};
// Show notification in the message box

OregonH.UI.notify = function(message , type) {
  
  var modal = document.getElementById("modal");
  if (modal.className === "") {
   document.getElementById("purchased-item-list").innerHTML = '<div class="purchased-item">' + message +type + '</div>' ;
  }
 document.getElementById("message-line").innerHTML = '<div class="update-' + type + '">Day '+ Math.ceil(this.caravan.day) + ': ' + message+'</div>' + document.getElementById('message-line').innerHTML;
}

// refresh visual caravan stats
OregonH.UI.refreshStats = function() {
  var rocketLocation = ((this.caravan.distance / 50))
  //modify the dom
  document.getElementById('stat-day').innerHTML = Math.ceil(this.caravan.day);
  document.getElementById('stat-distance').innerHTML = Math.floor(this.caravan.distance);
  document.getElementById('stat-crew').innerHTML = this.caravan.crew;
  document.getElementById('stat-spaceShip').innerHTML = this.caravan.spaceShip;
  document.getElementById('stat-food').innerHTML = Math.ceil(this.caravan.food);
  document.getElementById('stat-money').innerHTML = "$" + this.caravan.money;
  document.getElementById('shop-stat-money').innerHTML = "$" + this.caravan.money;
  document.getElementById('stat-firepower').innerHTML = this.caravan.firepower;
  document.getElementById('stat-weight').innerHTML = Math.ceil(this.caravan.weight) + '/' + this.caravan.capacity;
//  document.getElementById('rocket-img').style.left = this.caravan.distance / OregonH.finalDistance) + '%';
  document.getElementById('rocket-img').style.left = rocketLocation + '%';

};

OregonH.UI.createBtns = function() {
  var newGoBtn = document.createElement('button');
  var newLeaveBtn = document.createElement('button');
  var parentBtnDiv = document.querySelector('.control-buttons');
  //creates the buttons
  newGoBtn.setAttribute('id','go'); 
  newLeaveBtn.setAttribute('id','runaway');
  parentBtnDiv.appendChild(newGoBtn);
  parentBtnDiv.appendChild(newLeaveBtn)
}

OregonH.UI.removeBtns = function() {
  var parentBtnDiv = document.querySelector('.control-buttons');
  while(parentBtnDiv.firstChild) {
    parentBtnDiv.removeChild(parentBtnDiv.firstChild);
  }
}

OregonH.UI.showDiscovery = function(landmark) {
  this.landmark = landmark;
  discoveredItems.push("" + landmark + "");

  this.createBtns();

  var modalDiv = document.getElementById('modal-fly');
  var modalHeader = document.getElementById('modal-header');
  var modalBody = document.getElementById('modal-body');
  var goBtn = document.getElementById('go');
  var avoid = document.getElementById('runaway');
  modalDiv.classList.remove('hidden');


  if (landmark === 'Planet Mars'){
    modalHeader.innerText = "You made it to the " + landmark;
    modalBody.innerText = "Choose whether you want to land on the planet Mars or continue traveling."
    goBtn.innerHTML = "Land on Planet Mars | Add +2 Days"
    avoid.innerHTML = "Avoid Stopping"
    // goBtn.addEventListener('click', this.plantFlag.bind(this)); 
    goBtn.addEventListener('click', this.marsGame.bind(this)); 
    avoid.addEventListener('click', this.runaway.bind(this));
  } else if (landmark === 'Asteroid Belt') {
    modalHeader.innerText = "You made it to the landmark " + landmark;
    modalBody.innerText = "You can go around the asteroid field and add 3 days to your journey or take the risk of crashing and go through. Use your arrow keys to control the spaceship"
    goBtn.innerHTML = "Go Through"
    avoid.innerHTML = "Avoid asteroid field | add +3 Days"
    goBtn.removeEventListener('click', this.plantFlag.bind(this));
    goBtn.addEventListener('click', this.go.bind(this));
    avoid.addEventListener('click', this.runaway.bind(this));
  }
};

OregonH.UI.marsGame = function() {
  console.log("Mars THE GAME START");
  this.removeBtns();
  var modalDiv = document.getElementById('modal-fly');
  // Set the background
  var mainRocket = document.getElementById('rocket-img');
  mainRocket.style.opacity = 0;
  var marsImg = document.getElementById('game-result');
  marsImg.classList.add('mars-game-bg');

  //Create the button div container
  var btnDiv = document.createElement('div');
  btnDiv.classList.add('mars-game-btns');
  marsImg.appendChild(btnDiv);

  var btnA = document.createElement('button');
  btnA.setAttribute('id' , 'btn-a');
  var btnB = document.createElement('button');
  btnB.setAttribute('id' , 'btn-b');
  var btnC = document.createElement('button');
  btnC.setAttribute('id' , 'btn-c');
  var btnD = document.createElement('button');
  btnD.setAttribute('id' , 'btn-d');

  //The initial starting text
  // btnA.innerText = 'A) sample test A';
  // btnB.innerText = 'B) sample asdtest B';
  // btnC.innerText = 'C) asd';
  // btnD.innerText = 'D) sample test D';

  btnDiv.appendChild(btnA);
  btnDiv.appendChild(btnB);
  btnDiv.appendChild(btnC);
  btnDiv.appendChild(btnD);
  
  var btnTxt = {
    btnA: 'A) Explore',
    btnB: 'B) Plant Flag',
    btnC: 'C) Take a picture',
    btnD: 'D) Return to space'
  }

  function updateText() {
    btnA.innerHTML = btnTxt.btnA;
    btnB.innerHTML = btnTxt.btnB;
    btnC.innerHTML = btnTxt.btnC;
    btnD.innerHTML = btnTxt.btnD;
  }

  
  function landRocket() {
    var parentDiv = document.getElementById('game-result');
    var newImg = document.createElement('img');
    newImg.classList.add('rocket-img-game');
    newImg.src = 'images/rocket.png';
    parentDiv.appendChild(newImg);
    setTimeout(() => {
      newImg.src = 'images/rocket_land.png';
    },4500);
  }
 

  function launchRocket() {
    var landedRocket = document.querySelector('.rocket-img-game');
    landedRocket.src = 'images/rocket.png'
    landedRocket.classList.remove('rocket-img-game');
    landedRocket.classList.add('rocket-img-game-launch');
    setTimeout(() => {
      landedRocket.style.display = 'none';
    },4000);
  }


  function checkForClick() {
    var allBtns = document.querySelectorAll('.mars-game-btns button')
    allBtns.forEach(btn => btn.addEventListener('click' , buttonClicks));
  
    function buttonClicks(e) {
      console.log(e.target.id);
  
      if(e.target.id === 'btn-a') {
        btnTxt.btnA = 'A) Go to large crater';
        btnTxt.btnB = 'B) Go to north pole';
        btnTxt.btnC = 'C) Go to large valley';
        updateText()
        console.log("a pressed");
      } else if (e.target.id === 'btn-b') {
        console.log("b pressed");
        OregonH.UI.plantFlag('planets' , 'flag');
        OregonH.UI.plantFlag('game-result' , 'game-flag');
      } else if (e.target.id === 'btn-c') {
        console.log("c pressed");
    
      } else if (e.target.id === 'btn-d') {
        console.log("d pressed");
        launchRocket();
        setTimeout(() => {
          modalDiv.classList.add('hidden');
          marsImg.classList.remove('mars-game-bg')
          OregonH.UI.removeChildren('game-result');
          mainRocket.style.opacity = 1;
          OregonH.Game.resumeJourney();
        }, 5400)
      }
    }
  }

  updateText();
  landRocket();
  checkForClick();
}

OregonH.UI.removeChildren = function(parent) {
  this.parent = parent;
  var parentEl = document.getElementById(parent);
  while (parentEl.firstChild) {
    parentEl.removeChild(parentEl.firstChild)
  }
}

OregonH.UI.plantFlag = function(parentClass, divClass, width, x, y){
  this.parentClass = parentClass;
  this.divClass = divClass;
  this.width = width;
  this.x = x;
  this.y = y;
  
  //Add flag to the landmark
  // var modalDiv = document.getElementById('modal-fly');
  var parentDiv = document.getElementById(parentClass);
  var newImg = document.createElement('img');
  newImg.classList.add(divClass);
  newImg.src = 'images/flag2.png';
  parentDiv.appendChild(newImg);
  // this.removeBtns();
  // modalDiv.classList.add('hidden');
  // OregonH.Game.resumeJourney();
};

//creates the Asteroid game
OregonH.UI.go = function(){
  console.log("CLICK THE GAME START");
  this.removeBtns();
  var fcanvas = document.getElementById('flappy-canvas');
  var fctx = fcanvas.getContext('2d');
  var parentContainer = document.getElementById("parent").offsetWidth;
  fcanvas.width = parentContainer;
  fcanvas.classList.remove('hidden');
  // fcanvas.width = window.innerWidth;
  
  //load images
  var bird = new Image();
  var bg = new Image();
  var fg = new Image();
  var pipeNorth = new Image();
  var pipeSouth = new Image();
  var gameOver;
  var madeSafely;
  
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
  bird.src = 'images/rocket.png';
  bg.src = 'images/bgBig.png';
  pipeNorth.src = 'images/cometNorth.png';
  pipeSouth.src = 'images/cometSouth.png';
function draw() {
  var currentPage = document.getElementById('#modal');
  
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
         console.log('down');
         
      }
  
  }
var gravity = 0;


 var constant = pipeNorth.height + gap;
 fctx.drawImage(bg , 0 , 0);

 for (var i = 0; i < pipe.length; i++) {
  fctx.drawImage(pipeNorth, pipe[i].x , pipe[i].y);
  fctx.drawImage(pipeSouth, pipe[i].x ,  pipe[i].y + constant);
  pipe[i].x--;

  //controls how close each column is from each other. The higher the number the closer
  if(pipe[i].x == 500){
   pipe.push({
    x: fcanvas.width,
    y: Math.floor(Math.random()*pipeNorth.height) - pipeNorth.height
   })
  }

  if (pipe.length === 8) {
    OregonH.Caravan.spaceShip += 1;
    madeSafely = true;
    console.log('Made it safely')
    fctx.clearRect(0,0, fcanvas.width, fcanvas.height);
    gameOver = true;
  }

   if(bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY + bird.height >= pipe[i].y + constant) ) {
   // location.reload();
   OregonH.Caravan.spaceShip += 1;
   madeSafely = false;
   console.log('Lost a ship')
   fctx.clearRect(0,0, fcanvas.width, fcanvas.height);
   gameOver = true;
  }
  
 }

 fctx.drawImage(fg , 0 , fcanvas.height - fg.height);
 fctx.drawImage(bird,bX,bY);
 bY += gravity;
 if (!gameOver) {
   requestAnimationFrame(draw)
 } else {
   var gameResult = document.getElementById('game-result')
  fcanvas.classList.add('hidden')
  gameResult.classList.remove('hidden')
  if(!madeSafely) {
    gameResult.style.color = "red"
    gameResult.innerHTML = "You crashed into an asteroid! You lose 1 Space Ship";
    setTimeout(() => {
      document.getElementById('modal-fly').classList.add('hidden');
 
      gameResult.classList.add('hidden')
      OregonH.Game.resumeJourney();
       console.log('game over');
    }, 1850);
    
  } else {
    gameResult.style.color = "green"
    gameResult.innerHTML = "You made it successfully and saved 3 days"
    setTimeout(() => {
      document.getElementById('modal-fly').classList.add('hidden');

      gameResult.classList.add('hidden')
      OregonH.Game.resumeJourney();
       console.log('game over');
    }, 1400);
  }

 }
}
  draw();
}

OregonH.UI.runaway = function(landmark){
  this.landmark = landmark
  this.removeBtns();
  //remove event listener
  console.log('close');
  
  if (marsIsDiscovered) 
  var gameResult = document.getElementById('game-result')
  gameResult.classList.remove('hidden')
  gameResult.style.color = "red"
  gameResult.innerHTML = "You avoided the planet"
  
  setTimeout(() => {
    document.getElementById('modal-fly').classList.add('hidden');
    gameResult.classList.add('hidden')
    OregonH.Game.resumeJourney();
     console.log('game over');
  }, 1400);
 
};

//show shop
OregonH.UI.showShop = function(products){
 
 //get shop area

 var shopDiv = document.getElementById('modal');
 shopDiv.classList.remove('hidden');

 //init the shop just once
 if(!this.shopInitiated) {

   //event delegation
   shopDiv.addEventListener('click', function(e){
     //what was clicked
     var target = e.target || e.src;

     //exit button
     if(target.tagName == 'BUTTON') {
       //resume journey
       shopDiv.classList.add('hidden');
       OregonH.UI.game.resumeJourney();
     }
     else if(target.tagName == 'DIV' && target.className.match(/product/)) {

       OregonH.UI.buyProduct({
         item: target.getAttribute('data-item'),
         qty: target.getAttribute('data-qty'),
         price: target.getAttribute('data-price'),
       });

     }
   });

   this.shopInitiated = true;
 }

 //clear existing content
 var prodsDiv = document.getElementById('prods');
 prodsDiv.innerHTML = '';
 console.log('products', products)
 //show products
 var product;
 for(var i=0; i < products.length; i++) {
   product = products[i];

   prodsDiv.innerHTML += 
   '<div class="product"> <img src="' + product.img + '" width="100" /> <div class="product-item" data-qty="' + product.qty + '" data-item="' + product.item + '" data-price="' + product.price + '">' + product.qty+ ' ' + product.item + ' - $' + product.price + '</div> </div>';

 }
//  for(var i=0; i < products.length; i++) { 
//   product = products[i];
//   prodsDiv.innerHTML += '<div class="product-item" data-qty="' + product.qty + '" data-item="' + product.item + '" data-price="' + product.price + '">' + product.qty + ' ' + product.item + ' - $' + product.price + '</div>';
//   }
};

//buy product
OregonH.UI.buyProduct = function(product) {
  //check we can afford it
  if(product.price > OregonH.UI.caravan.money) {
    OregonH.UI.notify('Not enough money', 'negative');
   return false;
 }
 
 OregonH.UI.caravan.money -= product.price;
 
 OregonH.UI.caravan[product.item] += +product.qty;

 OregonH.UI.notify('Bought ' + product.qty + ' x ' + product.item, 'positive');
 
 OregonH.UI.prodsDiv.classList.add("hidden");
 
 //update weight
 OregonH.UI.caravan.updateWeight();
 
 //update visuals
 OregonH.UI.refreshStats();
};


//show attack
// OregonH.UI.showAttack = function() {
//   var attackDiv = document.getElementById('modal-fly');
//   attackDiv.classList.remove('hidden');
 
  
//     //run away
//     document.getElementById('runaway').addEventListener('click', this.runaway.bind(this));
//     document.getElementById('go').addEventListener('click', this.go.bind(this));
//   // }
// };


   //  for(var i=0; i < products.length; i++) { 
   //   product = products[i];
   //   prodsDiv.innerHTML += '<div class="product-item" data-qty="' + product.qty + '" data-item="' + product.item + '" data-price="' + product.price + '">' + product.qty + ' ' + product.item + ' - $' + product.price + '</div>';
   //   }