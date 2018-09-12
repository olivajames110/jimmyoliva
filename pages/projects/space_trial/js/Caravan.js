var OregonH = OregonH || {};

OregonH.Caravan = {};

OregonH.Caravan.init = function(stats){
 this.day = stats.day;
 this.distance = stats.distance;
 this.crew = stats.crew;
 this.food = stats.food;
 this.oxen = stats.oxen;
 this.money = stats.money;
 this.firepower= stats.firepower;
};

// Update weight and capacity
OregonH.Caravan.updateWeight = function() {
 var droppedFood = 0;
 var droppedGuns = 0;

 // How much the caravan can carry
 this.capacity = (this.oxen * OregonH.weightPerOx) + (this.crew + OregonH.weightPerPerson);

 // How much weight we currently have
 this.weight = (this.food * OregonH.foodWeight) + (this.firepower + OregonH.firepowerWeight);

 // Drop things if its too much weight (assume guns get dropped before food)
 while(this.firepower && this.capacity <= this.weight) {
  this.firepower--;
  this.weight -= OregonH.foodWeight;
  droppedGuns++;
 }

 if(droppedGuns) {
  this.ui.notify("Left " + droppedFood + " food previsions behind" , "negative");
 }
};

// Update covered distance
OregonH.Caravan.updateDistance = function() {
 // The closer the capacity, the slower you are
 var diff = this.capacity - this.weight;
 var speed = OregonH.slowSpeed + (diff / this.capacity) * OregonH.fullSpeed;
 this.distance += speed;
};

// Food consumption
OregonH.Caravan.consumeFood = function() {
 this.food -= this.crew * OregonH.foodPerPerson;

 if (this.food < 0) {
  this.food = 0;
 }
};