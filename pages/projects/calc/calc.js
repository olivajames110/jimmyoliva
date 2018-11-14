const btns = document.querySelectorAll('button')
const resultArea = document.getElementById('calc-results');
const btnArray = [];

btns.forEach(function(btn){
  btn.addEventListener('click' , function(){
    resultArea.innerHTML = btn.getAttribute('data-num')
    console.log(btn.getAttribute('data-num'));
    btnArray.push(btn.getAttribute('data-num'));
    
  })
})



