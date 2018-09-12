var OregonH = OregonH || {};

OregonH.UI = {};

// Show notification in the message box
OregonH.UI.notify = function(message , type) {
 console.log(message + " - " + type);
}

// Refresh visual Caravan stats 
OregonH.UI.refreshStats = function() {
 console.log(this.caravan);
}