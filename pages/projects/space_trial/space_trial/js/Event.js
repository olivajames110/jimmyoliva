var OregonH = OregonH || {};
 var currentFood = OregonH.Caravan.food;
 console.log('OregonH.Caravan.food', OregonH.Caravan.food)
//  var currentFirepower = OregonH.Caravan.food;
//  var currentShips = OregonH.Caravan.food;
//  var currentFood = OregonH.Caravan.food;

OregonH.Event = {};
 
OregonH.Event.eventTypes = [
 {
   type: 'STAT-CHANGE',
   notification: 'negative', 
   stat: 'crew',
   value: -3,
   text: 'Astronauts die from unknown disease. Casualties: '
 },
 {
   type: 'STAT-CHANGE',
   notification: 'negative',
   stat: 'crew',
   value: -4,
   text: 'Unknown disease spreads. Casualties: '
 },
 {
   type: 'STAT-CHANGE',
   notification: 'negative',
   stat: 'food',
   value: -10,
   text: 'Hole appears in Food Cargo area. Food lost: '
 },
 {
   type: 'STAT-CHANGE',
   notification: 'negative',
   stat: 'money',
   value: -50,
   text: 'Space bandits boarded ship and stole $'
 },
 {
   type: 'STAT-CHANGE',
   notification: 'negative',
   stat: 'spaceShip',
   value: -1,
   text: 'Engine failure on Freighter. Space Ships lost: '
 },
 {
   type: 'STAT-CHANGE',
   notification: 'positive',
   stat: 'food',
   value: 20,
   text: 'Found preserved food rations on broken abandoned Space Station. Food added: '
 },
 {
   type: 'STAT-CHANGE',
   notification: 'positive',
   stat: 'food',
   value: 20,
   text: 'Found preserved food rations on abandoned Space Ship. Food added: '
 },
 {
   type: 'STAT-CHANGE',
   notification: 'positive',
   stat: 'spaceShip',
   value: 1,
   text: 'You found a working abandoned Space Ship. New Space Ship: '
 },
 {
  type: 'SHOP',
  notification: 'neutral',
  text: 'You discovered a working abandoned Space Station',
  products: [
    {item: 'Food Ration', qty: 20, price: 50, img: "http://www.ejinsight.com/wp-content/uploads/2017/07/1613381_a70114d8991162e774dd92cbd2d0158d.jpg"},
    {item: 'Space Ship', qty: 1, price: 200, img: "https://qph.fs.quoracdn.net/main-qimg-214082750d3887a39d06992eb6b7d147-c"},
    {item: 'Missle Ammo', qty: 2, price: 50, img: "https://vignette.wikia.nocookie.net/deadspace/images/4/49/Full-plasma_ammo.png/revision/latest?cb=20110204214841"},
    {item: 'Astronauts', qty: 5, price: 80, img: "https://blog.sleepnumber.com/wp-content/uploads/2017/04/90155_Astronaut.jpg"}

  ]
},
{
  type: 'SHOP',
  notification: 'neutral',
  text: 'You discovered a Space Station',
  products: [
    {item: 'Food Ration', qty: 30, price: 50, img: "http://www.ejinsight.com/wp-content/uploads/2017/07/1613381_a70114d8991162e774dd92cbd2d0158d.jpg"},
    {item: 'Space Ship', qty: 1, price: 200, img: "https://qph.fs.quoracdn.net/main-qimg-214082750d3887a39d06992eb6b7d147-c"},
    {item: 'firepower', qty: 2, price: 20, img: "https://vignette.wikia.nocookie.net/deadspace/images/4/49/Full-plasma_ammo.png/revision/latest?cb=20110204214841"},
    {item: 'Astronauts', qty: 10, price: 80, img: "https://blog.sleepnumber.com/wp-content/uploads/2017/04/90155_Astronaut.jpg"}
  ]
},
{
  type: 'SHOP',
  notification: 'neutral',
  text: 'You came across a Space Station',
  products: [
    {item: 'Food Ration', qty: 20, price: 60, img: "http://www.ejinsight.com/wp-content/uploads/2017/07/1613381_a70114d8991162e774dd92cbd2d0158d.jpg"},
    {item: 'Space Ship', qty: 1, price: 300, img: "https://qph.fs.quoracdn.net/main-qimg-214082750d3887a39d06992eb6b7d147-c"},
    {item: 'firepower', qty: 2, price: 80, img: "https://vignette.wikia.nocookie.net/deadspace/images/4/49/Full-plasma_ammo.png/revision/latest?cb=20110204214841"},
    {item: 'Astronauts', qty: 5, price: 60, img: "https://blog.sleepnumber.com/wp-content/uploads/2017/04/90155_Astronaut.jpg"}
	]
},
 {
  type: 'ATTACK',
  notification: 'negative',
  text: 'You are entering an asteroid field. Fly around or go through?'
},
{
  type: 'ATTACK',
  notification: 'negative',
  text: 'You are entering an asteroid field. Fly around or go through?'
},
{
  type: 'ATTACK',
  notification: 'negative',
  text: 'You are entering an asteroid field. Fly around or go through?'
}

];

