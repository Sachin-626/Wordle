import { WORDS } from "./words.js";

const NUMBER_OF_GUESSES = 6;
let numberOfRemainingGuesses = NUMBER_OF_GUESSES;
let currentGuess = [];
let letterIndex = 0;
let rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)]
console.log(rightGuessString)

const reloadButton = document.querySelector("#newGame");
const viewAnswer = document.querySelector("#viewAnswer");

//Event listeners for New Game Button
reloadButton.addEventListener("click", (e) =>{
    reload = location.reload()
});

//Event Listener for View Answer
viewAnswer.addEventListener("click",(e) => {
    viewAnswer.innerHTML = rightGuessString;
    setTimeout(() => {
        viewAnswer.innerHTML = "View Answer";
    },1000)
});


//Event Listeners for keyboard inputs
document.addEventListener("keyup",(e) => {
    let keyPressed = String(e.key)
    flowController(keyPressed)
})

//Decides the calls for the functions according to key pressed
function flowController(keyPressed){
    switch (keyPressed) {
        case "Enter":
            helper()            //compare the word guessed with actual word and colours the 
            break;              // buttons which help us to guess the word

        case "Backspace":
            deleteLastLetter()
            break;

        default:
            insertLetter(keyPressed)
    }
}

//Event Listener for keyboard clicks on screen
var arr = document.getElementsByClassName("keyboard-button");
for(var i=0;i<arr.length;i++){
    arr[i].addEventListener("click",handleClick);
}

function handleClick(event){
    var keyPressed = this.innerHTML;
    console.log(keyPressed)
    flowController(keyPressed)
}

function insertLetter(keyPressed){
    //The match() method matches a string against a regular expression **
    //The match() method returns an array with the matches.
    //The match() method returns null if no match is found.
    //return type:array of matches or null
    //g - global search, i- case insensitive
    let found = keyPressed.match(/[a-z]/gi)
    if (found.length > 1) {
        return
    }
    if (found) {
        if (letterIndex == 5) {
            return
        }
        keyPressed = keyPressed.toLowerCase()
        let box = document.getElementsByClassName("letter-row")[6 - numberOfRemainingGuesses].children[letterIndex]
        box.textContent = keyPressed;
        currentGuess[letterIndex] = keyPressed;
        letterIndex += 1;
    }
}

function deleteLastLetter(){
    if (letterIndex === 0) {
        return
    }
    let box = document.getElementsByClassName("letter-row")[6 - numberOfRemainingGuesses].children[letterIndex - 1]
    box.textContent = ""
    currentGuess.pop()
    letterIndex -= 1
}

//Compares the actual and guessed word and mark the words with the colour according to the rules
function helper() {
    let row = document.getElementsByClassName("letter-row")[6 - numberOfRemainingGuesses]
    let guessString = ''
    let rightGuess = Array.from(rightGuessString)

    for(let i=0;i<rightGuess.length;i++){
        guessString += currentGuess[i]
    }

    if (guessString.length != 5) {
        alert("Not enough letters!")
        return
    }

    if (!WORDS.includes(guessString)) {
        toastr.error("Word not in list!")
        setTimeout(() =>{                   
            while(letterIndex != 0){
                deleteLastLetter();     //Deletes the word that's not in the word list from the screen
            }
        },1000)
        return
    }

    for (let i = 0; i < currentGuess.length; i++) {
        let letterColor = ''
        let box = row.children[i]
        let letter = currentGuess[i]

        let letterPosition = -1;
        for(let j=0;j<rightGuess.length;j++){
            if(currentGuess[i]  === rightGuess[j]){
                letterPosition = j;
                break;
            }
        }

        if (letterPosition === -1) {
            letterColor = 'grey'
        } else {
           
            if (currentGuess[i] === rightGuess[i]) {
                letterColor = 'green'
            } else {
                letterColor = 'yellow'
            }
            rightGuess[letterPosition] = "*"
        }

        box.style.backgroundColor = letterColor
        
        if(letterColor.length !== 0){
            setTimeout(() => {
                painterFunction(letter, letterColor)
            }, 200*i)
        }
    }

    if (guessString === rightGuessString) {
        toastr.success("You guessed Correctly!","You won")
        numberOfRemainingGuesses = 0        //To stop Game
        return;
    } else {
        numberOfRemainingGuesses -= 1;
        currentGuess = [];
        letterIndex = 0;

        if (numberOfRemainingGuesses === 0) {
            toastr.error("No more attempts available!","You Lost")
            toastr.info(`The right word was: "${rightGuessString}"`)
        }
    }
}

//Paints the keys of the virtual keboard on the screen
function painterFunction(letter,letterColor){        
    let j = document.getElementById(letter);
    if(j.textContent === letter){
        if(j.style.backgroundColor === 'green'){
            return
        }
        if(letterColor === 'Yellow' || letterColor === 'Green'){
            j.style.backgroundColor = letterColor;  
        }
        else if (j.style.backgroundColor !== 'Yellow'){
            j.style.backgroundColor = letterColor;
        }
    }
}
