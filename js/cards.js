// Cards and Cards' Methods

// follow this website https://oli.me.uk/2013/06/01/prototypical-inheritance-done-right/
// Cards properties stored as objects and their functions
// render code to specific images
var cardsProperties = {
  'death-star': 'Unless you have a defuse card, you\'re dead!',
  'attack': 'End your turn without drawing a card and makes the next player take 2 turns instead. (If you counter an ATTACK card with an ATTACK card, your turn ends and the next player takes 2 turns.)',
  'force-push': 'Immediately end your turn without drawing a card. If you play a FORCE PUSH card against an ATTACK card, it only ends 1 of the 2 turns.',
  'mind-trick': 'Force another player to give you 1 card from their hand.',
  'force-run': 'Shuffle the Draw Pile without viewing the cards.',
  'see-the-future': 'Peek at the 3 upcoming cards from the Draw Pile.',
  'aggro': 'Draw a card from the bottom of the Draw Pile.',
  'defuse': 'Save yourself from the exploding Death Star.'
}

// function of each card
function forceRun () {
  this.type = 'force-run'
}

function deathStar () {
  this.type = 'death-star'
}

function defuse () {
  this.type = 'defuse'
}

function forcePush () {
  this.type = 'force-push'
}

function attack () {
  this.type = 'attack'
}

function seeTheFuture () {
  this.type = 'see-the-future'
}

function aggro () {
  this.type = 'aggro'
}

function mindTrick () {
  this.type = 'mind-trick'
}

// Cards Methods
// The JavaScript prototype property also allows you to add new methods to objects constructors
// render to specific images
// prototype  The this keyword is mapped to the new object instance. In this case that would be el. 
// So when this._id = id; is executed it’s actually assigning the id argument to the new el object that new Element(...) created.

forceRun.prototype.render = function () {
  game.shuffle()
}

seeTheFuture.prototype.render = function () {
  console.log('See The Future Started')

  if (game.currentPlayer === 0) {
    showTopCards()
  } else {
    game.knownCards = game.drawingPile.slice(0, 3)
  }
}

forcePush.prototype.render = function () {
  console.log('Force Push Started')
  game.checkTurns()
  console.log('Force Push Ended, current player is', game.currentPlayer)
}

defuse.prototype.render = function () {
  console.log('Defuse Started')

  clearInterval(countDown)
  game.explosionStatus = false
  hideExplosive()

  if (game.drawingPile[0].type === 'death-star') {
    if (game.currentPlayer === 0) {
      showSelect()
    } else {
      game.shuffle()
      game.checkTurns()
    }
  }
  console.log('Defuse Ended')
}

attack.prototype.render = function () {
  console.log('Attack Cards Started')
  game.switchPlayer()
  if (game.noOfTurn === 0) {
    game.noOfTurn += 1
  } else {
    game.noOfTurn += 2
  }
  console.log('Attack Cards Ended, current player is', game.currentPlayer)
}

var countDown
var time
deathStar.prototype.render = function () {
  alert('The Death Star card has been drawn!')
  console.log('explosion Started')

  game.explosionStatus = true
  showExplosive()

  time = 10
  clearInterval(countDown)
  countDown = setInterval(function () {
    time -= 0.1
    updateTime()
    console.log(time);
    if (time < 0) {
      game.isGameOver = true
      game.whoWon()
      clearInterval(explodingDeathStar)
      hideExplosive()
      clearInterval(countDown)
      updateDisplay()
    }
  }, 100)

  console.log('explosion Ended')
}

aggro.prototype.render = function () {
  console.log('draw', this)
  console.log('Aggro Started')
  game.player[game.currentPlayer].drawCard(game.drawingPile.length - 1)
  console.log('Aggro Ended')
}

mindTrick.prototype.render = function () {
  console.log('Mind Trick Cards Started')
  var num = Math.floor((Math.random()) * game.player[1 - game.currentPlayer].cards.length)

  game.player[game.currentPlayer].cards.push(game.player[1 - game.currentPlayer].cards[num])
  game.player[1 - game.currentPlayer].cards.splice(num, 1)
  console.log('Mind Trick Ended')
}