const secondsInput = document.getElementById("secondsInput");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resumeBtn = document.getElementById("resumeBtn");
const resetBtn = document.getElementById("resetBtn");
const statusText = document.getElementById("status");
const timeDisplay = document.getElementById("timeDisplay");

let timerId = null;
let remainingSeconds = 0;
let isPaused = false;

function updateDisplay() {
  if (remainingSeconds > 0) {
    timeDisplay.textContent = `Time left: ${remainingSeconds}`;
  } else {
    timeDisplay.textContent = "Time left: 0";
  }
}

function setRunningControls() {
  pauseBtn.disabled = false;
  resumeBtn.disabled = true;
  resetBtn.disabled = false;
}

function stopTimer() {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }
}

function completeTimer() {
  stopTimer();
  pauseBtn.disabled = true;
  resumeBtn.disabled = true;
  resetBtn.disabled = false;
  statusText.textContent = "Time's up!";
}

function tick() {
  if (isPaused) {
    return;
  }

  remainingSeconds -= 1;
  updateDisplay();

  if (remainingSeconds <= 0) {
    completeTimer();
  }
}

startBtn.addEventListener("click", () => {
  const inputValue = Number(secondsInput.value);

  if (!Number.isInteger(inputValue) || inputValue <= 0) {
    statusText.textContent = "Please enter a whole number greater than 0.";
    return;
  }

  stopTimer();
  remainingSeconds = inputValue;
  isPaused = false;

  updateDisplay();
  setRunningControls();
  statusText.textContent = "Running...";

  timerId = setInterval(tick, 1000);
});

pauseBtn.addEventListener("click", () => {
  if (!timerId) {
    return;
  }

  isPaused = true;
  pauseBtn.disabled = true;
  resumeBtn.disabled = false;
  statusText.textContent = "Paused";
});

resumeBtn.addEventListener("click", () => {
  if (!timerId) {
    return;
  }

  isPaused = false;
  pauseBtn.disabled = false;
  resumeBtn.disabled = true;
  statusText.textContent = "Resumed";
});

resetBtn.addEventListener("click", () => {
  stopTimer();
  remainingSeconds = 0;
  isPaused = false;
  updateDisplay();

  pauseBtn.disabled = true;
  resumeBtn.disabled = true;
  resetBtn.disabled = true;
  statusText.textContent = "Reset. Enter a value and click Start.";
});
