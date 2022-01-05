function analogicClock() {
    const currentDate = new Date();
    let hour = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    
    if (hour > 12){
      hour = hour - 12;
    }
    let degHours = (360 * hour / 12)- 180
    let degMiutes = 180 + minutes * 6
    const manecillaHour = document.querySelector(".hours")
    const manecillaMinutos = document.querySelector(".minutes")
    manecillaHour.style.transform = `translate(-50%) rotate(${degHours}deg)`
    manecillaMinutos.style.transform = `translate(-50%) rotate(${degMiutes}deg)`
  }
  
  function analogicClockLogo() {
    const currentDate = new Date();
    let hour = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    
    if (hour > 12){
      hour = hour - 12;
    }
    let degHours = (360 * hour / 12)- 180
    let degMiutes = 180 + minutes * 6
    const manecillaHour = document.querySelector(".hours-logo")
    const manecillaMinutos = document.querySelector(".minutes-logo")
    manecillaHour.style.transform = `translate(-50%) rotate(${degHours}deg)`
    manecillaMinutos.style.transform = `translate(-50%) rotate(${degMiutes}deg)`
  }
  setInterval(analogicClock,1000)
  setInterval(analogicClockLogo,1000)