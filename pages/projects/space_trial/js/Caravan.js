var SpaceTrail = SpaceTrail || {};

SpaceTrail.Caravan = {};

SpaceTrail.Caravan.init = function(stats){
 this.day = stats.day;
 this.distance = stats.distance;
 this.crew = stats.crew;
 this.food = stats.food;
 this.spaceShip = stats.spaceShip;
 this.money = stats.money;
 this.firepower= stats.firepower;
};

// Update weight and capacity
SpaceTrail.Caravan.updateWeight = function() { 
 var droppedFood = 0;
 var droppedGuns = 0;

 // How much the caravan can carry
 this.capacity = (this.spaceShip * SpaceTrail.weightPerOx) + (this.crew + SpaceTrail.weightPerPerson);

 // How much weight we currently have
 this.weight = (this.food * SpaceTrail.foodWeight) + (this.firepower + SpaceTrail.firepowerWeight);

 // Drop things if its too much weight (assume guns get dropped before food)
 while(this.firepower && this.capacity <= this.weight) {
  this.firepower--;
  this.weight -= SpaceTrail.foodWeight;
  droppedGuns++;
 }

 if(droppedGuns) {
  this.ui.notify("Left " + droppedFood + " food previsions behind" , "negative");
 }
};

// Update covered distance
SpaceTrail.Caravan.updateDistance = function() {
 // The closer the capacity, the slower you are
 var diff = this.capacity - this.weight;
 var speed =  SpaceTrail.fullSpeed;
 // var speed = SpaceTrail.slowSpeed + (diff / this.capacity) * SpaceTrail.fullSpeed;
 this.distance += speed*.5;
};

// Food consumption
SpaceTrail.Caravan.consumeFood = function() {
 this.food -= (this.crew * SpaceTrail.foodPerPerson) * ratio;

 if (this.food < 0) {
  this.food = 0;
 }
};


