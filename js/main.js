'use strict';
{
  const timer = document.getElementById('timer');
  const start = document.getElementById('start');
  const stop = document.getElementById('stop');
  const reset = document.getElementById('reset');
  const lap = document.getElementById('lap');
  const record = document.getElementById('record');
  const lapreset = document.getElementById('lapreset');

  let startTime;
  let timeoutId;
  let elapsedTime = 0;

  function countUp() {
    console.log(Date.now() - startTime);
    const d = new Date(Date.now() - startTime + elapsedTime);
    const m = String(d.getMinutes()).padStart(2, '0');
    const s = String(d.getSeconds()).padStart(2, '0');
    const ms = String(d.getMilliseconds()).padStart(3, '0');
    timer.textContent = `${m}:${s}.${ms}`;

    timeoutId = setTimeout(() => {
      countUp();
    }, 10);
  }

  function setButtonStateInitial() {
    start.classList.remove('inactive');
    stop.classList.add('inactive');
    reset.classList.add('inactive');
    lap.classList.add('inactive');
    lapreset.classList.add('inactive1');
  }
  function setButtonStateRunning() {
    start.classList.add('inactive');
    stop.classList.remove('inactive');
    reset.classList.add('inactive');
    lap.classList.remove('inactive');
    lapreset.classList.add('inactive1');
  }
  function setButtonStateStopped() {
    start.classList.remove('inactive');
    stop.classList.add('inactive');
    reset.classList.remove('inactive');
    lap.classList.remove('inactive');
    lapreset.classList.add('inactive1');
  }
  function setButtonStatelap() {
    lapreset.classList.remove('inactive1');
  }
  function setButtonStatelapreset() {
    lapreset.classList.add('inactive1');
  }

  setButtonStateInitial();

  start.addEventListener('click', () => {
    if (start.classList.contains('inactive') === true) {
      return;
    }
    setButtonStateRunning();
    startTime = Date.now();
    countUp();
  });

  stop.addEventListener('click', () => {
    if (stop.classList.contains('inactive') === true) {
      return;
    }
    setButtonStateStopped();
    clearTimeout(timeoutId);
    elapsedTime += Date.now() - startTime;
  });

  reset.addEventListener('click', () => {
    if (reset.classList.contains('inactive') === true) {
      return;
    }
    setButtonStateInitial();
    timer.textContent = '00:00.000';
    elapsedTime = 0;
  });

  lap.addEventListener('click', () => {
    if (lap.classList.contains('inactive') === true) {
      return;
    }
    const d = new Date(Date.now() - startTime + elapsedTime);
    const m = String(d.getMinutes()).padStart(2, '0');
    const s = String(d.getSeconds()).padStart(2, '0');
    const ms = String(d.getMilliseconds()).padStart(3, '0');
    record.textContent = `${m}:${s}.${ms}`;
    setButtonStatelap();
  });

  lapreset.addEventListener('click', () => {
    record.textContent = '--:--.---';
    setButtonStatelapreset();
  });
}