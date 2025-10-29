let gameSeq = [];
let userSeq = [];

let btns = ["red", "yellow", "green", "purple"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");
let p = document.querySelector("p");
let highestScore = 0;
let isPlayingSequence = false;

const startBtn = document.getElementById("start-btn");

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}
function userFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(function () {
    btn.classList.remove("userFlash");
  }, 250);
}

function levelUp() {
  startBtn.style.display = "none";
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;
  checkHigh(level - 1);

  let ranIdx = Math.floor(Math.random() * 4);
  let ranColor = btns[ranIdx];
  gameSeq.push(ranColor);
  console.log(gameSeq);

  playSequence();
}

function checkAns(idx) {
  const i = idx - 1;
  if (userSeq[i] === gameSeq[i]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    gameOver();
  }
}

function btnPress() {
  if (isPlayingSequence) return;
  let btn = this;
  userFlash(btn);

  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkAns(userSeq.length);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
  startBtn.style.display = "inline-block";
}

function checkHigh(score) {
  if (score > highestScore) {
    highestScore = score;
  }
  p.innerText = `Your Highest Score Is : ${highestScore}`;
}

async function playSequence() {
  isPlayingSequence = true;
  for (let color of gameSeq) {
    const btn = document.querySelector(`.${color}`);
    gameFlash(btn);
    await delay(600);
  }
  isPlayingSequence = false;
}
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function gameOver() {
  h2.innerHTML = `Game Over !! Your Score Was <b>${level}</b><br>Press Start To Play Again`;
  document.body.classList.add("game-over");
  setTimeout(() => {
    document.body.classList.remove("game-over");
    reset();
  }, 1000);
}

startBtn.addEventListener("click", () => {
  if (!started) {
    started = true;
    levelUp();
  }
});
