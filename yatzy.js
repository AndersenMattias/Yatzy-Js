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
    if (this.id.classList.contains("hidden")) {
      this.id.classList.remove("hidden");
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
      dice1.value === dice5.value
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

  calcSum();
  calcTotal();

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

  for (let i = 0; i < diceArray.length; i++) {
    const element = diceArray[i];
    element.id.classList.remove("locked");
    element.id.classList.add("hidden");
    element.value = 0;
  }
}

// Lägg till active player och no of rolls i storage

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
  if (
    getElements()
      .splice(1, 6)
      .every((x) => x.innerHTML !== "") &&
    getElements().splice(7, 1)[0].innerHTML === ""
  ) {
    console.log("printing sum!");
    let sum = getElements()
      .splice(1, 6)
      .map((x) => Number(x.innerHTML))
      .reduce((total, curr) => total + curr);

    let sumCell = document.getElementById("sum" + (activeNumber + 1));
    sumCell.innerHTML = sum;
    addToStorage(sumCell);

    if (sumCell.innerHTML > 63) {
      let bonusCell = document.getElementById("bonus" + (activeNumber + 1));
      bonusCell.innerHTML = 50;
      addToStorage(bonusCell);
    } else {
      let bonusCell = document.getElementById("bonus" + (activeNumber + 1));
      bonusCell.innerHTML = 0;
      addToStorage(bonusCell);
    }
  }
}

function calcTotal() {
  let arrayOfCells = getElements().splice(7, 11);
  let currentCell = getElements()[18];
  if (
    arrayOfCells.every(
      (x) => x.innerHTML !== "" && getElements()[18].innerHTML === ""
    )
  ) {
    let points = arrayOfCells
      .map((x) => Number(x.innerHTML))
      .reduce((total, curr) => total + curr);
    currentCell.innerHTML = points;
    addToStorage(currentCell);
  }
}

init();

let storageArray = [];

function addToStorage(currentCell) {
  let cellObject = {};
  cellObject["id"] = currentCell.id;
  cellObject["points"] = currentCell.innerHTML;
  storageArray.push(cellObject);

  localStorage.setItem("storageArray", JSON.stringify(storageArray));
}

function getFromStorage() {
  console.log(`Amount of stored values: ${localStorage.length}`);

  console.log(localStorage);
}

function resumePoints() {
  let parsedArray = JSON.parse(localStorage.getItem("storageArray"));
  if (parsedArray) {
    storageArray = parsedArray;
    for (let i = 0; i < parsedArray.length; i++) {
      const element = parsedArray[i];
      let cellToFill = document.getElementById(element.id);

      cellToFill.innerHTML = element.points;
      cellToFill.classList.add("disabled");
    }
  }
}

function insertScore(points, currentCell) {
  if (currentCell.innerHTML == "") {
    if (points > 0) {
      currentCell.innerHTML = points;
      currentCell.classList.add("disabled");
      addToStorage(currentCell);
      nextPlayer();
    } else if (confirm("Are you sure you want to use the score 0?")) {
      currentCell.innerHTML = points;
      currentCell.classList.add("disabled");
      addToStorage(currentCell);
      nextPlayer();
    }
  }
  // else {
  //   alert("You are not allowed to overwrite points");
  // }
}

function addSingles(number) {
  let points = 0;
  let currentCell = getElements()[number];

  for (let i = 0; i < diceArray.length; i++) {
    if (diceArray[i].value == number) {
      points += diceArray[i].value;
    }
  }
  // console.log(points, currentCell);
  insertScore(points, currentCell);
}

function addDisable() {}

function addPair(number) {
  let points = 0;
  let currentCell = getElements()[number];
  let duplicates = diceArray
    .map((x) => x.value)
    .reduce((acc, el, i, arr) => {
      console.log(acc, el, i, arr.indexOf(el));

      if (arr.indexOf(el) !== i && acc.indexOf(el) < 0) acc.push(el);
      return acc;
    }, [])
    .sort()
    .slice(-1)[0];
  points = duplicates * 2;
  insertScore(points, currentCell);
}

function addPairs(number) {
  let points = 0;
  let currentCell = getElements()[number];

  let duplicates = diceArray
    .map((x) => x.value)
    .reduce((acc, el, i, arr) => {
      console.log(acc, el, i, arr.indexOf(el));

      if (arr.indexOf(el) !== i && acc.indexOf(el) < 0) acc.push(el);
      return acc;
    }, [])
    .sort()
    .slice(-2);
  if (duplicates.length === 2) {
    points = duplicates.map((x) => x * 2).reduce((total, curr) => total + curr);
  }

  insertScore(points, currentCell);
}

function addThreeOfAKind(number) {
  let points = 0;
  let currentCell = getElements()[number];

  let triplets = diceArray.map((x) => x.value).sort();
  for (let i = 4; i >= 0; i--) {
    if (triplets[i + 1] == triplets[i] && triplets[i + 2] == triplets[i]) {
      points = triplets[i] * 3;
    }
  }

  insertScore(points, currentCell);
}

function addFourOfAKind(number) {
  let points = 0;
  let currentCell = getElements()[number];

  let quadruples = diceArray.map((x) => x.value).sort();
  for (let i = 4; i >= 0; i--) {
    if (
      quadruples[i + 1] == quadruples[i] &&
      quadruples[i + 2] == quadruples[i] &&
      quadruples[i + 3] == quadruples[i]
    ) {
      points = quadruples[i] * 4;
    }
  }

  insertScore(points, currentCell);
}

function addSmallStraight(number) {
  let points = 0;
  let currentCell = getElements()[number];

  let smallStraight = diceArray
    .map((x) => x.value)
    .filter((x) => x < 6)
    .sort();
  smallStraight = [...new Set(smallStraight)];
  console.log(smallStraight);
  if (smallStraight.length === 5) {
    points = smallStraight.reduce((total, curr) => total + curr);
  }

  insertScore(points, currentCell);
}

function addLargeStraight(number) {
  let points = 0;
  let currentCell = getElements()[number];

  let largeStraight = diceArray
    .map((x) => x.value)
    .filter((x) => x > 1)
    .sort();
  largeStraight = [...new Set(largeStraight)];
  console.log(largeStraight);
  if (largeStraight.length === 5) {
    points = largeStraight.reduce((total, curr) => total + curr);
  }

  insertScore(points, currentCell);
}

function addFullHouse(number) {
  let points = 0;
  let currentCell = getElements()[number];
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

  if (Object.values(amount).every((x) => x === 2 || x === 3)) {
    let firstKey = Number(Object.keys(amount)[0]);
    let secondKey = Number(Object.keys(amount)[1]);
    let firstValue = Number(Object.values(amount)[0]);
    let secondValue = Number(Object.values(amount)[1]);

    points = firstValue * firstKey + secondValue * secondKey;
    console.log(points);
  }
  insertScore(points, currentCell);
}

function addChance(number) {
  let points = 0;
  let currentCell = getElements()[number];

  points = diceArray.map((x) => x.value).reduce((total, curr) => total + curr);

  insertScore(points, currentCell);
}

function addYatzy(number) {
  let points = 0;
  let currentCell = getElements()[number];

  if (diceArray.map((x) => x.value).every((x) => x === dice1.value)) {
    points = 50;
    console.log(points);
  }
  insertScore(points, currentCell);
}

function resetStorage() {
  console.log(localStorage);
  localStorage.clear();
  console.log(localStorage);
}

window.addEventListener("DOMContentLoaded", resumePoints);
