var SpaceTrail = SpaceTrail || {};
var numOfEvents = 0;
var ratio = 0.015;
var marsIsDiscovered = false;
var asteriodIsDiscovered = false;
var jupiterIsDiscovered = false;
var stationIsDiscovered = false;

// Constants
SpaceTrail.weightPerOx = 20;
SpaceTrail.weightPerPerson = 2;
SpaceTrail.foodWeight = 0.6;
SpaceTrail.firepowerWeight = 5;
SpaceTrail.gameSpeed = 1;
SpaceTrail.dayPerStep = ratio;
SpaceTrail.foodPerPerson = 0.02;
SpaceTrail.fullSpeed = 1;
// SpaceTrail.slowSpeed = 3;
SpaceTrail.finalDistance = 100;
SpaceTrail.eventProbability = 0.15;
SpaceTrail.enemyFirepowerAverage = 5;
SpaceTrail.enemyGoldAverage = 50;

SpaceTrail.Game = {};

// Initiate the game
SpaceTrail.Game.init = function() {
  // Reference the UI
  this.ui = SpaceTrail.UI;

  // Reference the event manager
  this.eventManager = SpaceTrail.Event;

  // Setup the caravan
  this.caravan = SpaceTrail.Caravan;
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
SpaceTrail.Game.startJourney = function() {
  this.gameActive = true;
  this.previousTime = null;
  this.ui.notify(
    "Your journey to the end of the solar system begins...",
    "positive"
  );

  this.step();
};

SpaceTrail.Game.createDiscoveryItem = function(landmark) {
  var discoveryItemsDiv = document.getElementById("discovery-items");
  var newDiv = document.createElement("div");
  newDiv.classList.add("stat-row");
  newDiv.classList.add("discovery-item");
  newDiv.innerHTML = "" + landmark + "";
  discoveryItemsDiv.appendChild(newDiv);
};

// Game Loop
SpaceTrail.Game.step = function(timestamp) {
  // Starting, setup the previous time for the first time
  if (!this.previousTime) {
    this.previousTime = timestamp * 5;
    this.updateGame();
  }

  //time difference
  var progress = timestamp - this.previousTime;

  //game update
  if (progress >= SpaceTrail.gameSpeed) {
    this.previousTime = timestamp;
    this.caravan.updateDistance();
    this.updateGame();
  }

  //we use "bind" so that we can refer to the context "this" inside of the step method
  this.caravan.updateDistance();
  // this.ui.refreshStats();
  if (this.gameActive) window.requestAnimationFrame(this.step.bind(this));
};

//update game stats
SpaceTrail.Game.updateGame = function() {
  //day update
  this.caravan.day += SpaceTrail.dayPerStep;

  //food consumption
  this.caravan.consumeFood();

  //game over no food
  if (this.caravan.food === 0) {
    this.ui.notify("Your crew starved to death", "negative");
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
  if (this.caravan.crew <= 0) {
    this.caravan.crew = 0;
    this.ui.notify("Everyone died", "negative");
    this.gameActive = false;
    return;
  }

  //check win game
  if (this.caravan.distance === 5000) {
    this.ui.notify("You won!", "positive");
    this.gameActive = false;
    return;
  }

  //-----------------------------------------------

  console.log(Math.floor(this.caravan.distance));

  //---SHOW moon DISCOVERY---
  if (
    Math.floor(this.caravan.distance) >= 110 &&
    this.caravan.distance <= 111
  ) {
    this.createDiscoveryItem("The Moon");
  }

  //---SHOW mars DISCOVERY---
  if (
    Math.floor(this.caravan.distance) >= 800 &&
    this.caravan.distance <= 850 &&
    !marsIsDiscovered
  ) {
    marsIsDiscovered = true;
    this.createDiscoveryItem("Mars");
    this.gameActive = false;
    this.ui.showDiscovery("Planet Mars");
  }

  //---SHOW Asteroid Field DISCOVERY---

  if (
    Math.floor(this.caravan.distance) >= 1400 &&
    Math.floor(this.caravan.distance <= 1422) &&
    !asteriodIsDiscovered
  ) {
    // SpaceTrail.UI.showAttack('belt')
    asteriodIsDiscovered = true;
    this.createDiscoveryItem("Asteroid Belt");
    this.ui.showDiscovery("Asteroid Belt");
    this.ui.notify("Carl", "positive");
    this.gameActive = false;
    return;
  }

  //Puts Jupiter on the discovered area
  if (
    Math.floor(this.caravan.distance) >= 2500 &&
    Math.floor(this.caravan.distance <= 2502) &&
    !jupiterIsDiscovered
  ) {
    // SpaceTrail.UI.showAttack('belt')
    jupiterIsDiscovered = true;
    this.createDiscoveryItem("Jupiter");
    return;
  }

  // Shows the space station
  //------------random events------------

  if (
    Math.floor(this.caravan.distance) >= 1900 &&
    Math.floor(this.caravan.distance <= 1910) &&
    !stationIsDiscovered
  ) {
    stationIsDiscovered = true;
    var ranNum = Math.random() * 25;
    numOfEvents++;
    // console.log("Event Triggered: " + ranNum)
    this.eventManager.generateEvent(ranNum);
  }
};

//   var ranNum = Math.random() * 25;
//   if (ranNum <= SpaceTrail.eventProbability) {
//     numOfEvents++;
//     // console.log("Event Triggered: " + ranNum)
//   this.eventManager.generateEvent(ranNum);
// } else {
//       // console.log("No Trigger: " + ranNum)
//     }
//pause the journey
SpaceTrail.Game.pauseJourney = function() {
  this.gameActive = false;
};

//resume the journey
SpaceTrail.Game.resumeJourney = function() {
  this.gameActive = true;
  this.step();
};

var pause = document.getElementById("pause");
document.addEventListener("keypress", function(e) {
  console.log(e);
  if (e.keyCode === 97) {
    SpaceTrail.Game.gameActive = false;
  }
});

// if (SpaceTrail.caravan.distance === 250) {
//   console.log('test');
//  }
//init game
SpaceTrail.Game.init();
