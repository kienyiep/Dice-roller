'use strict';
// selecting element
// const score0El = document.querySelector('#score--0');
// now when we are selecting an ID, there is actually another way of selecting an element, and it will only works on ID, but not class. which is show at line below.
// In this way, we are just pass in the name of the ID, without the hash, because now we are not writing the selector, we are only passing the name of the ID that we are looking for.
// This method works exactly same as the previous method. But the getElementByID is supposed to be a little bit faster than the query selector. If you are selecting thousand of elements at once.
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.querySelector('#current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
// here we specify the number but not string,but the js will automatically convert them to string to actually display them on page.

// starting condition
// score0El.textContent = 0;
// score1El.textContent = 0;
// diceEl.classList.add('hidden');
// we will store the score of both players in an array.
// These scores are actually the final scores. So thee big scores which accumulate, which is the total score. Since the array is the 0 based so the score of player number 1 will be at the left side position 0, and the score of player number 2 will be at the right side position 1, and it will be handy to have the activePlayer variable set to 0 and 1.
// const score = [0, 0];
// let currentScore = 0;
// let activePlayer = 0; // remember player number 1 is player 0, and the player number 2 is the player 1.
// this current score cannot be inside of this function because it would be then set to 0 each time that we clicked the button.

// here we will create a variable to host the state of the game. So if we are still playing or not, so this is going to be a state variable, which kind of tell us the condition of the system. In this case, the condition will be is the game is playing or not.
// let playing = true;
let score, currentScore, activePlayer, playing;
const init = function () {
  // The variables that I defined here are only available inside this init function. Hence, the score, currentScore, activePlayer, and playing declared inside this function, will not be accessibled outside the function. So we say they are scoped to this init function. Hence, we need to declare these variables outside the function without any value.
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;

  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove(`player--winner`);
  player1El.classList.remove(`player--winner`);
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
btnRoll.addEventListener('click', function () {
  // 1) Generating a random dice roll.
  // Since playing variable is already a boolean variable, hence we do not need to set this variable equal to true.
  // Now when we click on this button, while the game is no longer playing then nothing will happen.
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2) Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3) check for rolled 1
    // remember from the first project, we should not just store any data in the DOM. So in this particular case, we should not just display the current score on the user interface. Instead we want the variable in our code, which always hold the current score of this current round.
    if (dice !== 1) {
      // Add dice to current score.
      currentScore += dice;
      // instead of manipulating the element of player 0, which is the current score of the player 0.
      // lets actually select the element dynamically, and now you can see why we use the active player as 0 or 1 as now we can use that variable to basically build the class name which are current--0 or current --1. So when it is player 0 then it will end up with current--0, and then if it is player 1 then it will end up with current--1.
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // here we always set the text content on player number 0, but now we will select the score element dynamically based on which is the active player right now.
      // current0El.textContent = currentScore;
    } else if (dice === 1) {
      // Switch to next player.
      //Before we switch to player number 2, we have to set the current score of the player number 1 back to 0.
      // So we need set the current score of the player no 1 to 0 here, before we do the switch.
      // document.getElementById(`current--${activePlayer}`).textContent = 0;
      // currentScore = 0;
      // activePlayer = activePlayer === 0 ? 1 : 0;
      // to reset the current score otherwise the currentScore of the player number 1 will be the continue added to the player number 2 which is not what we want.
      // currentScore = 0;
      // Here we will use the another method of the classList property, which is toggle method.
      // toggle method will add a class if the class is not there, and if it is there, it will remove it.
      // we can also do that manually by checking if the class is there, and only remove it if it is.
      // Hence we could have use the toggle method instead of using the contain method.

      // player0El.classList.toggle('player--active');
      // player1El.classList.toggle('player--active');
      switchPlayer();
    }
  }
});

// when a dice is rolled not one, then the current dice will be added to the current score.
// But if we rolled a one then we will lose all our score, then it is the next player turn.
// In the previous lecture, we only implement the functionality of adding the dice to the current score only as the player number 0. But now we need to make this work for both player number 0 and number 1.
// To do that, we need to keep track of which player is actually the current player. Hence, we need to keep track of which player is actually the active player in a moment that the dice was rolled. So we will create another variable called activePlayer which will hold exactly that. So it will hold 0, when the current player is 0, and it will hold 1, if the active player is player 1.
btnHold.addEventListener('click', function () {
  // 1) Add active score to the active player's score.
  // so here we will use the activePlayer variable to get the correct accumulated score of the current player .
  if (playing) {
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    // 2) Check if player's score is >=100
    if (score[activePlayer] >= 20) {
      playing = false;
      // finish the game
      // here we will need to remove the player--active class,because otherwise we will have the player--active class at the same time as the player--winner class.
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.a0dd(`player--winner`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);
    } else {
      switchPlayer();
    }
  }

  // switch to the next player.
});

btnNew.addEventListener('click', init);

// btnNew.addEventListener('click', function () {
//   playing = true;
//   currentScore = 0;
//   score[0] = 0;
//   score[1] = 0;
//   score0El.textContent = 0;
//   score1El.textContent = 0;
//   // document.querySelector(`#current--${activePlayer}`).textContent = 0;
//   current0El.textContent = 0;
//   current1El.textContent = 0;
//   // document
//   //   .querySelector(`.player--${activePlayer}`)
//   //   .classList.remove(`player--winner`);

//   player0El.classList.remove(`player-winner`);
//   player1El.classList.remove(`player-winner`);
//   // document
//   //   .querySelector(`.player--${activePlayer}`)
//   //   .classList.add(`player--active`);

//   player0El.classList.add('player--active');
//   player1El.classList.remove('player--active');
// });
