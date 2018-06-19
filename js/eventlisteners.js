// The Approach
// Object-Oriented Programming methodology 
// Each card in the pile is an object, inherits unique property from it's parent class. 
// This unique property when be rendered when the card is played. 
// This approach allows us give a specific method to an object and to make the code cleaner


// Probabilistic decision tree model, each card is assigned with a score based on different scenario. 
// After the assessment, the card with the highest score will be played. 
// To ensure volatility of the virtual player, I added some randomness to each score assigned.


  var game = new totalGame();
// Main Event Listener using AJAX and jQuery
// use this method easier for game
// A new object is created — the first object.
// this is bound to our first object. So any references to this will point to first.
// Our __proto__ is added. first.__proto__ will now point to Student.prototype.
// After everything is done, our brand new first object is returned to our new first variable.

  $(document).ready(function () {
    // check if jQuery is ready
// ---------------Game Page------------------------

  // Player card clicks
  // off() removes all event handlers attached to .on
  // hide() simplest way to hide elements

    $('.player0Cards').off('click', 'div')
    $('.player0Cards').on('click', 'div', function () {
      $('.seeTheFutureBoard').hide()
      var index = $('.player0Cards div').index(this)
      // find out player's cards index
      // position allows us to retrieve the current position of an element (specifically its margin box) relative to the offset parent (specifically its padding box, which excludes margins and borders). 
      // makes the cards move from players hand to discard pile when clicked
      // to make the cards move respectively
      // The bind() method creates a new function that, when called, has its this keyword set to the provided value, with a given sequence of arguments preceding any provided when the new function is called
      // try to animate the cards with jQuery but aint working
      var positiony = $(this).position().top;
      var positionx = $(this).position().left;
      var desy = ($('.discardPile').position().top + 200) / 10;
      var desx = ($('.discardPile').position().left + parseInt($('.discardPile').css('height')) - $('.player0Cards').position().left - positionx) / 10;

      if (game.currentPlayer === 0 && game.isGameOver === false) {
        clearInterval(moveInterval)
        var moveInterval = setInterval(function () {
          if (desx <= 35 || desx <= -35) {
            positiony -= desy
          } else {
            positiony -= desy
            positionx += desx
          }
          $(this).css({
            height: 240,
            width: 180,
            top: positiony,
            left: positionx
          })
          // $(this).animate({
          //   height: 240,
          //   width: 180,
          //   top: positiony,
          //   left: positionx
          // }, 5000, function() {});

          if (positiony <= -desy * 10) {
            clearInterval(moveInterval)
            if (game.currentPlayer === 0) {
              game.player[game.currentPlayer].playTurn(index)
            }
          }
        }.bind(this), 1000 / 30)

        //
      } else {
        alert('Hold Up! It\'s not your turn yet!');
      }
    });

  // DrawingPile click
    $('.container').off('click', '.drawingPile')
    $('.container').on('click', '.drawingPile', function () {
      $('.seeTheFutureBoard').hide()
      if (game.currentPlayer === 0) {
        var positiony = $('.drawingPile:last-child').position().top
        var positionx = $('.drawingPile:last-child').position().left
        clearInterval(moveInterval)
        var moveInterval = setInterval(function () {
          positiony += 20
          positionx += 20
          $('.drawingPile:last-child').css({
            top: positiony,
            left: positionx
          })
          console.log(positiony)
          if (positiony >= parseInt($('body').css('height')) - 100) {
            $('.drawingPile:last-child').remove()
            if (game.currentPlayer === 0) {
              game.player[game.currentPlayer].drawCard(0)
            }
            clearInterval(moveInterval)
          }
        }, 1000 / 30)
      }
    });

  // select
  // to insert the death star card. Make sure i account for the card
    $('.select button').click(function () {
      var index = $(this).index()
      console.log('index', index)
      game.insertDeathStar((index - 1))
      $('.select').hide()
    });

  // -------------Game Page End----------------------

  // -------------Game Over Page---------------------

  // Restart
    $('#restart').click(function () {

      $('.gameOver').hide()
      $('.explosive').hide()
      $('.discardPile').removeAttr('id')
      $('#avatar0').removeAttr('style')
      $('#avatar1').removeAttr('style')
      clearInterval(countDown)
      game.restart()
    });

  // -------------Game Over End----------------------

  // -----------------Main Page----------------------
  // cardsProperties
  // hover over cars to show function of each card
    $('.cards div').hover(function () {
      var type = $(this).attr('id')
      $('.cards p').text(cardsProperties[type])
    },
    function () {
      $('.cards p').text('')
    }
  );

  // startGame Button
    $('.play button').click(function () {
      $('.main').hide()
      $('.game').fadeIn()
      game.startGame()
      updateNotice()
      updateCards()
    });

  // ---------------Main Page End---------------------
  });

// Update Game Interface
  function updateDisplay () {
    if (game.isGameOver === true) {
      $('.player1Explosive').remove()
      $('.gameOver').fadeIn()
      console.log('winner',game.whoWon());
      $('#avatar' + game.whoWon()).css({
        'border': '5px solid blue '
      })
    }

    if (game.playedCards.length > 0) {
      $('.discardPile').attr('id', game.playedCards[0].type)
    }

    $('.drawingPile').remove()
    $('.player0Cards div').remove()
    $('.player1Cards').remove()
    updateCards()
  }

// Show Explosive
  var explodingDeathStar
  function showExplosive () {
    if (game.currentPlayer === 0) {
      $('.explosive').fadeIn()
    } else {
      $('body').append('<div class="player1Explosive"></div>')
      var flashTime = 10
      clearInterval(explodingDeathStar)
      explodingDeathStar = setInterval(function () {
        flashTime -= 0.1
        $('.player1Explosive').fadeIn()
      .fadeOut()

        if (flashTime < 0) {
          clearInterval(explodingDeathStar)
          $('.player1Explosive').remove()
        }
      }, 500)
    }
  }

