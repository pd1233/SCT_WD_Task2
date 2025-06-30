let startTime, updatedTime, difference = 0, timerInterval;
let running = false;
let laps = [];

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStop');
const lapBtn = document.getElementById('lap');
const resetBtn = document.getElementById('reset');
const lapsList = document.getElementById('laps');

function updateTime() {
  updatedTime = new Date().getTime();
  difference = updatedTime - startTime;

  const hours = Math.floor((difference % 86400000) / 3600000);
  const minutes = Math.floor((difference % 3600000) / 60000);
  const seconds = Math.floor((difference % 60000) / 1000);

  display.textContent =
    (hours < 10 ? "0" + hours : hours) + ":" +
    (minutes < 10 ? "0" + minutes : minutes) + ":" +
    (seconds < 10 ? "0" + seconds : seconds);
}

startStopBtn.addEventListener('click', () => {
  if (!running) {
    startTime = new Date().getTime() - difference;
    timerInterval = setInterval(updateTime, 1000);
    startStopBtn.textContent = 'Pause';
    running = true;
  } else {
    clearInterval(timerInterval);
    startStopBtn.textContent = 'Start';
    running = false;
  }
});

resetBtn.addEventListener('click', () => {
  clearInterval(timerInterval);
  running = false;
  difference = 0;
  display.textContent = "00:00:00";
  startStopBtn.textContent = 'Start';
  laps = [];
  lapsList.innerHTML = '';
});

lapBtn.addEventListener('click', () => {
  if (running) {
    const lapTime = display.textContent;
    laps.push(lapTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${laps.length}: ${lapTime}`;
    lapsList.appendChild(lapItem);
  }
});
