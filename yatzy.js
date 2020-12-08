class Dice {
  constructor(value, id) {
    this.value = value;
    this.id = document.getElementById(id);
  }
  rollDice() {
    if (activePlayer.noOfRolls > 0) {
      console.log(this.id.classList[0] !== "locked");
      if (this.id.classList[0] !== "locked") {
        this.id.src = "dice" + this.random() + ".png";
        this.yatzy();
      }
      if (this.id.classList.contains("hidden")) {
        this.id.classList.remove("hidden");
      }
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
  activePlayer.noOfRolls = 3;
  currentPlayer = document.getElementsByClassName("player" + activePlayer.id);
  Array.from(lastPlayer).forEach((x) => x.classList.remove("activePlayer"));
  Array.from(currentPlayer).forEach((x) => x.classList.add("activePlayer"));

  for (let i = 0; i < diceArray.length; i++) {
    const element = diceArray[i];
    element.id.classList.remove("locked");
    element.id.classList.add("hidden");
    element.value = 0;
  }
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
  activePlayer.noOfRolls--;
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

  if (sum > 63 && currentPlayer === 'player1') {
    document.getElementById("bonus1").innerHTML = 50;
  } else if (sum > 63 && currentPlayer === 'player2') {
    document.getElementById("bonus2").innerHTML = 50;
  } else if (sum > 63 && currentPlayer === 'player3') {
    document.getElementById("bonus3").innerHTML = 50;
  } else {
    document.getElementById("bonus4").innerHTML = 50;
  }
}

init();

function insertScore(sum, currentScore) {
  if (currentScore.innerHTML == "") {
    if (sum > 0) {
      currentScore.innerHTML = sum;
      nextPlayer();
    } else if (confirm("Are you sure you want to use the score 0?")) {
      currentScore.innerHTML = sum;
      nextPlayer();
    }
  } else {
    alert("You are not allowed to overwrite points");
  }
}

function addSingles(number) {
  let sum = 0;
  let currentScore = Array.from(currentPlayer)[number];

  for (let i = 0; i < diceArray.length; i++) {
    if (diceArray[i].value == number) {
      sum += diceArray[i].value;
    }
  }

  insertScore(sum, currentScore);
}

function addPair(number) {
  let sum = 0;
  let currentScore = Array.from(currentPlayer)[number];

  for (let i = 0; i < diceArray.length; i++) {}

  insertScore(sum, currentScore);
}

function addPairs(number) {
  let sum = 0;
  let currentScore = Array.from(currentPlayer)[number];

  for (let i = 0; i < diceArray.length; i++) {}

  insertScore(sum, currentScore);
}

function addThreeOfAKind(number) {
  let sum = 0;
  let currentScore = Array.from(currentPlayer)[number];

  for (let i = 0; i < diceArray.length; i++) {}

  insertScore(sum, currentScore);
}

function addFourOfAKind(number) {
  let sum = 0;
  let currentScore = Array.from(currentPlayer)[number];

  for (let i = 0; i < diceArray.length; i++) {}

  insertScore(sum, currentScore);
}

function addSmallStraight(number) {
  let sum = 0;
  let currentScore = Array.from(currentPlayer)[number];

  for (let i = 0; i < diceArray.length; i++) {}

  insertScore(sum, currentScore);
}

function addLargeStraight(number) {
  let sum = 0;
  let currentScore = Array.from(currentPlayer)[number];

  for (let i = 0; i < diceArray.length; i++) {}

  insertScore(sum, currentScore);
}

function addFullHouse(number) {
  let sum = 0;
  let currentScore = Array.from(currentPlayer)[number];

  for (let i = 0; i < diceArray.length; i++) {}

  insertScore(sum, currentScore);
}

function addChance(number) {
  let sum = 0;
  let currentScore = Array.from(currentPlayer)[number];

  for (let i = 0; i < diceArray.length; i++) {}

  insertScore(sum, currentScore);
}

function addYatzy(number) {
  let sum = 0;
  let currentScore = Array.from(currentPlayer)[number];

  for (let i = 0; i < diceArray.length; i++) {}

  insertScore(sum, currentScore);
}
