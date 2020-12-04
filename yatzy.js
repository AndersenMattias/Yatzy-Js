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
  constructor(id, name, setActivePlayer) {
    this.id = id;
    this.name = name;
    this.setName();
    this.setActivePlayer = setActivePlayer;
  }
  setName() {
    document.getElementById("player" + this.id).innerHTML = this.name;
  }
}

function nextPlayer() {
  player(activePlayer).setActivePlayer = true;
}
function init() {
  let player1 = new Player(1, "Göran", false);
  let player2 = new Player(2, "Bengt", false);
  let player3 = new Player(3, "Gunhild", false);
  let player4 = new Player(4, "Sven-Bertil", false);

  let dice1 = new Dice(1, "dice1");
  let dice2 = new Dice(2, "dice2");
  let dice3 = new Dice(3, "dice3");
  let dice4 = new Dice(4, "dice4");
  let dice5 = new Dice(5, "dice5");
  let dice6 = new Dice(6, "dice6");
  let activePlayer = 1;
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

init();
