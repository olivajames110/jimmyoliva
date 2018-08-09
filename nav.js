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