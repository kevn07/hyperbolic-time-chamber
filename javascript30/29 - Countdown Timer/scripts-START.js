
let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]')

function timer(seconds) {
  clearInterval(countdown)
  const now = Date.now()
  const then = now + seconds * 1000
  displayTimeLeft(seconds);
  displayEndTime(then);
  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now())/1000);
    if (secondsLeft < 0) {
      clearInterval(countdown)
      return
    }
    displayTimeLeft(secondsLeft)
  }, 1000);
}


function displayTimeLeft(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const display = `${mins}:${secs < 10 ? '0': ''}${secs}`
  timerDisplay.textContent = display;
  document.title = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();
  let suffix = 'am'
  let adjustedHour = hour;
  if (hour > 12) {
    adjustedHour -= 12
    suffix = 'pm'
  }
  endTime.textContent = `Be Back At ${adjustedHour}:${minutes < 10 ? '0': ''}${minutes}${suffix}`;

}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));

function retrieveMinutes(e) {
  e.preventDefault();
  const mins = this.minutes.value;
  timer(mins*60);
  this.reset()
}

document.customForm.addEventListener('submit', retrieveMinutes)