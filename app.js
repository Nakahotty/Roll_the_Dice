/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var score, roundScore, activePlayer, gamePlaying, lastDice, formInput, userInput;

init();

// SETTER
// document.querySelector("#current-" + activePlayer).textContent = dice; // textcontent ADDS ONLY TEXTS
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>'; // THIS ADDS HTML

// GETTER
var x = document.querySelector('#score-0').textContent;
console.log(x);

document.querySelector('.dice').style.display = 'none';

document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';


// ----------------- CHALLENGE 2 ------------------------ //

// Undefined, 0, null or '' are COERCED to false 

formInput = document.getElementById('inputScore');

// THE FORM ACCEPTS ONLY NUMBERS --------------------------- 

function validate(evt) {
  var theEvent = evt || window.event;

  // Handle paste
  if (theEvent.type === 'paste') {
      key = event.clipboardData.getData('text/plain');
  } else {
  // Handle key press
      var key = theEvent.keyCode || theEvent.which;
      key = String.fromCharCode(key);
  }
  var regex = /[0-9]|\./;
  if( !regex.test(key) ) {
    theEvent.returnValue = false;
    if(theEvent.preventDefault) theEvent.preventDefault();
  }
}

if (formInput) {
	userInput = ''; // THIS IS WHERE THE SCORE IS STORED INTO
	formInput.addEventListener('change', function() {
	    userInput = formInput.value;
	    document.querySelector('.test').textContent = 'THE FIRST PLAYER TO REACH ' + userInput + ' POINTS WINS!'
	}); 
};

document.querySelector(".btn-roll").addEventListener('click', function() {
	
	if(gamePlaying && userInput) {
			// 1. Random number
		var dice = Math.floor(Math.random() * 6) + 1;

		// 2. Display the result
		var diceDOM = document.querySelector('.dice');
		diceDOM.style.display = 'block';  
		diceDOM.src = 'dice-' + dice + '.png'; // Change the image 


		// 3. Update the round dscore IF the rollder number was NOT a 1
		if (dice === 6 && lastDice === 6) {
			// Player loses score
			scores[activePlayer] = 0;
			document.getElementById('score-' + activePlayer).textContent = 0;
			nextPlayer();
		} else if (dice !== 1) {
			// Add score
			roundScore += dice;
			document.querySelector("#current-" + activePlayer).textContent = roundScore;
		} else {
			// Next player
			nextPlayer();
		}

		// 4. If player rolls two 6 in a row loses scores[activePlayer]
		// --------------------- CHALLENGE 1 ----------------------
		lastDice = dice;				
	}
}); 


document.querySelector('.btn-hold').addEventListener('click', function() {
	
	if (gamePlaying) {
			// Add CURRENT score to GLOBAL score
		scores[activePlayer] += roundScore;


		// Update the UI

		document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

		// Check if player won the game

		if (scores[activePlayer] >= userInput) {
			document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
			document.querySelector('.dice').style.display = 'none';
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			gamePlaying = false;
		} else {
			// Next player
			nextPlayer();
		}
	}
});
	 // document.location.reload(); // refreshes the page




document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}


function nextPlayer() {
	// Next player
		activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
		roundScore = 0;

		document.getElementById('current-0').textContent = '0';
		document.getElementById('current-1').textContent = '0';

		document.querySelector('.player-0-panel').classList.toggle('active');
		document.querySelector('.player-1-panel').classList.toggle('active');

		document.querySelector('.dice').style.display = 'none';
}
