var OregonH = OregonH || {};

OregonH.UI = {};
// Show notification in the message box
OregonH.UI.notify = function(message , type) {
  
  var modal = document.getElementById("modal");
  if (modal.className === "") {
   document.getElementById("purchased-item-list").innerHTML = '<div class="purchased-item">' + message + +type + '</div>' ;
  }
 document.getElementById("message-line").innerHTML = '<div class="update-' + type + '">Day '+ Math.ceil(this.caravan.day) + ': ' + message+'</div>' + document.getElementById('message-line').innerHTML;
  }




 // refresh visual caravan stats
 OregonH.UI.refreshStats = function() {
   //modify the dom
   document.getElementById('stat-day').innerHTML = Math.ceil(this.caravan.day);
   document.getElementById('stat-distance').innerHTML = Math.floor(this.caravan.distance);
   document.getElementById('stat-crew').innerHTML = this.caravan.crew;
   document.getElementById('stat-spaceShip').innerHTML = this.caravan.spaceShip;
   document.getElementById('stat-food').innerHTML = Math.ceil(this.caravan.food);
   document.getElementById('stat-money').innerHTML = this.caravan.money;
   document.getElementById('stat-firepower').innerHTML = this.caravan.firepower;
   document.getElementById('stat-weight').innerHTML = Math.ceil(this.caravan.weight) + '/' + this.caravan.capacity;
   document.getElementById('rocket-img').style.left = (180 * this.caravan.distance / OregonH.finalDistance) + '%';
 };

 

//show attack
OregonH.UI.showAttack = function(firepower, gold) {
  var attackDiv = document.getElementById('attack');
  attackDiv.classList.remove('hidden');
 
  //keep properties
  this.firepower = firepower;
  this.gold = gold;
 
  //show firepower
  document.getElementById('attack-description').innerHTML = 'Firepower: ' + firepower;
 
  //init once
  if(!this.attackInitiated) {
 
    //fight
    document.getElementById('fight').addEventListener('click', this.fight.bind(this));
 
    //run away
    document.getElementById('runaway').addEventListener('click', this.runaway.bind(this));
 
    this.attackInitiated = true;
  }
};
 
//fight
OregonH.UI.fight = function(){
 
  var firepower = this.firepower;
  var gold = this.gold;
 
  var damage = Math.ceil(Math.max(0, firepower * 2 * Math.random() - this.caravan.firepower));
 
  //check there are survivors
  if(damage < this.caravan.crew) {
    this.caravan.crew -= damage;
    this.caravan.money += gold;
    this.notify(damage + ' people were killed fighting', 'negative');
    this.notify('Found $' + gold, 'gold');
  }
  else {
    this.caravan.crew = 0;
    this.notify('Everybody died in the fight', 'negative');
  }
 
  //resume journey
  document.getElementById('attack').classList.add('hidden');
  this.game.resumeJourney();
};
 
//runing away from enemy
OregonH.UI.runaway = function(){
 
  var firepower = this.firepower;
 
  var damage = Math.ceil(Math.max(0, firepower * Math.random()/2));
 
  //check there are survivors
  if(damage < this.caravan.crew) {
    this.caravan.crew -= damage;
    this.notify(damage + ' people were killed running', 'negative');
  }
  else {
    this.caravan.crew = 0;
    this.notify('Everybody died running away', 'negative');
  }
 
  //remove event listener
  document.getElementById('runaway').removeEventListener('click');
 
  //resume journey
  document.getElementById('attack').classList.add('hidden');
  this.game.resumeJourney();
 
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

 //update weight
 OregonH.UI.caravan.updateWeight();

 //update visuals
 OregonH.UI.refreshStats();
};
