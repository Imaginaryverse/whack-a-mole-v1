/* DOM OBJECTS */
const app = document.querySelector('.app');
const startWindow = document.querySelector('.start-window');
const startBtn = document.querySelector('.start-btn');

const gameWindow = document.querySelector('.game-window');
const spanScore = document.querySelector('.score');
const spanRank = document.querySelector('.rank');
const spanFails = document.querySelector('.fails');
const moleImg = document.querySelectorAll('.mole-img');
const holeImg = document.querySelectorAll('.hole-img');

const resultWindow = document.querySelector('.result-window');
const resultScore = document.querySelector('.result-score');
const playAgainBtn = document.querySelector('.play-again-btn');

/* DOM OTHER */
/* moleImg.forEach((img) => {
  img.src = 'assets/happy.svg';
}); */

holeImg.forEach((img) => {
  img.src = 'assets/dirt.svg';
});

/* EVENT LISTENERS */
startBtn.addEventListener('click', () => {
  initGame();
});

playAgainBtn.addEventListener('click', () => {
  resetAll();
  initGame();
});

/* FUNCTIONS */
const main = () => {
  /* showStartWindow((show = true)); */

  displayWindow(true, startWindow);
};

const displayWindow = (show, window) => {
  if (show) {
    window.style.zIndex = '100';
  } else {
    window.style.zIndex = '0';
  }
};

const randomMole = (moles) => {
  const randomIdx = Math.floor(Math.random() * moles.length);
  const mole = moles[randomIdx];

  if (mole === lastMole) {
    return randomMole(moleImg);
  }

  lastMole = mole;
  return mole;
};

const peep = (newTime, isTimeout) => {
  let timedOut = true;

  // Update scoreboard
  updateScoreboard();

  const time = isTimeout
    ? newTime
    : newTime < minTime
    ? minTime
    : newTime - score * 5;

  const mole = randomMole(moleImg);
  mole.src = images[Math.floor(Math.random() * images.length)];

  mole.classList.add('peep');
  const handleClick = () => {
    timedOut = false;
    score++;
    mole.classList.remove('peep');
    updateScoreboard();
  };

  mole.addEventListener('click', handleClick);

  setTimeout(() => {
    mole.classList.remove('peep');
    mole.removeEventListener('click', handleClick);

    if (fails > 1) {
      peep(time, timedOut);
    } else {
      displayWindow(false, gameWindow);
      resultScore.innerHTML = `${score}`;
      displayWindow(true, resultWindow);
    }

    updateScoreboard();
  }, time);

  if (score === lastScore) {
    fails--;

    gameWindow.style.backgroundColor = 'salmon';
    setTimeout(() => {
      gameWindow.style.backgroundColor = 'plum';
    }, 100);
  }

  lastScore = score;
};

const updateScoreboard = () => {
  const rank =
    score < 10
      ? 'EASY'
      : score < 15
      ? 'NORMAL'
      : score < 20
      ? 'HARD'
      : score < 25
      ? 'HEROIC'
      : 'IMPOSSIBLE';

  // HHHÄÄÄÄÄÄRR

  spanScore.innerHTML = `SCORE: ${score}`;
  spanRank.innerHTML = `RANK: ${rank}`;
  spanFails.innerHTML = `FAILS: ${fails}`;
};

const resetAll = () => {
  lastMole;
  score = 0;
  lastScore;
  fails = 5;
};

const initGame = () => {
  displayWindow(false, startWindow);
  displayWindow(false, resultWindow);
  displayWindow(true, gameWindow);

  peep(initInterval);
};

/* GAME */
let lastMole;
let score = 0;
let lastScore;
let fails = 5;
const initInterval = 2000;
const minTime = 650;
const images = [
  'assets/angry.svg',
  'assets/whoa.svg',
  'assets/happy2.svg',
  'assets/teehee.svg',
];

main();
