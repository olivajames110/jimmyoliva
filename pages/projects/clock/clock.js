
 // console.log(key)
const secondHand = document.querySelector('.sec-hand');
const minHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');
const digitalSec = document.querySelector('.digital-seconds');
const digitalMin = document.querySelector('.digital-minutes');
const digitalHour = document.querySelector('.digital-hours');
const amPm = document.querySelector('.am-pm');
const amPmImage = document.querySelector('.am-pm-image');
const nightColor = "#37557b";
const dayColor = "#b09b5f"

function addZero(e) {
  if (e < 10) {
    e = "0" + e;
  }
  return e;
}

function setDate() {
  const now = new Date();
  const seconds = addZero(now.getSeconds());
  const min = addZero(now.getMinutes());
  const hour = addZero( now.getHours());
  const secondsDegrees = ((seconds/ 60) * 360 ) + 90;
  const minDegrees = ((min/ 60) * 360 ) + 90;
  const hourDegrees = ((hour/ 60) * 360 ) + 90;
  secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
  minHand.style.transform = `rotate(${minDegrees}deg)`;
  hourHand.style.transform = `rotate(${hourDegrees}deg)`;

  digitalSec.innerHTML = seconds;
  digitalMin.innerHTML = min;
  if (hour < 12) {
    digitalHour.innerHTML = hour;
    amPm.innerHTML = "AM"
    amPm.style.color = dayColor
    amPmImage.src = "Images/sun yellow.png"
  } else {
    if (hour < 12) {
      digitalHour.innerHTML = Math.floor((hour / 2));
    } else if (hour === 12) {
      digitalHour.innerHTML = 12;
    } else {
      digitalHour.innerHTML = addZero(hour - 12);
    }
    amPm.innerHTML = "PM"
    amPmImage.src = "Images/sleep blue.png"
  }
}

setInterval(setDate , 0)