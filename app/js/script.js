var symbols = ['bicycle', 'bicycle', 'leaf', 'leaf', 'cube', 'cube', 'anchor', 'anchor', 'paper-plane-o', 'paper-plane-o', 'bolt', 'bolt', 'bomb', 'bomb', 'diamond', 'diamond'],
    opened = [], // to store the clicked element
    match = 0,
    moves = 0,
    $deck = $('.deck'),
    movesCount = $('.moves'),
    leftToMatch = $('.match'),
    starRating = $('i'),
    restart = $('.restart'),
    cardQuantity = symbols.length / 2,
    star3Rank = cardQuantity + 6,
    star2Rank = cardQuantity + 10,
    star1Rank = cardQuantity + 14;

/* ------------------------------------ Shuffle function ------------------------------------ */
// Unbiased shuffle algorithm by Fisher-Yates (aka Knuth) Shuffle
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array

function shuffle(array) {
  var currentIndex = array.length;
  var temporaryValue;
  var randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

/* ------------------------------------ Game Initiation ------------------------------------- */

function initGame() { // function for initiating the game
  var trumpet = $('#trumpet')[0];
  trumpet.play();
  var cards = shuffle(symbols); // shuffle function used to randomize //
  $deck.empty(); // empty all elements li from the deck when game is initiated
  match = 0; // match set to zero
  moves = 0; // moves set to zero
  movesCount.text('Make '); // default text for moves counter
  leftToMatch.html('16');
  starRating.removeClass('fa-star-o').addClass('fa-star'); // resetting the class for star elements
  for (var i = 0; i < cards.length; i++) { // loop for deck elements "li"
    $deck.append($('<li class="card"><i class="fa fa-' + cards[i] + '"></i></li>')); // "li" appended with element "i" and symbols
  };

  CardListener(); // function to perform various checks and matching needed for the game
};

/* --------------------------------- Rating Functionality ----------------------------------- */

// Set Rating and final Score
function setRating(moves) {
  var rating = 3; // default rating set from three

  if (moves > star3Rank && moves < star2Rank) {
    starRating.eq(2).removeClass('fa-star').addClass('fa-star-o');
    rating = 2; // rating change based on number of the moves
  } else if (moves > star2Rank && moves < star1Rank) {
    starRating.eq(1).removeClass('fa-star').addClass('fa-star-o');
    rating = 1; // rating change based on number of the moves
  } else if (moves > star1Rank) {
    starRating.eq(0).removeClass('fa-star').addClass('fa-star-o');
    rating = 0; // rating change based on number of the moves
  }

  return {
      score: rating,
    }; // return an object with the rating earned
};

/* --------------------------------------- Game Restart -------------------------------------- */

restart.bind('click', function () {
    swal({ // restart pop up
        allowEscapeKey: false,
        allowOutsideClick: false,
        title: 'Game restart?',
        text: 'You will lose your progress!!!',
        type: 'warning',
        showCancelButton: true, // option to cancel
        confirmButtonColor: '#02ccba',
        cancelButtonColor: '#f95c3c',
        confirmButtonText: 'Yes, Restart Game!',
      }).then(function (isConfirm) { // if confirmed
        if (isConfirm) {
          var gong = $('#gong')[0];
          gong.play();
          setTimeout(function () {
              initGame();
            }, 1000); // delay by 1 second
        };
      });
  });

/* ------------------------------------- Game conclusion ------------------------------------- */

function endGame(moves, score) {
  swal({ // pop up at game winning
      allowOutsideClick: false,
      allowEscapeKey: false,
      title: 'We have a Winner!!!',
      text: 'With ' + moves + ' Moves and ' + score + ' Stars.',
      type: 'success',
      confirmButtonColor: '#02ccba',
      confirmButtonText: 'Would like to play again?',
    }).then(function (isConfirm) {
      if (isConfirm) { // if yes game start again
        initGame();
      };
    });
};

/* ------------------------------------- checks and matches ------------------------------------ */

var CardListener = function () {

    $deck.find('.card').not('.match, .open').bind('click', function () { // followup function to when no class match or open

        if ($('.show').length > 1) { return true; }

        var $this = $(this),
            card = $this[0].innerHTML; // assign innerHTML of the selected element to card

        $this.addClass('open show'); // required class added
        opened.push(card); // innerHTML of the selected item pushed in the opened array

        if (opened.length > 1) { // if some element in opened array, perform this

          if (card === opened[0]) {
            $deck.find('.open').addClass('match gone'); // add class when element is matched with elements in opened array
            var chime = $('#chime')[0]; // sound
            chime.play();
            setTimeout(function () {
                $deck.find('.match').removeClass('open show');
              }, 800); // delay by .8 second

            match++;
          } else { // when element did not match
            $deck.find('.open').addClass('notmatch animated wobble');
            var blurp = $('#blurp')[0]; // sound
            blurp.play();
            // setTimeout(function () {
            //     deck.find('.open').removeClass('animated wobble');
            // }, 400); // delay by .4 second
            setTimeout(function () {
                $deck.find('.open').removeClass('open show notmatch animated wobble');
              }, 500); // delay by .5 second
          }

          opened = [];
          moves++; // counter
          setRating(moves); // function with moves parameter
          movesCount.html(moves); // DOM manupulation for Star Rating
          var toMatch = (8 - match) * 2; // variable created to show number of cards left
          leftToMatch.html(toMatch); // DOM manupulation for showing number of card left

        }

        if (cardQuantity === match) { // if all cards matched, end the game
          setRating(moves); // rating checked and given
          var score = setRating(moves).score;
          setTimeout(function () {
              endGame(moves, score); // function endGame
              setTimeout(function () {
                  var applause = $('#applause')[0];
                  applause.play();
                }, 800); // delay by .8 second
            }, 500); // delay by .4 second
        }
      });
  };

initGame(); // main function initiated
