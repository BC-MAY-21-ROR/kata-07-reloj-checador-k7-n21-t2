const date = document.querySelector('#date');
const currentDate = new Date();
date.textContent = `${getMonthStr(currentDate.getMonth())} ${currentDate.getDate()}, ${currentDate.getFullYear()}`

function getMonthStr(month){
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  return months[month];
}

function printHour () {
  const currentDate = new Date();
  const hour = document.querySelector('#hour');
  // const manecillaHour = document.querySelector(".hours")
  // const manecillaMinutos = document.querySelector(".hours")
  // manecillaHour.style.transform = `translate(-50%) rotate(${180 + currentDate.getHours() / 6}deg)`
  // manecillaMinutos.style.transform = `rotate(${360 * 6 / 12}deg)`
  hour.textContent = `${getTimeStr(currentDate.getHours())}:${getTimeStr(currentDate.getMinutes())}:${getTimeStr(currentDate.getSeconds())}`
}

function getTimeStr(value){
  value < 10 ? value = `0${value}` : null
  return value
}

setInterval(printHour,1000)