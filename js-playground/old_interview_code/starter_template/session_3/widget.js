console.log('JS loaded successfully!')
const timeDisplay = document.getElementById('timeDisplay')
const resetButton = document.getElementById('resetButton')
const freezeButton = document.getElementById('freezeButton')
const startTime = 65

class countdownTimer {
  constructor(_seconds, _displayHandler) {
    this.startTime = _seconds;
    this.secondsLeft = _seconds;
    this.intervalId = null;
    this.countdownHandler = _displayHandler
  }

  startTimer() {
    const goal = Math.floor(Date.now()/1000 + this.secondsLeft)
    this.countdownHandler(this.secondsLeft)
    this.intervalId = setInterval(() => {
      this.secondsLeft = goal - Math.floor(Date.now()/1000)
      this.countdownHandler(this.secondsLeft)
      if (this.secondsLeft <= 0) {
        this.stopTimer()
      }
    }, 0) 
  }

  stopTimer() {
    clearInterval(this.intervalId)
  }

  resetTimer() {
    this.stopTimer()
    this.secondsLeft = this.startTime
    this.startTimer()
  }
}

function displayOutput(seconds) {
  const mins = Math.floor(seconds/60)
  const secs = seconds % 60
  timeDisplay.textContent = `${mins < 10 ? '0': ''}${mins}:${secs < 10 ? '0': ''}${secs}`
}


function demonstrateFreezeIssue() {  
  for (let end = Date.now() + 5000; Date.now() < end; ) {

  }
}

const classCountdown = new countdownTimer(startTime, displayOutput)
classCountdown.startTimer()

resetButton.addEventListener("click", () => {
  classCountdown.resetTimer()
})

freezeButton.addEventListener("click", () => {
  demonstrateFreezeIssue()
})


