/*
 * Create a list that holds all of your cards
 */
let cards = [
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


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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
    shuffle(cards);
    const deck = document.querySelector(".deck");

    cardHTML = ``;
    for (let card of cards) {
        cardHTML += ` <li class="card">
                                <i class="fa ${card}"></i>
                            </li>`
    }

    deck.innerHTML = cardHTML;

    cardEls = document.querySelectorAll(".card");

    let firstCard = "";
    let secondCard = "";

    for (card of cardEls) {
        card.onclick = function () {
            if(!this.classList.contains("face-up")){
                this.classList.add("face-up");

                if (!firstCard) {
                    firstCard = this;
                } else if (!secondCard) {                
                    secondCard = this;
                }

                if(firstCard !== "" && secondCard !== ""){
                    if(checkMatch(firstCard, secondCard)){
                        firstCard = "";
                        secondCard = "";
                    }else{
                        setTimeout(function(){
                            firstCard.classList.remove("face-up");
                            secondCard.classList.remove("face-up");
                            firstCard = "";
                            secondCard = "";
                            
                        }, 1000);
                    }

                }
            }
            
        }
    }

    document.querySelector(".restart").onclick = function () {
        for (let card of cardEls) {
            card.classList.remove("face-up");

        }
    };

    function checkMatch(firstCard, secondCard){
        return firstCard.children[0].classList[1] === secondCard.children[0].classList[1];
    }
};