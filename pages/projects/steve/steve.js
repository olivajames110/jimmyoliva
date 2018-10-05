const inputs = document.querySelectorAll('input')

function handleUpdate() {
  const suffix = this.dataset.sizing || '';
  if (this.name === 'opacity') {
    document.documentElement.style.setProperty(`--${this.name}`, this.value  * .01);
  } else {
  document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
  }

  this.inputNum.innerHTML = this.value + suffix

  console.log(this.value);
}

inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));
inputs.forEach(input => input.addEventListener('change', handleUpdate));



const images = document.querySelectorAll('.gallery-thumbnails img');
const mainImg = document.querySelector('.image-section img');
images[0].style.opacity = ".5"

  
function imgChange(e) {
    mainImg.classList.add("main-animation")
    mainImg.classList.remove("gallery-animation")
    
    images.forEach(img => img.style.opacity = "1");
    
    e.target.style.opacity = ".4";
    
    // setTimeout( function() {
    //   mainImg.classList.remove("main-animation")
    // }, 2800);

    setTimeout( function() {
      mainImg.src = e.target.src;
      mainImg.classList.remove("main-animation")
      mainImg.classList.add("gallery-animation");
    }, 2400);



  }

images.forEach(img => img.addEventListener('click', imgChange));


