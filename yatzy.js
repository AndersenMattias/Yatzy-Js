class Dice {
  constructor(value, id) {
    this.value = value;
    this.id = document.getElementById(id);
  }
  rollDice() {
    this.id.src = "dice" + this.random() + ".png";
    this.yatzy();
  }
  random() {
    return (this.value = Math.floor(Math.random() * 6 + 1));
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

function nextPlayer() {}

function init() {
  nextPlayer();
}

function rollAllDice() {
  dice1.rollDice();
  dice2.rollDice();
  dice3.rollDice();
  dice4.rollDice();
  dice5.rollDice();
}

function calcSum() {
  let array = Array.from(document.querySelectorAll(".player1"));
  let newArray = [];

  for (let i = 1; i < 7; i++) {
    newArray.push(Number(array[i].innerHTML));
  }

  let sum = newArray.reduce((total, curr) => total + curr);

  document.getElementById("sum1").innerHTML = sum;

  if (sum > 63) {
    document.getElementById("bonus1").innerHTML = 50;
  }
}

init();
