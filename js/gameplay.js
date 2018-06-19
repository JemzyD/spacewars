// Game
// The shift() method removes the first element from an array and returns that removed element. 
// The splice() method changes the contents of an array by removing existing elements and/or adding new elements.

var drawingPile = [];

function totalGame () {
  this.playedCards = []
  this.currentPlayer = 0
  this.isGameOver = false
  this.noOfTurn = 0
  this.explosionStatus = false
  this.knownCards = []
  this.moves = []
  this.player = []
};

totalGame.prototype.startGame = function () {
  this.player.push(new totalPlayer(), new totalPlayer())

  for (var i = 0; i < 4; i++) {
    drawingPile.push(new forceRun())
    drawingPile.push(new forcePush())
    drawingPile.push(new seeTheFuture())
    drawingPile.push(new attack())
    drawingPile.push(new aggro())
   drawingPile.push(new mindTrick())

    if (i === 3) {
      drawingPile.push(new defuse())
    }
  };

  game.shuffle()
  for (var i = 0; i < this.player.length; i++) {
    for (var j = 0; j < 4; j++) {
      this.player[i].cards.push(drawingPile[j])
     drawingPile.shift()
    }
    this.player[i].cards.push(new defuse())
  }

  drawingPile.push(new deathStar())
  game.shuffle()
  console.log(this)
  player1Timer()
};

totalGame.prototype.shuffle = function () {
  console.log(drawingPile);
  var i = drawingPile.length - 1;
  while (i > 0) {
    var num = Math.floor(Math.random() * drawingPile.length);
    console.log(num);
    var temp = drawingPile[i];
    console.log(temp);
    drawingPile[i] = drawingPile[num];
    console.log(drawingPile[i], drawingPile[num]);
    drawingPile[num] = temp;
    console.log(drawingPile[i], drawingPile[num]);
    i--;
  }
};

totalGame.prototype.checkGameOver = function () {
  if (this.player[game.currentPlayer].cards.length === 0 ) {
    this.isGameOver = true
  }
  return this.isGameOver
};

totalGame.prototype.whoWon = function () {
  console.log('start');
  return 1 - this.currentPlayer

};

totalGame.prototype.switchPlayer = function () {
  if (this.currentPlayer === 1) {
    this.currentPlayer = 0
    showYourTurn()
  } else {
    this.currentPlayer = 1
  }
};

totalGame.prototype.restart = function () {
  drawingPile = []
  this.playedCards = []
  this.currentPlayer = 0
  this.isGameOver = false
  this.noOfTurn = 0
  this.explosionStatus = false
  this.knownCards = []
  this.moves = []
  this.player = []
  this.startGame()
  updateNotice()
  updateDisplay()
};

totalGame.prototype.checkTurns = function () {
  if (this.noOfTurn === 0) {
    this.switchPlayer()
  } else {
    this.noOfTurn -= 1
  }
};

totalGame.prototype.insertDeathStar = function (index) {
  var temp = drawingPile[0]

  if (index >= 0 && index <= 2) {
    drawingPile.shift()
    drawingPile.splice(index, 0, temp)
  } else if (index === 3) {
    drawingPile.shift()
  .drawingPile.push(temp)
  } else if (index === 4) {
    this.shuffle()
  }
  this.checkTurns()
};
