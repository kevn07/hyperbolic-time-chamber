console.log('JS loaded successfully!')
let globalID;

const body = document.body;
const startButton = document.querySelector("#start")
const stopButton = document.querySelector("#stop");
const progressBar = document.querySelector("#progress-bar")
let progress = 0;
let count = 0;


function repeatOften() {
  if (progress >= 100) {
    cancelAnimationFrame(globalID)
    progress = 0
    progressBar.style.width = `${progress}%`
    console.log('FINISHED!')
    return
  }
  progress++
  progressBar.style.width = `${progress}%`
  globalID = requestAnimationFrame(repeatOften);
}

// globalID = requestAnimationFrame(repeatOften);

stopButton.addEventListener('click', function() {
  cancelAnimationFrame(globalID)
})

startButton.addEventListener('click', () => {
  globalID = requestAnimationFrame(repeatOften)
})
