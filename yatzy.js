class Dice {
  constructor(value, id) {
    this.value = value;
    this.id = document.getElementById(id);
  }
  rollDice() {
    if (activePlayer.noOfRolls > 0) {
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

let diceArray = [dice1, dice2, dice3, dice4, dice5];

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
  if (activePlayer.noOfRolls <= 0) {
    alert("You are out of tries");
  }
  activePlayer.noOfRolls--;
}

function calcSum() {
  let array = Array.from(currentPlayer);
  let newArray = [];

  for (let i = 1; i < 7; i++) {
    newArray.push(Number(array[i].innerHTML));
  }

  let sum = newArray.reduce((total, curr) => total + curr);

  currentPlayer[7].innerHTML = sum;

  if (sum > 63) {
    currentPlayer[8].innerHTML = 50;
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

  let duplicates = diceArray
    .map((x) => x.value)
    .reduce((acc, el, i, arr) => {
      console.log(acc, el, i, arr.indexOf(el));

      if (arr.indexOf(el) !== i && acc.indexOf(el) < 0) acc.push(el);
      return acc;
    }, [])
    .sort()
    .slice(-1)[0];
  sum = duplicates * 2;
  insertScore(sum, currentScore);
}

function addPairs(number) {
  let sum = 0;
  let currentScore = Array.from(currentPlayer)[number];

  let duplicates = diceArray
    .map((x) => x.value)
    .reduce((acc, el, i, arr) => {
      console.log(acc, el, i, arr.indexOf(el));

      if (arr.indexOf(el) !== i && acc.indexOf(el) < 0) acc.push(el);
      return acc;
    }, [])
    .sort()
    .slice(-2);
  console.log(duplicates.map((x) => x * 2));
  sum = duplicates.map((x) => x * 2).reduce((total, curr) => total + curr);

  insertScore(sum, currentScore);
}

function addThreeOfAKind(number) {
  let sum = 0;
  let currentScore = Array.from(currentPlayer)[number];

  let triplets = diceArray.map((x) => x.value).sort();
  let array = [];
  for (let i = 5; i >= 0; i--) {
    console.log(triplets[i]);
    if (triplets[i + 1] == triplets[i] && triplets[i + 2] == triplets[i]) {
      array.push(triplets[i]);
    }
  }

  sum = array.sort().slice(-1) * 3;

  insertScore(sum, currentScore);
}

function addFourOfAKind(number) {
  let sum = 0;
  let currentScore = Array.from(currentPlayer)[number];

  let quadruples = diceArray.map((x) => x.value).sort();
  let array = [];
  for (let i = 5; i >= 0; i--) {
    console.log(quadruples[i]);
    if (
      quadruples[i + 1] == quadruples[i] &&
      quadruples[i + 2] == quadruples[i] &&
      quadruples[i + 3] == quadruples[i]
    ) {
      array.push(quadruples[i]);
    }
  }

  sum = array[0] * 4;

  insertScore(sum, currentScore);
}

function addSmallStraight(number) {
  let sum = 0;
  let currentScore = Array.from(currentPlayer)[number];

  let smallStraight = diceArray
    .map((x) => x.value)
    .filter((x) => x < 6)
    .sort();
  smallStraight = [...new Set(smallStraight)];
  console.log(smallStraight);
  if (smallStraight.length === 5) {
    sum = smallStraight.reduce((total, curr) => total + curr);
  }

  insertScore(sum, currentScore);
}

function addLargeStraight(number) {
  let sum = 0;
  let currentScore = Array.from(currentPlayer)[number];

  let largeStraight = diceArray
    .map((x) => x.value)
    .filter((x) => x > 1)
    .sort();
  largeStraight = [...new Set(largeStraight)];
  console.log(largeStraight);
  if (largeStraight.length === 5) {
    sum = largeStraight.reduce((total, curr) => total + curr);
  }

  insertScore(sum, currentScore);
}

dice1.value = 2;
dice2.value = 2;
dice3.value = 5;
dice4.value = 5;
dice5.value = 5;

function addFullHouse(number) {
  let sum = 0;
  let currentScore = Array.from(currentPlayer)[number];

  let array = diceArray.map((x) => x.value).sort();

  const check1 =
    array[0] === array[1] && array[2] === array[3] && array[2] === array[4];
  const check2 =
    array[0] === array[1] && array[0] === array[2] && array[3] === array[4];

  if (check1 || check2) {
    sum = diceArray.map((x) => x.value).reduce((total, curr) => total + curr);
  }
  console.log(sum);
  console.log(array);
  insertScore(sum, currentScore);
}

function addChance(number) {
  let sum = 0;
  let currentScore = Array.from(currentPlayer)[number];

  sum = diceArray.map((x) => x.value).reduce((total, curr) => total + curr);

  insertScore(sum, currentScore);
}

function addYatzy(number) {
  let sum = 0;
  let currentScore = Array.from(currentPlayer)[number];

  if (diceArray.map((x) => x.value).every((x) => x === dice1.value)) {
    sum = 50;
    console.log(sum);
  }
  insertScore(sum, currentScore);
}
