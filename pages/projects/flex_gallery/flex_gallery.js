const flexImg = document.querySelectorAll('.image-panel');

flexImg.forEach(img => img.addEventListener('mouseenter' , function(){
  img.classList.toggle("open-active")
}))

flexImg.forEach(img => img.addEventListener('mouseleave' , function(){
  img.classList.toggle("open-active")
}))


    // ---------------------TABLE SORTING---------------------


    