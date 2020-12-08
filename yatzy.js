class Dice {
  constructor(value, id) {
    this.value = value;
    this.id = document.getElementById(id);
  }
  rollDice() {
    if (this.id.classList !== "locked") {
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
let dice6 = new Dice(6, "dice6");

let diceArray = [dice1, dice2, dice3, dice4, dice5, dice6];

let playersArray = [player1, player2, player3, player4];
let activeNumber = 3;
let activePlayer = playersArray[activeNumber];
let lastPlayer = document.getElementsByClassName("player" + activePlayer.id);
let currentPlayer = document.getElementsByClassName("player" + activePlayer.id);

function nextPlayer() {
  lastPlayer = document.getElementsByClassName("player" + activePlayer.id);
  activeNumber = (activeNumber + 1) % playersArray.length;
  activePlayer = playersArray[activeNumber];
  currentPlayer = document.getElementsByClassName("player" + activePlayer.id);
  Array.from(lastPlayer).forEach((x) => x.classList.remove("activePlayer"));
  Array.from(currentPlayer).forEach((x) => x.classList.add("activePlayer"));
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
  dice6.rollDice();
}

function calcSum() {
  let array = Array.from(document.querySelectorAll(".player1"));
  let newArray = [];

  for (let i = 1; i < 7; i++) {
    const element = array[i];
    newArray.push(Number(element.innerHTML));
  }

  let sum = newArray.reduce((total, curr) => total + curr);

  document.getElementById("sum1").innerHTML = sum;

  if (sum > 63) {
    document.getElementById("bonus1").innerHTML = 50;
  }
}

init();

function addSingles(number) {
  let sum = 0;
  for (let i = 0; i < diceArray.length; i++) {
    if (diceArray[i].value == number) {
      sum += diceArray[i].value;
    }
  }
  Array.from(currentPlayer)[number].innerHTML = sum;
  nextPlayer();
}
