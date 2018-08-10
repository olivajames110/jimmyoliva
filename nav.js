var mobileMenuBtn = document.getElementById("mobile-menu");
var navClassIsClosed = true;

mobileMenuBtn.addEventListener("click" , function(){
 var navClass = document.querySelector("nav ul");
 
 if (navClassIsClosed) {
  navClass.style.display = "inherit";
  navClassIsClosed = false;

 } else {
  navClass.style.display = "none";
  navClassIsClosed = true;
 }

})



var starBtn = document.getElementById("const-btns");
starBtn.addEventListener("click" , function() {
 var bigDipBtn = document.querySelector("#star-btn-big");
 bigDipBtn.style.right = "115p;"
 bigDipBtn.style.bottom = "5px;"
})
