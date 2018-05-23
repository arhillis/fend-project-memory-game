# Memory Game Project

This is a simple, classic memory game using icons from Font Awesome. You can click (here)[https://arhillis.github.io/fend-project-memory-game/] to play the game.

## Table of Contents

* [Instructions](#instructions)
* [Todo List](#todo)
* [Functions](#functions)
* [Issues](#issues)

## Instructions

The starter project has some HTML and CSS styling to display a static version of the Memory Game project. You'll need to convert this project from a static project to an interactive one. This will require modifying the HTML and CSS files, but primarily the JavaScript file.

To get started, open `js/app.js` and start building out the app's functionality

For specific, detailed instructions, look at the project instructions in the [Udacity Classroom](https://classroom.udacity.com/me).

## Todo 
### (Personal Deadline: May 21)

* Responsiveness (Personal Deadline: May 11 - **Done!**)

    _"All application components are usable across modern desktop, tablet, and phone browsers. "_

* Move Counter (Personal Deadline: May 12 - **Done!**)

    _"Game displays the current number of moves a user has made. "_

* Timer (Personal Deadline: May 15 **Done!**)

    _"When the player starts a game, a displayed timer should also start. Once the player wins the game, the timer stops."_

* Star rating (Personal Deadline: May 18 **Done!**)

    _"The game displays a star rating (from 1 to at least 3) that reflects the player's performance. At the beginning of a game, it should display at least 3 stars. After some number of moves, it should change to a lower star rating. After a few more moves, it should change to a even lower star rating (down to 1). __The number of moves needed to change the rating is up to you, but it should happen at some point.__"_

* Congratulatory Pop-up (Personal Deadline: May 21  **Done!**)

    _"When a user wins the game, a modal appears to congratulate the player and ask if they want to play again. It should also tell the user how much time it took to win the game, and what the star rating was."_


## Functions

Here are the following functions that I have written as part of my function:

### newGame()

This function does exactly what it says it does: starts a new game. 

### layOutCards()

This function takes the ```cards``` array and randomizes it with the given ``shuffle`` function. It then creates an HTML string (cardHTML), adding list items to it for each item in the array. It then sets the ``deck``'s innter HTML to be this string.

### flipCard(card)

Takes in a DOM element with a class of ```card``` and flips it over. It then checks if certain other conditions apply, such as if the other flipped over card matches, and acts accordingly.

### endTurn()

If there are two cards flipped up, endTurn is called. If the cards match, the ```matched``` class is added to both cards. If not, they are both put back face down. Next, it checks to see if all the cards are matched. If so, ```endGame``` is called.

### checkMatch(firstCard, secondCard)

Checks to see if the two cards match. Returns ```true``` if they do and ```false``` if they don't.

### showModal()

Makes sure that the text content of the modal is set up properly and then displays the modal.

### setContent(element, num)

Stringifies ```num``` and then puts it in as ```element```'s text content.

### clockTick

Simply put, it takes the timer and advances it one second.

### increment()

Esentially does the same thing as ```setContent```, only it checks to see if the clock is at 59 seconds or not. If it is, ```secs``` is set to zero.

### removeStar()

Removes the ```gold``` class from the last star in the star section.

## Issues

* When the user finishes a game and it restarts, the cards do not shuffle. I am still having trouble fixing this (Resolved May 18).

## Disclaimers

The code for the modal was taken from a tutorial on (W3Schools)[https://www.w3schools.com/howto/howto_css_modals.asp]. No plaguarism is intended.
