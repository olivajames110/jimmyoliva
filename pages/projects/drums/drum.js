
 // console.log(key)


function playSound(e) {
 const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
 const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  console.log(e)
  if(!audio) return
 audio.currentTime = 0;
 audio.play();
 key.classList.add('playing')
 keyClick.classList.addEventListener('playing');

}


function removeTransition(e){
  if (e.propertyName !== 'transform') return;
  this.classList.remove('playing')

}

const keys = document.querySelectorAll('.key')
keys.forEach(key => key.addEventListener('transitionend' , removeTransition))
window.addEventListener("keydown" , playSound )
window.addEventListener("click" , playSound )