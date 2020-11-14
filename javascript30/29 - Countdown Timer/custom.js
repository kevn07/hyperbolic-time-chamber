const buttons = document.querySelectorAll('[data-time]')
const pauseResetButton = document.querySelector('.timer__reset')
const timerDisplay = document.querySelector('.display__time-left');
const startButton = document.querySelector('.timer__start')

class timerClass {
  constructor(_seconds, _timeHandler) {
    this.secondsLeft = _seconds || 0
    this.countdownInterval = null
    this.pause = false;
    this.started = false;
    this.timeHandler = _timeHandler
  }

  startTimer() {
    clearInterval(this.countdownInterval)
    this.pause = false;
    this.started = true;
    const now = Date.now()
    const then = now + this.secondsLeft * 1000
    this.timeHandler(this.secondsLeft)
    this.countdownInterval = setInterval(() => {
      this.secondsLeft = Math.round((then - Date.now())/1000);
      if (this.secondsLeft < 0) {
        
        this.resetTimer()
        return 
      }
      this.timeHandler(this.secondsLeft)
    }, 1000);
  } 

  stopTimer() {
    clearInterval(this.countdownInterval)
    if (this.secondsLeft == 0) return;
    if(this.pause == true) {
      this.resetTimer()
    } else {
      this.pause = true
    }
    this.timeHandler(this.secondsLeft)
  }

  resetTimer() {
    clearInterval(this.countdownInterval)
    this.secondsLeft = 0;
    this.pause = false;
    this.started = false;
    return
  }

  addTime(seconds) {
    this.secondsLeft += seconds
    console.log(this.secondsLeft)
    this.timeHandler(this.secondsLeft)
    if(this.started) {
      this.startTimer()
    }
  }

  setTime(seconds) {
    this.stopTimer();
    this.secondsLeft = seconds
    this.timeHandler(this.secondsLeft)
  }

  hasStarted() {
    return this.started && !this.pause;
  }
}

function displayFunction(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const display = `${mins}:${secs < 10 ? '0': ''}${secs}`
  timerDisplay.textContent = display;
  document.title = display;
}


const timer = new timerClass(0, displayFunction)
displayFunction(0)



function buttonHandler() {
  const seconds = parseInt(this.dataset.time);
  timer.addTime(seconds)
}

function submitTimer(e) {
  e.preventDefault();
  timer.startTimer()
}

function updateTimer() {
  if (timer.hasStarted()) {
    return
  }
  let mins;
  if (this.value) {
    mins = parseInt(this.value);
  } else {
    mins = 0
  }
  timer.setTime(mins*60)
  displayFunction(mins*60)
}



document.customForm.addEventListener('submit', submitTimer)
document.customForm.querySelector('input[name="minutes"]').addEventListener('input', updateTimer)
startButton.addEventListener('click', function() {
  timer.startTimer()
})
pauseResetButton.addEventListener('click', function() {
  timer.stopTimer()
})

buttons.forEach(button => button.addEventListener('click', buttonHandler));