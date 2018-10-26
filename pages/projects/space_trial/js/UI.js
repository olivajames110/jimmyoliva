var OregonH = OregonH || {};

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

 var fcanvas = document.getElementById('flappy-canvas');
 var parentContainer = document.getElementById("parent").offsetWidth;
 fcanvas.width = parentContainer;

//show attack
OregonH.UI.showAttack = function(firepower, gold) {
  var attackDiv = document.getElementById('modal-fly');
  attackDiv.classList.remove('hidden');
 
  //keep properties
  this.firepower = firepower;
  this.gold = gold;
 
  //show firepower
  // document.getElementById('attack-description').innerHTML = 'Firepower: ' + firepower;
  
  //init once
  // if(!this.attackInitiated) {
    
    //fight
    // document.getElementById('fight').addEventListener('click', this.fight.bind(this));
    
    //run away
    document.getElementById('runaway').addEventListener('click', this.runaway.bind(this));
    document.getElementById('go').addEventListener('click', this.go.bind(this));
    // var canvasDiv = document.getElementById('parent');
    // canvasDiv.innerHTML = '<canvas id="flappy-canvas" width="300" height="512"></canvas>';
 
    this.attackInitiated = true;
  // }
};
 
//fight
// OregonH.UI.fight = function() {
 
//   // var firepower = this.firepower;
//   // var gold = this.gold;
 
//   // var damage = Math.ceil(Math.max(0, firepower * 2 * Math.random() - this.caravan.firepower));
 
//   // document.getElementById('attack').classList.add('hidden');
//   // var canvasDiv = document.getElementById('parent');
//   // canvasDiv.innerHTML = '<canvas id="flappy-canvas" width="300" height="512"></canvas>';
//   //check there are survivors
//   // if(damage < this.caravan.crew) {
//   //   this.caravan.crew -= damage;
//   //   this.caravan.money += gold;
//   //   this.notify(damage + ' people were killed fighting', 'negative');
//   //   this.notify('Found $' + gold, 'gold');
//   // }
//   // else {
//   //   this.caravan.crew = 0;
//   //   this.notify('Everybody died in the fight', 'negative');
//   // }
 
//   //resume journey
//   // document.getElementById('attack').classList.add('hidden');
//   this.game.resumeJourney();
// };
 
//runing away from enemy
OregonH.UI.go = function(){
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
    
  } else {
    gameResult.style.color = "green"
    gameResult.innerHTML = "You made it successfully and saved 3 days"
  }
  setTimeout(() => {
    document.getElementById('modal-fly').classList.add('hidden');
    gameResult.classList.add('hidden')
    OregonH.Game.resumeJourney();
     console.log('game over');
  }, 1400);
 }
}
  draw();
}

OregonH.UI.runaway = function(){
  //remove event listener
  console.log('close');
  
  var gameResult = document.getElementById('game-result')
  gameResult.classList.remove('hidden')
  gameResult.style.color = "red"
  gameResult.innerHTML = "You avoided the asteroid, add 3 days"
  
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

   //  for(var i=0; i < products.length; i++) { 
   //   product = products[i];
   //   prodsDiv.innerHTML += '<div class="product-item" data-qty="' + product.qty + '" data-item="' + product.item + '" data-price="' + product.price + '">' + product.qty + ' ' + product.item + ' - $' + product.price + '</div>';
   //   }