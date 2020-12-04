class Dice {
  constructor(value, id) {
    this.value = value;
    this.id = document.getElementById(id);
  }
  rollDice() {
    this.id.src = "dice" + this.random() + ".png";
  }
  random() {
    return (this.value = Math.floor(Math.random() * 6 + 1));
  }

  yatzy() {
    if(dice1.value === dice2.value && dice1.value === dice3.value && dice1.value === dice4.value && dice1 === dice5.value && dice1.value === dice6.value)
     console.log('YATZY!');
  }

}
let dice1 = new Dice(1, "dice1");
let dice2 = new Dice(2, "dice2");
let dice3 = new Dice(3, "dice3");
let dice4 = new Dice(4, "dice4");
let dice5 = new Dice(5, "dice5");
let dice6 = new Dice(6, "dice6");
function rollAllDice() {
  dice1.rollDice();
  dice2.rollDice();
  dice3.rollDice();
  dice4.rollDice();
  dice5.rollDice();
  dice6.rollDice();
}
