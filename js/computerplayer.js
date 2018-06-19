// Check if it is computer AI's turn every 5 seconds
// The Object.keys() method returns an array of a given object's property names, in the same order as we get with a normal loop.
// The includes() method determines whether an array includes a certain element, returning true or false as appropriate.

var checkPlayer;

function player1Timer() {
    clearInterval(checkPlayer)
checkPlayer = setInterval(function () {
  if (game.currentPlayer === 1) {
    computerPlayer()
  }
}, 5000)
};

// computer logic
// still playing too many cards
function computerPlayer () {
  var currentCards = {}

// iterating through type of card
  for (var i = 0; i < game.player[1].cards.length; i++) {
    currentCards[game.player[1].cards[i].type] = 0
  }
  currentCards['draw'] = 20
  console.log(currentCards)

  // Use defuse when explosion status is true
  // if dont have should it go through the countdown?
  // if theres defuse, computer must use
  if (game.explosionStatus === true) {
    alert('The Computer has drawn an exploding Death Star Card!');
    if (Object.keys(currentCards).includes('defuse')) {
      currentCards['defuse'] = 1000
    } else {
      alert('The Computer does not have a Defuse Card')
      clearInterval(checkPlayer)
      clearInterval(countDown)
      game.isGameOver = true
    }
    currentCards['draw'] = -20000
  } else {
  // Evaluate probabilty when explosion status is not true
  // 
    if (game.explosionStatus !== true) {
      if (Object.keys(currentCards).includes('defuse')) { currentCards['defuse'] -= 500 * randomness() }
// 550
      if (game.player[0].moves[0] === 'force-push' || game.player[0].moves[0] === 'attack') {
        if (Object.keys(currentCards).includes('see-the-future')) { currentCards['see-the-future'] += 150 * randomness() }
        if (Object.keys(currentCards).includes('force-run')) { currentCards['force-run'] += 100 * randomness() }
        if (Object.keys(currentCards).includes('aggro')) { currentCards['aggro'] += 100 * randomness() }
        if (Object.keys(currentCards).includes('force-push')) { currentCards['force-push'] += 100 * randomness() }
        if (Object.keys(currentCards).includes('attack')) { currentCards['attack'] += 100 * randomness() }
        currentCards['draw'] += 80 * randomness()
      }

      if (game.player[0].moves.length > 1) {
        if (game.player[0].moves[1] === 'see-the-future' && (game.player[0].moves[0] === 'force-push' || game.player[0].moves[0] === 'attack' || game.player[0].moves[0] === 'aggro')) {
          if (Object.keys(currentCards).includes('force-run')) { currentCards['force-run'] += 200 * randomness() }
          if (Object.keys(currentCards).includes('see-the-future')) { currentCards['see-the-future'] += 50 * randomness() }
          if (Object.keys(currentCards).includes('force-push')) { currentCards['force-push'] += 200 * randomness() }
          if (Object.keys(currentCards).includes('draw')) { currentCards['draw'] -= 200 }
          if (Object.keys(currentCards).includes('aggro')) { currentCards['aggro'] += 200 * randomness() }
        }
      }

      if (game.player[0].moves[0] === 'defuse') {
        if (Object.keys(currentCards).includes('mind-trick')) { currentCards['mind-trick'] += 100 * randomness() }
        if (Object.keys(currentCards).includes('force-run')) { currentCards['force-run'] += 80 * randomness() }
        if (Object.keys(currentCards).includes('force-push')) { currentCards['force-push'] += 100 * randomness() }
        currentCards['draw'] += 80 * randomness()
      }

      if (game.player[0].moves[0] === 'draw') {
        currentCards['draw'] += 50 * randomness()
        if (Object.keys(currentCards).includes('force-run')) { currentCards['force-run'] += 100 * randomness() }
        if (Object.keys(currentCards).includes('see-the-future')) { currentCards['see-the-future'] += 100 * randomness() }
      }

      if (game.player[0].moves[0] === 'force-run') {
        currentCards['draw'] += 1000
        if (Object.keys(currentCards).includes('force-run')) { currentCards['force-run'] -= 500 * randomness() }
      }

      if (game.playedCards.length === 0) {
        currentCards['draw'] += 10
      }

      if (1 / drawingPile.length > 0.20 && game.knownCards.length === 0) {
        if (Object.keys(currentCards).includes('see-the-future')) { currentCards['see-the-future'] += 100 * randomness() }
      }

      if (game.knownCards.length > 0) {
        if (Object.keys(currentCards).includes('see-the-future')) { currentCards['see-the-future'] -= 100 * randomness() }

        if (game.knownCards[0].type === 'death-star') {
          if (game.player[0].moves[0].includes('defuse')) {
            if (Object.keys(currentCards).includes('force-push')) { currentCards['force-push'] += 200 * randomness() }
            if (Object.keys(currentCards).includes('attack')) { currentCards['attack'] += 200 * randomness() }
          } else {
            if (Object.keys(currentCards).includes('mind-trick')) { currentCards['mind-trick'] += 200 * randomness() }
          }

          if (Object.keys(currentCards).includes('force-run')) { currentCards['force-run'] += 100 * randomness() }
          if (Object.keys(currentCards).includes('aggro')) { currentCards['aggro'] += 100 * randomness() }
          currentCards['draw'] -= 200
        }

        if (game.player[0].cards.length < 4) {
          if (Object.keys(currentCards).includes('mind-trick')) { currentCards['mind-trick'] += 200 * randomness() }
        }

        if (Object.keys(currentCards).includes('defuse') !== true) {
          if (Object.keys(currentCards).includes('mind-trick')) { currentCards['mind-trick'] += 300 * randomness() }
        }
      }

      if (1 / drawingPile.length === 1) {
        currentCards['draw'] -= 200
      }

      if (game.player[1].moves.length > 1) {
        if (game.player[1].moves[0] === 'see-the-future') {
          if (Object.keys(currentCards).includes('see-the-future')) { currentCards['see-the-future'] -= 500 * randomness() }
        }

        if (game.player[1].moves[0] === 'force-run') {
          if (Object.keys(currentCards).includes('force-run')) { currentCards['force-run'] -= 500 * randomness() }
        }
      }
    }
  };
// replaces the -500 with the highest probability and the '' with the corresponding key
  var max = ['', -500]
  for (var key in currentCards) {
    if (currentCards[key] > max[1]) {
      max[0] = key
      max[1] = currentCards[key]
    }
  };

  console.log('ai')
  if (max[0] === 'draw') {
    player1Draw()
  } else {
    for (var i = 0; i < game.player[1].cards.length; i++) {
      if (game.player[1].cards[i].type === max[0]) {
        game.player[game.currentPlayer].playTurn(i)
        break
      }
    }
    // drawCard();
  }
};

// returns a random number from 0.1-1
function randomness () {
  var randomValue = Math.random()
  if (randomValue < 0.5) {
    randomValue += 0.1
  }
  return randomValue
};