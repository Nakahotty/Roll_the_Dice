/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. 
(Hint: Always save the previous dice roll in a separate variable)


2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined 
score of 100. (Hint: you can read that value with the .value property in JavaScript. 
This is a good oportunity to use google to figure this out :)


3. Add another dice to the game, so that there are two dices now. 
The player looses his current score when one of them is a 1. 
(Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

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

if (formInput) {
	userInput = ''; // THIS IS WHERE THE SCORE IS STORED INTO
	formInput.addEventListener('change', function() {
	    userInput = formInput.value;
	    document.querySelector('.test').textContent = 'THE FIRST PLAYER TO REACH ' + userInput + ' POINTS WINS!'
	}); 
}

document.querySelector(".btn-roll").addEventListener('click', function() {
	
	if(gamePlaying && userInput) {
			// 1. Random number
		var dice1 = Math.floor(Math.random() * 6) + 1;
		var dice2 = Math.floor(Math.random() * 6) + 1;

		// 2. Display the result
		document.getElementById('dice-1').style.display = 'block';
		document.getElementById('dice-2').style.display = 'block';
		document.getElementById('dice-1').src = 'dice-' + dice1 + '.png'; // Change the image 
		document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

		// 3. Update the round dscore IF the rollder number was NOT a 1
		if (dice1 !== 1 && dice2 !== 1) {
			// Add score
			roundScore += dice1 + dice2;
			document.querySelector("#current-" + activePlayer).textContent = roundScore;
		} else {
			// Next player
			nextPlayer();
		}

		// 4. If player rolls two 6 in a row loses scores[activePlayer]

		// --------------------- CHALLENGE 1 ----------------------
		lastDice = dice1 + dice2;				
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
			document.getElementById('dice-1').style.display = 'none';
			document.getElementById('dice-2').style.display = 'none';
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
    
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

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

		document.getElementById('dice-1').style.display = 'none';
		document.getElementById('dice-2').style.display = 'none';
}