OregonH.Event.generateEvent = function(ranNum) {
  this.ranNum = ranNum;
 //pick random one
 var eventIndex = Math.floor(Math.random() * this.eventTypes.length);
 var eventData = this.eventTypes[eventIndex];

 // Events that consist in updating a stat

     //shops
  if(eventData.type == 'SHOP' && ranNum > .05) {
   //pause game
   this.game.pauseJourney();

   //notify user
   this.ui.notify(eventData.text, eventData.notification);

   //prepare event
   this.shopEvent(eventData);
 } else if(eventData.type == 'STAT-CHANGE') {
  this.statChangeEvent(eventData);
 }

  //  //attacks
  //   else if(eventData.type == 'ATTACK') {
  //     //pause game
  //     this.game.pauseJourney();
   
  //     //notify user
  //     this.ui.notify(eventData.text, eventData.notification);
   
  //     //prepare event
  //     this.attackEvent(eventData);
  //  }
};

OregonH.Event.visitPlanet = function(ranNum) {
  this.ranNum = ranNum;
  //pick random one
  var eventIndex = Math.floor(Math.random() * this.eventTypes.length);
  var eventData = this.eventTypes[eventIndex];
  this.game.pauseJourney();

  //notify user
  this.ui.notify(eventData.text, eventData.notification);

  //prepare event
  this.shopEvent(eventData);
}

OregonH.Event.statChangeEvent = function(eventData) {
 //Cant have negative quantities
  if(eventData.value + this.caravan[eventData.stat] >=  0) {
    this.caravan[eventData.stat] += eventData.value;
    this.ui.notify(eventData.text + Math.abs(eventData.value), eventData.notification);
  }
}

OregonH.Event.shopEvent = function(eventData) {
  //number of products for sale
  var numProds = Math.ceil(Math.random() * 4);
  var currentFood = Math.ceil(OregonH.Caravan.food);
  var currentSpaceShip = Math.ceil(OregonH.Caravan.spaceShip);
  var currentFirepower = Math.ceil(OregonH.Caravan.firepower);
  var currentCrew = Math.ceil(OregonH.Caravan.crew);
  
  function getCurrent(type) {
    if (type === "food") {
      return currentFood;
    } else if (type === "ammo"){
      return currentFirepower;
    } else if (type === "ship"){
      return currentSpaceShip;
    } else if (type === "crew"){
      return currentCrew;
    }
  }
 //product list
 var products = [];
 var j, priceFactor;

 for(var i = 0; i < numProds; i++) {
   //random product
   j = Math.floor(Math.random() * eventData.products.length);

   //multiply price by random factor +-30%
   priceFactor = 0.7 + 0.6 * Math.random();

   products.push({
     item: eventData.products[j].item,
     qty: eventData.products[j].qty,
     price: Math.round(eventData.products[j].price * priceFactor),
     img: eventData.products[j].img,
     
   });
 }

 OregonH.UI.refreshStats();
 this.ui.showShop(products);
};

//prepare an attack event
OregonH.Event.attackEvent = function(eventData){
//  var firepower = Math.round((0.7 + 0.6 * Math.random()) * OregonH.enemyFirepowerAverage);
//  var gold = Math.round((0.7 + 0.6 * Math.random()) * OregonH.enemyGoldAverage);

 this.ui.showAttack(firepower, gold);
};


OregonH.Event.addToCart = function() {

}



