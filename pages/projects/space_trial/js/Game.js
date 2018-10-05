var OregonH = OregonH || {};

// Constants
OregonH.weightPerOx = 20;
OregonH.weightPerPerson = 2;
OregonH.foodWeight = 0.6;
OregonH.firepowerWeight = 5;
OregonH.gameSpeed = 800;
OregonH.dayPerStep = .2;
OregonH.foodPerPerson = 0.02;
OregonH.fullSpeed = 5;
OregonH.slowSpeed = 3;
OregonH.finalDistance = 1000;
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
  money: 1000,
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
 this.ui.notify('The journey to the edge of the solar system begins...', 'positive');

 this.step();
};

// Game Loop
OregonH.Game.step = function(timestamp) {

 // Starting, setup the previous time for the first time
 if (!this.previousTime) {
  this.previousTime = timestamp;
  this.updateGame();
 }

   //time difference
  var progress = timestamp - this.previousTime;
 
  //game update
  if(progress >= OregonH.gameSpeed) {
    this.previousTime = timestamp;
    this.updateGame();
  }
  
  //we use "bind" so that we can refer to the context "this" inside of the step method
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
  if(this.caravan.distance >= OregonH.FINAL_DISTANCE) {
    this.ui.notify('You have returned home!', 'positive');
    this.gameActive = false;
    return;
  }
 
  //random events logic will go here..
  //random events
if (Math.random() <= OregonH.eventProbability) {
 this.eventManager.generateEvent();
} 
};
 
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
//init game
OregonH.Game.init();