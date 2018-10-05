var mobileMenuBtn = document.getElementById("mobile-menu");
var navClassIsClosed = false;

mobileMenuBtn.addEventListener("click" , function(){
 var navClass = document.querySelector("nav ul");
 
 if (navClassIsClosed) {
  navClass.className = "desktop-nav";
  navClassIsClosed = false;

 } else {
  navClass.className = "mobile-nav";
  navClassIsClosed = true;
 }
})


var starBtn = document.getElementById("add-btn");
var btnIsClosed = true;
starBtn.addEventListener("click" , function() {
 var bigDip = document.querySelector(".const-btns-container #star-btn-big");
 var orian = document.querySelector(".const-btns-container #star-btn-or");
 var draw = document.querySelector(".const-btns-container #star-btn-draw");

if (btnIsClosed) {
 bigDip.style.right = "115px";
 bigDip.style.bottom = "5px";

 orian.style.right = "2px";
 orian.style.bottom = "115px";

 draw.style.right = "100px";
 draw.style.bottom = "100px";
 btnIsClosed = false;
} else {
 bigDip.style.right = "12px";
 bigDip.style.bottom = "12px";

 orian.style.right = "12px";
 orian.style.bottom = "12px";

 draw.style.right = "12px";
 draw.style.bottom = "12px";
 btnIsClosed = true;
}


})
