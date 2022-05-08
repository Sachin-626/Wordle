Wordle

Working of wordle: 
  It is a web application game where we have to guess a five-letter word in six guesses (Number of guesses can be altered by making few changes in the code). If any letter is present in both (Guessed word and Actual Word) the words then it is marked as yellow and if it is also at its correct position in actual word then it is marked as green. If we succeed to guess the word in six guesses, then a toast message will be displayed.

Implementation:

  i.	HTML: 
    •	Created class “letter-row” for defining a row of five boxes which will contain the five-letter word.
    •	Class “letter-box” holds each letter of a word.
    •	Two buttons - New Game, View Answer (Do Work as their name suggests)
    •	Description Box- Displaying rules for the game

  ii.	CSS: 
    •	Did the styling part for the different classes we made in html file

  iii.	Word.js:
    •	Contains an array of five letter words that are valid in the game

  iv.	Script.js:
    •	Contains the work flow of the entire application
    •	Function such as:
        1.	insertLetter- inserting letter in boxes by keyboard and clicks on the screen keyboard
        2.	deleteLastLetter- delete the last letter inserted
        3.	helper- compares the guessed and actual word and marks the words as 
          yellow- present in both but guessed position is not correct 
          grey- not present in both the words
          green- present in both at the same position
        4.	painterFunction- marks the keyboard keys on screen as per our rules
        5.	flowController- Calls rest of the functions according to the key pressed
      
    •	Event Listeners for buttons such as “New Game”,” View Answer”
    •	Event Listeners for keyboard keys and mouse clicks
    •	Randomly selected a word (used Math.Random function) from the array in Word.js which contains the five letter words.





