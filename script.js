let icons = ['diamond', 'horseshoe', 'seven', 'bell', 'cherry', 'lemon'];
let btn = document.getElementById('spinBtn');
let scoreTab = document.getElementById('score-number');
let score = 300;
const spinCost = 33;

const slotValues = {
  slot1: 0,
  slot2: 0,
  slot3: 0,
  slot4: 0,
  slot5: 0,
  slot6: 0,
  slot7: 0,
  slot8: 0,
  slot9: 0,
};
window.onload = function () {
  let value = prompt("Enter name of player");
  while (value == ""){
      value = prompt("Try again!");
  }
  document.getElementById('name').innerHTML = value;
  renderScore();
  spin('slot1');
  spin('slot2');
  spin('slot3');
  spin('slot4');
  spin('slot5');
  spin('slot6');
  spin('slot7');
  spin('slot8');
  spin('slot9');
};


function renderScore() {
  scoreTab.innerHTML = score;
}

function gameOver() {
  score = 0;
  btn.classList.add('disabled');
  alert('YOU LOSE!');
  window.onclick = function () {
    location.reload();
  }
}

function spin(slotId) {
  const slot = document.getElementById(slotId);
  slot.className = 'slot';
  let number = Math.random() * 20;
  number = Math.round(number);
  while (number > icons.length - 1) {
    number -= icons.length;
  }
  slot.classList.add(icons[number]);
  slotValues[slotId] = number;
}

function calcRow(row){
  if (row == 1) {
    slot1 = slotValues.slot1;
    slot2 = slotValues.slot2;
    slot3 = slotValues.slot3;
  }
  else if (row == 2) {
    slot1 = slotValues.slot4;
    slot2 = slotValues.slot5;
    slot3 = slotValues.slot6;
  }
  else if (row == 3) {
    slot1 = slotValues.slot7;
    slot2 = slotValues.slot8;
    slot3 = slotValues.slot9;
  }

  let result = -spinCost;
  if (slot1 == slot2 && slot1 == slot3) {
    switch (slot1) {
      case 0:
        result = 1000;
        break;
      case 1:
        result = 800;
        break;
      case 2:
        result = 777;
        break;
      case 3:
        result = 500;
        break;
      case 4:
        result = 150;
        break;
      case 5:
        result = 50;
        break;
    }
  } else {
    const slotArr = [slot1, slot2, slot3];
    if (slotArr.includes(0) && slotArr.includes(1) && slotArr.includes(3)) {
      result = 450;
    }
    if (slotArr.includes(2) && slotArr.includes(4) && slotArr.includes(5)) {
      result = 150;
    }
  }
  return result;
}
function scoreCalc() {
  score += calcRow(1);
  score += calcRow(2);
  score += calcRow(3);
  if (score < spinCost ) {
    gameOver();
  }
  renderScore(score);
}

btn.onclick = function () {
  setTimeout(spin, 300, 'slot1');
  setTimeout(spin, 350, 'slot2');
  setTimeout(spin, 400, 'slot3');
  setTimeout(spin, 450, 'slot4');
  setTimeout(spin, 500, 'slot5');
  setTimeout(spin, 550, 'slot6');
  setTimeout(spin, 600, 'slot7');
  setTimeout(spin, 650, 'slot8');
  setTimeout(() => {
    spin('slot9');
    scoreCalc();
  }, 700);
};