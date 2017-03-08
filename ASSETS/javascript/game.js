var index =['ghost', 'papa', 'ghoul', 'spirit', 'square', 'hammer', 'pinnacle', 'pit'];//word pool
var currentword = [];//stores current word selected from index for comparative purposes
var gameWord = [];//stores the dashes equal to the length of current word
var guessLetter;//current guessed letter
var prevLetters = [];//stores letters guessed from current round
var success=false;
var roundOver=false;
var roundCount=0;//used to determine if round continues or win condition achieved
var numGuesses=6;//stores number of guesses left for current round
var wins=0;//stores number of times user won
var losses=0;//stores number of times user has lost
var SH = new Audio('ASSETS/images/squarehammer.mp3');
SH.play();
var youWon = new Audio('ASSETS/images/power.mp3');
var youLost = new Audio('ASSETS/images/to-the-pits.mp3');
var randIndex=Math.floor(Math.random() * 7);//generates random number to pull word for game from index
currentword = index[randIndex].toString();//turns index array selection into a string which is split array currentword
gameWord.splice(0,gameWord.length);//clears out all information in gameWord
for (var i = 0; i < currentword.length; i++) //assigns '-' to positions equal to currentword's length 
{
	gameWord[i]='-';
}

document.onkeyup = function(event) //function that grabs key stroke from user
{
 guessLetter = event.key;//stores input to guessLetter
 guessLetter = guessLetter.toLowerCase();//changes saved entry to lowercase
 document.getElementById("curLetter").innerHTML=guessLetter;//displays current letter
 document.getElementById("showWord").innerHTML=gameWord.join(" ");//displays game word
 prevLetters.push(guessLetter);//shows current key entry to screen
 document.getElementById("guessLetters").innerHTML=prevLetters.join(" ");//adds and displays words guessed
 checkGuess();//calls function to perform logic of game
}
function checkGuess()
{
	for (var i = 0; i < gameWord.length; i++)//checks current guess against current word to determine if match was achieved
	{
		if(guessLetter==currentword[i])
		{
			gameWord[i]=currentword[i];
			success=true;

		}
	}
	if (success===false) //if the guess was wrong
	{

		numGuesses--;//removes a guess
	
	}


	for (var x = 0; x < gameWord.length; x++)//checks game word array to see if all letters have been guessed 
	{
		if (gameWord[x]==='-')//if there is still a letter left to guess 
		{
			roundCount++;//any increment above zero indicates round continues
		}
	}

	if(roundCount===0)//if there are no more letters to guess
	{
		roundOver=true;
	}
	if (roundCount>0)//if there were still letters left to guess
	{
		roundCount=0;
	}

	if (roundOver===true)//if all the letters have been guessed
	{
		youWon.play();
		randIndex=Math.floor(Math.random() * 7);//generate random number for word index
		currentword = index[randIndex].toString();//converts index value to array
		gameWord.splice(0,gameWord.length);//resets the game word to be empty
		for (var i = 0; i < currentword.length; i++) //adds '-' based on length of current word
		{
			gameWord[i]='-';
		}
		roundOver=false;//resets whether the round is over
		wins++;//adds a win for the user
		prevLetters.splice(0,prevLetters.length);//resets the letters guessed for a new round
		document.getElementById("showWord").innerHTML=gameWord.join(" ");//resets screen
 		document.getElementById("guessLetters").innerHTML=prevLetters.join(" ");//resets screen
		numGuesses=6;//resets number of guesses for new round


	}

	if(numGuesses===0)//if you've run out of guesses
	{
		youLost.play();
		losses++;//gives user a loss
		randIndex=Math.floor(Math.random() * 7);//generate random number for word index
		currentword = index[randIndex].toString();//converts index value to array
		gameWord.splice(0,gameWord.length);//resets the game word to be empty
		for (var i = 0; i < currentword.length; i++)//adds '-' based on length of current word 
		{
			gameWord[i]='-';
		}
		roundOver=false;//resets value for new round
		prevLetters.splice(0,prevLetters.length);//resets previous numbers guess to be empty
		document.getElementById("showWord").innerHTML=gameWord.join(" ");//resets the display
 		document.getElementById("guessLetters").innerHTML=prevLetters.join(" ");//resets the display
		numGuesses=6;//resets the number of guesses for a new round
	}

	document.getElementById("showWord").innerHTML=gameWord.join(" ");//displays the word to guess
	document.getElementById("guessNum").innerHTML=numGuesses;//displays number of guesses left
	document.getElementById("wins").innerHTML=wins;//displays wins
	document.getElementById("losses").innerHTML=losses;//displays losses
	success=false;//resets whether a guessed letter has been matched

}

