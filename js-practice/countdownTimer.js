class countDownTimer {
  constructor( _countdownTime, _elementId) {
    this.countdownTime = _countdownTime || null;
    this.elementId = _elementId || null;
    this.interval = 0
    this.countdownMap = new Map
  }

  startCountdown() {
    if (!this.checkValues()) {
      return
    }
    this.interval = setInterval(() => {this.tick()}, 1000)
  }

  tick() {
    const now = new Date().getTime();
    const difference = this.countdownTime - now;
    const days = Math.floor(difference / (1000*60*60*24));
    const hours = Math.floor((difference % (1000*60*60*24))/ (1000*60*60));
    const minutes = Math.floor((difference % (1000*60*60)) / (1000*60));
    const seconds = Math.floor((difference % (1000*60)) / 1000);
    const countdownString = `${days}d ${hours}h ${minutes}m ${seconds}s`
    this.countdownMap.set("days", days);
    this.countdownMap.set("hours", hours);
    this.countdownMap.set("minutes", minutes);
    this.countdownMap.set("seconds", seconds);
    console.log(this.countdownMap)
    if (difference < 0) {
      console.log('done')
    }
    // return this.countdownMap
  }

  stopCountdown() {
    clearInterval(this.interval)
    // document.getElementById(this.elementId).innerHTML = "countdown done";
  }

  checkValues() {
    if (this.countdownTime == null || this.elementId == null) {
      return false
    }
    return true
  }
}


let timer = new countDownTimer(new Date("Nov 2, 2021 22:47:50").getTime(), "demo")
timer.startCountdown();