
const deck = document.querySelector(".deck");
const secEl = document.querySelector("#secs");
const minEl = document.querySelector("#mins");
const movesEl = document.querySelector(".moves");
const modal = document.querySelector(".modal");
/*
 * Create a list that holds all of your cards
 */
const cards = [
        "fa-diamond",
        "fa-paper-plane-o",
        "fa-anchor",
        "fa-bolt",
        "fa-cube",
        "fa-leaf",
        "fa-bicycle",
        "fa-bomb",
        "fa-diamond",
        "fa-paper-plane-o",
        "fa-anchor",
        "fa-bolt",
        "fa-cube",
        "fa-leaf",
        "fa-bicycle",
        "fa-bomb"
    ];

let faceUpCards = [];

let moves = 0, mins = 0, secs = 0, playing = false, timer;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the main HTML string
 *   - set the deck's inner HTML to be the string
 */
function layOutCards(){
    shuffle(cards);

    cardHTML = ``;
    for (let card of cards) {
        cardHTML += ` <li class="card">
                            <i class="fa ${card}"></i>
                        </li>`;
    }
    deck.innerHTML = cardHTML;

    const cardEls = document.querySelectorAll(".card");

    cardEls.forEach(function(card){
        card.onclick = function(){
            if(!this.classList.contains("face-up")){//change back to 'face-up' later
                flipCard(this);
            }
        }        
    })
    
    // Shuffle function from http://stackoverflow.com/a/2450976
    function shuffle(array) {
        var currentIndex = array.length,
            temporaryValue, randomIndex;
    
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
    
        return array;
    }//end shuffle  
}//End layOutCards

/*
* Flips a card over
* @pram {DOM ELement} card - represents a card in the deck
* - if a game is not currently in progress, it starts a game
* - add the class 'face-up' to the card element
* - if the array, faceUpCards has less than two cards in it,  pushes this card to the array
* - if the array, faceUpCards has two cards in it, end the turn  
            
*/
function flipCard(card){

    if(!playing){
        playing = true;
        timer = setInterval(clockTick, 1000);
    }
    card.classList.add("face-up");

    if(faceUpCards.length < 2){
        faceUpCards.push(card);
    }    

    if(faceUpCards.length === 2){
        endTurn();
    }  

    /*
    * Ends a turn
    */
    function endTurn(){
        let firstCard = faceUpCards[0];
        let secondCard = faceUpCards[1];
        faceUpCards = [];        

        window.setTimeout(function(){
            if(checkMatch(firstCard, secondCard)){
                firstCard.classList.add("matched");
                secondCard.classList.add("matched");
                if(document.getElementsByClassName("matched").length === 16){
                    showModal();
                } 
            }else{
                firstCard.classList.remove("face-up");
                secondCard.classList.remove("face-up");
            }                       
        }, 1000);
       
        moves++;
        movesEl.textContent = moves.toString();

        if(moves % 6 === 0 && moves >= 18){
            removeStar();
        }
        
    }//End endTurn

    /*
    * Checks to see if two cards match by checking the second class in the class list of the first child
    * @param {DOM element} firstCard - the first card that was flipped over
    * @param {DOM element} secondCard - the second card that was flipped over
    * @returns if cards match, return true, else return false
    */
    function checkMatch(firstCard, secondCard) {
        return firstCard.children[0].classList[1] === secondCard.children[0].classList[1];
    }    
}//End flipCard


/*
* Displays the modal 
*/
function showModal(){      
    setContent("#mins-modal-span", mins);
    document.querySelector(".secs-modal-span").textContent = secs.toString();
    setContent(".rating-span", document.querySelectorAll(".gold").length);
    setContent(".moves-span", moves);
    modal.classList.remove("modal-hidden");
    document.querySelector(".close").onclick = function(){
        modal.classList.add("modal-hidden");
        newGame();
    };
}//End showModal

/**
 * Sets the textContent of the element to be the stringified num
 * @param {DOM element} element 
 * @param {number} num 
 * 
 */
function setContent(element, num){
    document.querySelector(element).textContent = num.toString();
}

/**
 * Starts a new game
 */
function newGame(){
    moves = 0;
    mins = 0;
    secs = 0;
    movesEl.textContent = "0";
    window.clearInterval(timer);  
    playing = false;
    minEl.textContent = "0";
    secEl.textContent = "00";

    const stars = document.querySelectorAll(".fa-star");

    stars.forEach(function(star){
        star.classList.add('gold');
    })

    layOutCards();
}//End newGame

/**
 * Makes the clock advance one second
 * @returns (number) the new value of the secs variable
 */
function clockTick() {
    if (secs === 59) {
        secs = 0;
        secEl.textContent = "00";
        mins = increment(mins, minEl);
    } else {
        secs = increment(secs, secEl);
    }

    function increment(num, element) {
        num++;
        element.textContent = (num < 10) ? "0" + num.toString() : num.toString();
        return num;
    }//End increment
    
}//End clockTick

/**
 * Takes the last star and removes the class .gold
 */
function removeStar(){
    const stars = document.querySelectorAll(".gold");
    let lastStar = stars[stars.length - 1];
    lastStar.classList.remove("gold");
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

window.onload = function () {

    layOutCards();   

    document.querySelector(".restart").onclick = newGame;
};