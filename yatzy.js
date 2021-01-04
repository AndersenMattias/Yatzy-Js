class Dice {
  constructor(value, id) {
    this.value = value;
    this.id = document.getElementById(id);
  }
  rollDice() {
    if (!this.id.classList.contains("locked")) {
      this.id.src = "dice" + this.random() + ".png";
      this.yatzy();
    }
  }
  random() {
    return (this.value = Math.floor(Math.random() * 6 + 1));
  }
  lockDice() {
    this.id.classList.toggle("locked");
  }

  yatzy() {
    if (
      dice1.value === dice2.value &&
      dice1.value === dice3.value &&
      dice1.value === dice4.value &&
      dice1.value === dice5.value &&
      dice1.value === dice6.value
    )
      alert("YATZY!");
  }
}

class Player {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.noOfRolls = 3;
    this.setName();
  }
  setName() {
    document.getElementById("player" + this.id).innerHTML = this.name;
  }
}

let player1 = new Player(1, "Göran");
let player2 = new Player(2, "Bengt");
let player3 = new Player(3, "Gunhild");
let player4 = new Player(4, "Sven-Bertil");

let dice1 = new Dice(1, "dice1");
let dice2 = new Dice(2, "dice2");
let dice3 = new Dice(3, "dice3");
let dice4 = new Dice(4, "dice4");
let dice5 = new Dice(5, "dice5");

let diceArray = [dice1, dice2, dice3, dice4, dice5];

let playerArray = [player1, player2, player3, player4];

let activeNumber = 3;

let activePlayer = playerArray[3];

let rolls = document.getElementById("noOfRollsRemaining");

function nextPlayer() {
  document.getElementById("rollAllDice").disabled = false;
  document
    .getElementById("player" + (activeNumber + 1) + "Col")
    .classList.remove("activePlayer");
  activeNumber++;
  if (activeNumber === playerArray.length) {
    activeNumber = 0;
  }
  activePlayer = playerArray[activeNumber];
  activePlayer.noOfRolls = 3;
  rolls.innerHTML = activePlayer.noOfRolls;
  document
    .getElementById("player" + (activeNumber + 1) + "Col")
    .classList.add("activePlayer");
}

function init() {
  nextPlayer();
}

function rollAllDice() {
  dice1.rollDice();
  dice2.rollDice();
  dice3.rollDice();
  dice4.rollDice();
  dice5.rollDice();
  activePlayer.noOfRolls--;
  rolls.innerHTML = activePlayer.noOfRolls;
  if (activePlayer.noOfRolls === 0) {
    document.getElementById("rollAllDice").disabled = true;
    rolls.innerHTML = "You're out of rolls";
  }
}

function getElements() {
  let currentElements = Array.from(
    document.querySelectorAll("td")
  ).filter((x) => x.classList.contains("player" + (activeNumber + 1)));
  return currentElements;
}

function calcSum() {
  let sum = getElements()
    .map((x) => Number(x.innerHTML))
    .reduce((total, curr) => total + curr);

  console.log(sum);

  document.getElementById("sum" + (activeNumber + 1)).innerHTML = sum;

  if (sum > 63) {
    document.getElementById("bonus" + (activeNumber + 1)).innerHTML = 50;
  }
  // nextPlayer();
}

init();

function addSingles(number) {
  console.log(getElements()[0]);
}

addSingles();

function toggleDisable() {
  getElements()[5].classList.toggle("disabled");
}

dice1.value = 1;
dice2.value = 2;
dice3.value = 2;
dice4.value = 2;
dice5.value = 2;

function addFullHouse() {
  let amount = diceArray
    .map((x) => x.value)
    .reduce((amount, current) => {
      if (amount[current]) {
        amount[current]++;
      } else {
        amount[current] = 1;
      }
      console.log(amount);
      return amount;
    }, {});
  console.log(Object.values(amount).every((x) => x === 2 || x === 3));
}

function onelineFullHouse() {
  return Object.values(
    diceArray
      .map((x) => x.value)
      .reduce((amount, current) => {
        amount[current] ? amount[current]++ : (amount[current] = 1);
      }, {})
  ).every((x) => x === 2 || x === 3);
}