// type: 'STAT-CHANGE',
// notification: 'negative',
// stat: 'crew',
// value: -3,
// text: 'Astronauts die from unknown David farts. Casualties: '
// },
// {
// type: 'STAT-CHANGE',
// notification: 'negative',
// stat: 'crew',
// value: -4,
// text: 'Davids Unknown disease spreads. Casualties: '
// },
// {
// type: 'STAT-CHANGE',
// notification: 'negative',
// stat: 'food',
// value: -10,
// text: 'Davids gaping hole appears in Food Cargo area. Food lost: '
// },
// {
// type: 'STAT-CHANGE',
// notification: 'negative',
// stat: 'money',
// value: -50,
// text: 'David boarded ship and stole $'
// },
// {
// type: 'STAT-CHANGE',
// notification: 'negative',
// stat: 'spaceShip',
// value: -1,
// text: 'Engine failure on Freighter. Space Ships lost: '
// },
// {
// type: 'STAT-CHANGE',
// notification: 'positive',
// stat: 'food',
// value: 20,
// text: 'Found preserved food rations on broken abandoned Space Station. Food added: '
// },
// {
// type: 'STAT-CHANGE',
// notification: 'positive',
// stat: 'food',
// value: 20,
// text: 'Found preserved food rations on abandoned Space Ship. Food added: '
// },
// {
// type: 'STAT-CHANGE',
// notification: 'positive',
// stat: 'spaceShip',
// value: 1,
// text: 'You found a working abandoned Space Ship. New Space Ship: '
// },
// {
// type: 'SHOP',
// notification: 'neutral',
// text: 'You discovered a working abandoned Space Station',
// products: [
//  {item: 'Food Ration', qty: 20, price: 50, img: "http://www.ejinsight.com/wp-content/uploads/2017/07/1613381_a70114d8991162e774dd92cbd2d0158d.jpg"},
//  {item: 'Space Ship', qty: 1, price: 200, img: "https://qph.fs.quoracdn.net/main-qimg-214082750d3887a39d06992eb6b7d147-c"},
//  {item: 'Missle Ammo', qty: 2, price: 50, img: "https://vignette.wikia.nocookie.net/deadspace/images/4/49/Full-plasma_ammo.png/revision/latest?cb=20110204214841"},
//  {item: 'Astronauts', qty: 5, price: 80, img: "https://blog.sleepnumber.com/wp-content/uploads/2017/04/90155_Astronaut.jpg"}

// ]
// },
// {
// type: 'SHOP',
// notification: 'neutral',
// text: 'You discovered a Space Station',
// products: [
//  {item: 'Food Ration', qty: 30, price: 50, img: "http://www.ejinsight.com/wp-content/uploads/2017/07/1613381_a70114d8991162e774dd92cbd2d0158d.jpg"},
//  {item: 'Space Ship', qty: 1, price: 200, img: "https://qph.fs.quoracdn.net/main-qimg-214082750d3887a39d06992eb6b7d147-c"},
//  {item: 'firepower', qty: 2, price: 20, img: "https://vignette.wikia.nocookie.net/deadspace/images/4/49/Full-plasma_ammo.png/revision/latest?cb=20110204214841"},
//  {item: 'Astronauts', qty: 10, price: 80, img: "https://blog.sleepnumber.com/wp-content/uploads/2017/04/90155_Astronaut.jpg"}
// ]
// },
// {
// type: 'SHOP',
// notification: 'neutral',
// text: 'You came across a Space Station',
// products: [
//  {item: 'Food Ration', qty: 20, price: 60, img: "http://www.ejinsight.com/wp-content/uploads/2017/07/1613381_a70114d8991162e774dd92cbd2d0158d.jpg"},
//  {item: 'Space Ship', qty: 1, price: 300, img: "https://qph.fs.quoracdn.net/main-qimg-214082750d3887a39d06992eb6b7d147-c"},
//  {item: 'firepower', qty: 2, price: 80, img: "https://vignette.wikia.nocookie.net/deadspace/images/4/49/Full-plasma_ammo.png/revision/latest?cb=20110204214841"},
//  {item: 'Astronauts', qty: 5, price: 60, img: "https://blog.sleepnumber.com/wp-content/uploads/2017/04/90155_Astronaut.jpg"}
// ]
// },
// {
// type: 'ATTACK',
// notification: 'negative',
// text: 'Watch out for Davids crack rock. Fly around or go through?'
// },
// {
// type: 'ATTACK',
// notification: 'negative',
// text: 'Watch out for Davids crack rock. Fly around or go through?'
// },
// {
// type: 'ATTACK',
// notification: 'negative',
// text: 'You are entering  a space field. Fly around or go through?'
// }