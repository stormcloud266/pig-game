/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, sixes, winningScore;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
	if (gamePlaying) {
		document.querySelector('.winningScore').style.display = 'none';


		// 1. Random number
		var dice = Math.floor(Math.random() * 6) + 1;

		// 2. Display result
		var diceDOM = document.querySelector('.dice')
		diceDOM.style.display = 'block';
		diceDOM.src = 'dice-' + dice + '.png'

		// 3. Update round score if number != one
		if (dice === 1) {
			nextPlayer();
		} else if (dice === 6){
			roundScore += dice;
			sixes += 1;
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
		} else {
			roundScore += dice;
			sixes = 0;
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
		}

		if (sixes === 2){
			alert("whoops")
			roundScore = 0;
			scores[activePlayer] = 0;
			document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
			nextPlayer();
		}

		}
});

document.querySelector('.btn-hold').addEventListener('click', function(){
	if (gamePlaying){
		// add current score to global score
		scores[activePlayer] += roundScore;

		// update the ui
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

		//check if player won

		if (scores[activePlayer] >= winningScore){
			document.getElementById('name-' + activePlayer).textContent = 'You Win!';
			document.querySelector('.dice').style.display = 'none';
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			gamePlaying = false;
		} else {
			// next player
			nextPlayer();
		}
	}	
});

function nextPlayer() {
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	roundScore = 0;
	sixes = 0;

	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';

	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');

	document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);


function init() {
	scores = [0,0];
	roundScore = 0;
	activePlayer = 0;
	sixes = 0;
	// gamePlaying = true;
	winningScore = 100;

	document.querySelector('p').textContent = ' ';
	document.getElementById('winningScore').value = "";

	document.querySelector('.dice').style.display = 'none';
	document.querySelector('.winningScore').style.display = 'inline';

	document.getElementById('score-0').textContent = 0;
	document.getElementById('score-1').textContent = 0;
	document.getElementById('current-0').textContent = 0;
	document.getElementById('current-1').textContent = 0;
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');

	document.getElementById('winningScore').addEventListener("keyup", enterScore);

}


var filterInt = function(value) {
  if (/^(\-|\+)?([0-9]+|Infinity)$/.test(value)) {
  	return Number(value);
  } else {
  	return NaN;
  }
    
  
} 


function enterScore(event){
	event.preventDefault();
	var resetP = document.querySelector('p').textContent = "Win by getting ";


	if (event.keyCode === 13){
		// winningScore = 0;
		winningScore = this.value;
		document.querySelector('.winningScore').style.display = 'none';
		document.querySelector('p').textContent = resetP + winningScore;
		// gamePlaying = true;
		if (winningScore >= 1) {
			gamePlaying = true
		} else {
			alert("please enter valid number")
			init();
		}
	}
}















