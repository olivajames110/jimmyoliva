var OregonH = OregonH || {};

OregonH.Event = {};

 
OregonH.Event.eventTypes = [
 {
   type: 'STAT-CHANGE',
   notification: 'negative',
   stat: 'crew',
   value: -3,
   text: 'Food intoxication. Casualties: '
 },
 {
   type: 'STAT-CHANGE',
   notification: 'negative',
   stat: 'crew',
   value: -4,
   text: 'Flu outbreak. Casualties: '
 },
 {
   type: 'STAT-CHANGE',
   notification: 'negative',
   stat: 'food',
   value: -10,
   text: 'Worm infestation. Food lost: '
 },
 {
   type: 'STAT-CHANGE',
   notification: 'negative',
   stat: 'money',
   value: -50,
   text: 'Pick pockets steal $'
 },
 {
   type: 'STAT-CHANGE',
   notification: 'negative',
   stat: 'spaceShip',
   value: -1,
   text: 'Ox flu outbreak. Casualties: '
 },
 {
   type: 'STAT-CHANGE',
   notification: 'positive',
   stat: 'food',
   value: 20,
   text: 'Found wild berries. Food added: '
 },
 {
   type: 'STAT-CHANGE',
   notification: 'positive',
   stat: 'food',
   value: 20,
   text: 'Found wild berries. Food added: '
 },
 {
   type: 'STAT-CHANGE',
   notification: 'positive',
   stat: 'spaceShip',
   value: 1,
   text: 'Found wild spaceShip. New spaceShip: '
 },
 {
  type: 'SHOP',
  notification: 'neutral',
  text: 'You have found a shop',
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
  text: 'You have found a shop',
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
  text: 'Bandits are attacking you'
},
{
  type: 'ATTACK',
  notification: 'negative',
  text: 'Bandits are attacking you'
},
{
  type: 'ATTACK',
  notification: 'negative',
  text: 'Bandits are attacking you'
}

];

OregonH.Event.generateEvent = function() {
 //pick random one
 var eventIndex = Math.floor(Math.random() * this.eventTypes.length);
 var eventData = this.eventTypes[eventIndex];

 // Events that consist in updating a stat
 if(eventData.type == 'STAT-CHANGE') {
  this.statChangeEvent(eventData);
 }
     //shops
  else if(eventData.type == 'SHOP') {
   //pause game
   this.game.pauseJourney();

   //notify user
   this.ui.notify(eventData.text, eventData.notification);

   //prepare event
   this.shopEvent(eventData);
 }

   //attacks
    else if(eventData.type == 'ATTACK') {
      //pause game
      this.game.pauseJourney();
   
      //notify user
      this.ui.notify(eventData.text, eventData.notification);
   
      //prepare event
      this.attackEvent(eventData);
   }
};

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
     img: eventData.products[j].img
   });
 }

 this.ui.showShop(products);
};

//prepare an attack event
OregonH.Event.attackEvent = function(eventData){
 var firepower = Math.round((0.7 + 0.6 * Math.random()) * OregonH.enemyFirepowerAverage);
 var gold = Math.round((0.7 + 0.6 * Math.random()) * OregonH.enemyGoldAverage);

 this.ui.showAttack(firepower, gold);
};


OregonH.Event.addToCart = function() {

}