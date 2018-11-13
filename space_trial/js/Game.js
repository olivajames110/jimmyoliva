var OregonH = OregonH || {};
var numOfEvents = 0;
var ratio = 0.015;
var marsIsDiscovered = false;
var asteriodIsDiscovered = false;
var jupiterIsDiscovered = false;
var stationIsDiscovered = false;


// Constants
OregonH.weightPerOx = 20;
OregonH.weightPerPerson = 2;
OregonH.foodWeight = 0.6;
OregonH.firepowerWeight = 5;
OregonH.gameSpeed = 1;
OregonH.dayPerStep = ratio;
OregonH.foodPerPerson = 0.02;
OregonH.fullSpeed = 1;
// OregonH.slowSpeed = 3;
OregonH.finalDistance = 100;
OregonH.eventProbability = 0.15;
OregonH.enemyFirepowerAverage = 5;
OregonH.enemyGoldAverage = 50;

OregonH.Game = {};

// Initiate the game
OregonH.Game.init = function() {

 // Reference the UI
 this.ui = OregonH.UI;

 // Reference the event manager
 this.eventManager = OregonH.Event;

 // Setup the caravan
 this.caravan = OregonH.Caravan;
 this.caravan.init({
  day: 0,
  distance: 0,
  crew: 30,
  food: 80,
  spaceShip: 2,
  money: 300,
  firepower: 10
 });

 // Pass reference
 this.caravan.ui = this.ui;
 this.caravan.eventManager = this.eventManager;

 this.ui.game = this;
 this.ui.caravan = this.caravan;
 this.ui.eventManager = this.eventManager;

 this.eventManager.game = this;
 this.eventManager.caravan = this.caravan;
 this.eventManager.ui = this.ui;
 
 // START ADVENTURE
 this.startJourney();
};

//start the journey and time starts running
OregonH.Game.startJourney = function() {
 this.gameActive = true;
 this.previousTime = null;
 this.ui.notify('Your journey to the end of the solar system begins...', 'positive');

 this.step();
};

OregonH.Game.createDiscoveryItem = function(landmark) {
  var discoveryItemsDiv = document.getElementById('discovery-items')
  var newDiv = document.createElement('div');
  newDiv.classList.add('stat-row');
  newDiv.classList.add('discovery-item');
  newDiv.innerHTML = '' + landmark + '';
  discoveryItemsDiv.appendChild(newDiv);
}

// Game Loop
OregonH.Game.step = function(timestamp) {

 // Starting, setup the previous time for the first time
 if (!this.previousTime) {
  this.previousTime = timestamp * 5;
  this.updateGame();
 }

 //time difference
  var progress = timestamp - this.previousTime;
 
  //game update
  if(progress >= OregonH.gameSpeed) {
    this.previousTime = timestamp;
    this.caravan.updateDistance();
    this.updateGame();
  }
  
  //we use "bind" so that we can refer to the context "this" inside of the step method
  this.caravan.updateDistance();
  // this.ui.refreshStats();
  if(this.gameActive) window.requestAnimationFrame(this.step.bind(this));
};
 
//update game stats
OregonH.Game.updateGame = function() {
  //day update
  this.caravan.day += OregonH.dayPerStep;
 
  //food consumption
  this.caravan.consumeFood();
  
  //game over no food
  if(this.caravan.food === 0) {
    this.ui.notify('Your crew starved to death', 'negative');
    this.gameActive = false;
    return;
  }
 
  //update weight
  this.caravan.updateWeight();
 
  //update progress
  this.caravan.updateDistance();
 
  //show stats
  this.ui.refreshStats();
 
  
  
  //check if everyone died
  if(this.caravan.crew <= 0) {
    this.caravan.crew = 0;
    this.ui.notify('Everyone died', 'negative');
    this.gameActive = false;
    return;
  }
 
  //check win game
  if(this.caravan.distance === 5000) {
    this.ui.notify('You won!', 'positive');
    this.gameActive = false;
    return;
  }

//-----------------------------------------------

  console.log(Math.floor(this.caravan.distance))
  
  //---SHOW moon DISCOVERY---
  if (Math.floor(this.caravan.distance) >= 110 && (this.caravan.distance) <= 111) {
    this.createDiscoveryItem("The Moon")
  }


  //---SHOW mars DISCOVERY---
  if ((Math.floor(this.caravan.distance) >= 800 && (this.caravan.distance) <= 850) && !marsIsDiscovered) {
    marsIsDiscovered = true;
    this.createDiscoveryItem("Mars")
    this.gameActive = false;
    this.ui.showDiscovery('Planet Mars');
  }
  
  
  //---SHOW Asteroid Field DISCOVERY---

  if(Math.floor(this.caravan.distance) >= 1400 && Math.floor((this.caravan.distance) <= 1422) && !asteriodIsDiscovered) {
    // OregonH.UI.showAttack('belt')
    asteriodIsDiscovered = true;
    this.createDiscoveryItem("Asteroid Belt")
    this.ui.showDiscovery('Asteroid Belt');
    this.ui.notify('Carl', 'positive');
    this.gameActive = false;
    return;
  }

  //Puts Jupiter on the discovered area
  if(Math.floor(this.caravan.distance) >= 2500 && Math.floor((this.caravan.distance) <= 2502)  && !jupiterIsDiscovered) {
    // OregonH.UI.showAttack('belt')
    jupiterIsDiscovered = true;
    this.createDiscoveryItem("Jupiter")
    return;
  }

// Shows the space station
   //------------random events------------
   
   if(Math.floor(this.caravan.distance) >= 1900 && Math.floor((this.caravan.distance) <= 1910)  && !stationIsDiscovered) {
    stationIsDiscovered = true;
    var ranNum = Math.random() * 25;
    numOfEvents++;
    // console.log("Event Triggered: " + ranNum)
    this.eventManager.generateEvent(ranNum);

  };
  }

//   var ranNum = Math.random() * 25;
//   if (ranNum <= OregonH.eventProbability) {
//     numOfEvents++;
//     // console.log("Event Triggered: " + ranNum)
//   this.eventManager.generateEvent(ranNum);
// } else {
//       // console.log("No Trigger: " + ranNum)
//     }
//pause the journey
OregonH.Game.pauseJourney = function() {
  this.gameActive = false;
};

//resume the journey
OregonH.Game.resumeJourney = function() {
  this.gameActive = true;
  this.step();
};
 
 

var pause = document.getElementById('pause');
document.addEventListener('keypress' , function(e) {
  console.log(e)
  if(e.keyCode === 97) {
    OregonH.Game.gameActive = false;
  }
} );

// if (OregonH.caravan.distance === 250) {
//   console.log('test');
//  }
//init game
OregonH.Game.init();