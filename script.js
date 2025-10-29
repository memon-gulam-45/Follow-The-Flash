let gameSeq = [];
let userSeq = [];

let btns = ["red", "yellow", "green", "purple"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");
let p = document.querySelector("p");
let highestScore = 0;
let isPlayingSequence = false;

document.addEventListener("keypress", () => {
  if (started == false) {
    started = true;
  }
  levelUp();
});

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
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;
  checkHigh(level - 1);

  let ranIdx = Math.floor(Math.random() * 4);
  let ranColor = btns[ranIdx];
  let ranBtn = document.querySelector(`.${ranColor}`);
  gameSeq.push(ranColor);
  console.log(gameSeq);
  gameFlash(ranBtn);
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 1000);
      levelUp();
    }
  } else {
    h2.innerHTML = `Game Over !!, Your Score Was <b>${level}</b> <br>Press Any Key To Start Again`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(() => {
      document.querySelector("body").style.backgroundColor = "white";
    }, 200);
    reset();
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
  h2.innerText = `Game Over`;
}
