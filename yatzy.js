const randomDiceNumber = () =>
  (document.getElementById("dice1").src =
    "dice" + Math.floor(Math.random() * 6 + 1) + ".png");
