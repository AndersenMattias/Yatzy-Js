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

  insertValue() {
    let td1 = document.getElementById("ones1");
    td1.innerHTML = 5;

    let td2 = document.getElementById("ones2");
    td2.innerHTML = 3;
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

let playersArray = [player1, player2, player3, player4];

let dice1 = new Dice(1, "dice1");
let dice2 = new Dice(2, "dice2");
let dice3 = new Dice(3, "dice3");
let dice4 = new Dice(4, "dice4");
let dice5 = new Dice(5, "dice5");
let dice6 = new Dice(6, "dice6");
let activePlayer = 1;

let td = document.getElementsByTagName("td");
let tdList1 = [];
let tdList2 = [];
let tdList3 = [];
let tdList4 = [];
let tdList = [tdList1, tdList2, tdList3, tdList4];
for (let i = 0; i < td.length; i++) {
  const element = td[i];
  if (element.id.indexOf("1") >= 0) {
    tdList1.push(element);
  }
  if (element.id.indexOf("2") >= 0) {
    tdList2.push(element);
  }
  if (element.id.indexOf("3") >= 0) {
    tdList3.push(element);
  }
  if (element.id.indexOf("4") >= 0) {
    tdList4.push(element);
  }
}

function nextPlayer() {
  let lastPlayer = "player" + activePlayer;
  let lastPlayerArray = "tdList" + activePlayer;
  activePlayer++;
  activePlayer > 4 ? (activePlayer -= 4) : "";
  let player = "player" + activePlayer;
  let tdList = "tdList" + activePlayer;
  document.getElementById("ones" + activePlayer).innerHTML = 75;
  document.getElementsByTagName("td");
  for (let i = 0; i < tdList.length; i++) {
    const element = tdList[i];
    console.log(element);
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
}

function calcSum() {
  let input1 = document.getElementById("ones1");
  let input2 = document.getElementById("twos1");
  let input3 = document.getElementById("threes1");
  let input4 = document.getElementById("fours1");
  let input5 = document.getElementById("fives1");
  let input6 = document.getElementById("sixes1");

  let sum =
    parseInt(input1.innerHTML) +
    parseInt(input2.innerHTML) +
    parseInt(input3.innerHTML) +
    parseInt(input4.innerHTML) +
    parseInt(input5.innerHTML) +
    parseInt(input6.innerHTML);
  console.log(sum);
  document.getElementById("sum1").innerHTML = sum;
  if (sum > 63) {
    document.getElementById("bonus1").innerHTML = 50;
  }
}

init();
