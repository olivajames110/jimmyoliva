var OregonH = OregonH || {};

OregonH.UI = {};

// Show notification in the message box
OregonH.UI.notify = function(message , type) {
 document.getElementById("message-line").innerHTML = '<div class="update-' + type + '">Day '+ Math.ceil(this.caravan.day) + ': ' + message+'</div>' + document.getElementById('message-line').innerHTML;
}


 // refresh visual caravan stats
 OregonH.UI.refreshStats = function() {
   //modify the dom
   document.getElementById('stat-day').innerHTML = Math.ceil(this.caravan.day);
   document.getElementById('stat-distance').innerHTML = Math.floor(this.caravan.distance);
   document.getElementById('stat-crew').innerHTML = this.caravan.crew;
   document.getElementById('stat-oxen').innerHTML = this.caravan.oxen;
   document.getElementById('stat-food').innerHTML = Math.ceil(this.caravan.food);
   document.getElementById('stat-money').innerHTML = this.caravan.money;
   document.getElementById('stat-firepower').innerHTML = this.caravan.firepower;
   document.getElementById('stat-weight').innerHTML = Math.ceil(this.caravan.weight) + '/' + this.caravan.capacity;
  

   document.getElementById('rocket-img').style.left = (180 * this.caravan.distance / OregonH.finalDistance) + '%';
   //update caravan position
   // document.getElementById('caravan').style.left = (380 * this.caravan.distance/OregonH.FINAL_DISTANCE) + 'px';
 };