// Hide Explosive
  function hideExplosive () {
    clearInterval(explodingDeathStar)
    if (game.currentPlayer === 0) {
      $('.explosive').hide()
    } else {
      $('.player1Explosive').remove()
    }
  }

// update the board
  function updateNotice () {
    $('.notice h1').remove()
    $('.notice h2').remove()

    if (game.moves.length > 0) {
      if (Object.values(game.moves[0])[0] === 'draw') {
        $('.notice h3').text(' draw a card ')
        .prepend('<div class="avatar' + Object.keys(game.moves[0])[0] + '"></div>')
      } else if (Object.values(game.moves[0])[0] === 'mind-trick') {
        $('.notice h3').text(' got ')
        // The prepend() method inserts specified content at the beginning of the selected elements. for the avatar to pop up
        // append method - for inserting at the end
        .prepend('<div class="avatar' + Object.keys(game.moves[0])[0] + '"></div>')
        .append('<div  class="small-card" id="' + game.player[Object.keys(game.moves[0])[0]].cards[game.player[Object.keys(game.moves[0])[0]].cards.length - 1].type + '"></div> from')
        .append('<div class="avatar' + (1 - Object.keys(game.moves[0])[0]) + '"></div>')
      } else {
        $('.notice h3').text(' played ')
      .prepend('<div class="avatar' + Object.keys(game.moves[0])[0] + '"></div>')
      .append('<div  class="small-card" id="' + Object.values(game.moves[0])[0] + '"></div>')
      }
    }

    var timeout = setTimeout(function () {
      $('.notice h1').remove()
      $('.notice h2').remove()
      $('.notice h3').text('')
      $('.notice h3 div').remove()
      $('.notice').append('<h1>')
      $('.notice h1').text('\'s Turn')
      .prepend('<div class="avatar' + game.currentPlayer + '"></div>')
      if (game.noOfTurn !== 0) {
        $('.notice').append('<h2> x' + (game.noOfTurn + 1) + ' draw</h2>')
      }
    }, 3000)

    $('.explosive-meter h1').text((drawingPile.length) + ' cards')
  }

  function updateCards () {
    var align = 0
    for (var i = 0; i < drawingPile.length; i++) {
  //  alert($('.drawingPile').length)
      $('.relative').append('<div class="drawingPile">')
      $('.drawingPile:nth-child(' + (i + 1) + ')').css({
        'right': align + 'px'
      })
      align += 2
    }

    $('.player0Cards').css({
      'width': (50 * (game.player[0].cards.length - 2) + 200) + 'px'
    })

    var left = 0
    for (var i = 0; i < game.player[0].cards.length; i++) {
      $('.player0Cards').append('<div></div>')

      $('.player0Cards div:nth-child(' + (i + 1) + ')').css({
        'left': left + 'px'
      })
    .attr('id', game.player[0].cards[i].type)
      left += 50
    }

    for (var i = 0; i < game.player[1].cards.length; i++) {
      $('.player1').prepend('<div class="player1Cards"></div>')
    };

  // Player hover over selected card

    $('.player0Cards div').hover(function () {
      var index = $('.player0Cards div').index(this) + 1
      var height = $('.player0Cards div:nth-child(' + index + ')').css('height')
      var width = $('.player0Cards div:nth-child(' + index + ')').css('width')
      $('.player0Cards div:nth-child(' + index + ')').css({
        'height': parseInt(height) + 50 + 'px',
        'width': parseInt(width) + 36 + 'px'
      })
    },
  function () {
    var index = $('.player0Cards div').index(this) + 1
    var height = $('.player0Cards div:nth-child(' + index + ')').css('height')
    var width = $('.player0Cards div:nth-child(' + index + ')').css('width')
    $('.player0Cards div:nth-child(' + index + ')').css({
      'height': (parseInt(height) - 50) + 'px',
      'width': (parseInt(width) - 36) + 'px',
      'bottom': 0
    })
  })
  };

  function updateTime () {
    $('#time').text(Math.ceil(time))
  };

  function showTopCards () {
    console.log('Showing Top Cards')
    var length = 3
    if (drawingPile.length < length) {
      length = drawingPile.length
    }

    $('.seeTheFutureBoard div').removeAttr('id')
    for (var i = 0; i < length; i++) {
      $('.seeTheFutureBoard div:nth-child(' + (i + 2) + ')').attr('id', drawingPile[i].type)
    }

    $('.seeTheFutureBoard').fadeIn()
    $('.seeTheFutureBoard').delay(2000).fadeOut()
  };

  function showYourTurn () {
  // if (game.currentPlayer === 1) {
    $('.yourTurn').delay(500).fadeIn()
    $('.yourTurn').delay(500).fadeOut()
  // }
  };

  function showSelect () {
    $('.select').fadeIn()
  };


  function player1Draw () {
    var positiony = $('.drawingPile:last-child').position().top;
    var positionx = $('.drawingPile:last-child').position().left;
    clearInterval(moveInterval)
    var moveInterval = setInterval(function () {
      positiony -= 20
      positionx += 20
      $('.drawingPile:last-child').css({
        top: positiony,
        left: positionx
      })
      if (positiony <= parseInt($('body').position().top) - 100) {
        $('.drawingPile:last-child').remove()
        clearInterval(moveInterval)
        game.player[game.currentPlayer].drawCard(0)
      }
    }, 1000 / 30)
  };