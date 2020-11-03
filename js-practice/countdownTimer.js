class countDownTimer {
  constructor( _countdownTime, _elementId) {
    this.countdownTime = _countdownTime || null;
    this.elementId = _elementId || null;
    this.interval = null
  }

  setCountdown( _countdownTime ) {
    this.countdownTime = _countdownTime;
  }

  setElementId( _elementId ) {
    this.elementId = _elementId;
  }

  startCountdown() {
    if (!this.checkValues()) {
      return
    }
    this.interval = setInterval(() => {this.countdown()}, 1000)
  }

  countdown() {
    const now = new Date().getTime();
    const difference = this.countdownTime - now;
    const days = Math.floor(difference / (1000*60*60*24));
    const hours = Math.floor((difference % (1000*60*60*24))/ (1000*60*60));
    const minutes = Math.floor((difference % (1000*60*60)) / (1000*60));
    const seconds = Math.floor((difference % (1000*60)) / 1000);
    const countdownString = `${days}d ${hours}h ${minutes}m ${seconds}s`
    document.getElementById(this.elementId).innerHTML = countdownString;
    if (difference < 0) {
      this.stopCountdown()
    }
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