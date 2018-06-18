// Game
// The shift() method removes the first element from an array and returns that removed element. 
// The splice() method changes the contents of an array by removing existing elements and/or adding new elements.

function totalGame () {
  this.drawingPile = []
  this.playedCards = []
  this.currentPlayer = 0
  this.isGameOver = false
  this.noOfTurn = 0
  this.explosionStatus = false
  this.knownCards = []
  this.moves = []
  this.player = []
}

totalGame.prototype.startGame = function () {
  this.player.push(new totalPlayer(), new totalPlayer())

  for (var i = 0; i < 4; i++) {
    this.drawingPile.push(new forceRun())
    this.drawingPile.push(new forcePush())
    this.drawingPile.push(new seeTheFuture())
    this.drawingPile.push(new attack())
    this.drawingPile.push(new aggro())
   this.drawingPile.push(new mindTrick())

    if (i === 3) {
      this.drawingPile.push(new defuse())
    }
  }

  game.shuffle()
  for (var i = 0; i < this.player.length; i++) {
    for (var j = 0; j < 4; j++) {
      this.player[i].cards.push(this.drawingPile[j])
     this.drawingPile.shift()
    }
    this.player[i].cards.push(new defuse())
  }

  this.drawingPile.push(new deathStar())
  game.shuffle()
  console.log(this)
  player1Timer()
}

totalGame.prototype.shuffle = function () {
  var i = this.drawingPile.length - 1
  while (i > 0) {
    num = Math.floor(Math.random() * this.drawingPile.length)
    var temp = this.drawingPile[i]
    this.drawingPile[i] = this.drawingPile[num]
    this.drawingPile[num] = temp
    i--
  }
}

totalGame.prototype.checkGameOver = function () {
  if (this.player[game.currentPlayer].cards.length === 0 ) {
    this.isGameOver = true
  }
  return this.isGameOver
}

totalGame.prototype.whoWon = function () {
  console.log('start');
  return 1 - this.currentPlayer

}

totalGame.prototype.switchPlayer = function () {
  if (this.currentPlayer === 1) {
    this.currentPlayer = 0
    showYourTurn()
  } else {
    this.currentPlayer = 1
  }
}

totalGame.prototype.restart = function () {
  this.drawingPile = []
  this.playedCards = []
  this.currentPlayer = 0
  this.isGameOver = false
  this.noOfTurn = 0
  this.explosionStatus = false
  this.knownCards = []
  this.moves = []
  this.player = []
  console.log('before', game)
  this.startGame()
  updateNotice()
  updateDisplay()
  console.log(game)

}

totalGame.prototype.checkTurns = function () {
  if (this.noOfTurn === 0) {
    this.switchPlayer()
  } else {
    this.noOfTurn -= 1
  }
}

totalGame.prototype.insertDeathStar = function (index) {
  var temp = this.drawingPile[0]

  if (index >= 0 && index <= 2) {
    this.drawingPile.shift()
    this.drawingPile.splice(index, 0, temp)
  } else if (index === 3) {
    this.drawingPile.shift()
    this.drawingPile.push(temp)
  } else if (index === 4) {
    this.shuffle()
  }
  this.checkTurns()
}
