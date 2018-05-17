/*
 * Create a list that holds all of your cards
 */
const deck = document.querySelector(".deck");
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
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976





/*
function newGame() {

    layOutCards();

    let cardEls = document.querySelectorAll(".card");
    const movesEl = document.querySelector(".moves");
    const secEl = document.querySelector("#secs");
    const minEl = document.querySelector("#mins");

    let faceUpCards = [];

    let moves = 0,
        playing = false;

    let timer;

   

        function clockTick() {

            let secs = parseInt(secEl.textContent);

            if (secs === 59) {
                secEl.textContent = "00";
                let mins = parseInt(minEl.textContent);
                increment(mins, minEl);
            } else {
                increment(secs, secEl);
            }

            function increment(num, element) {
                num++;
                element.textContent = (num < 10) ? "0" + num.toString() : num.toString();
            }
        }
    }

    


    

    function resetGame() {
        alert("matched!");
        playing = false;
        window.clearInterval(timer);
        minEl.textContent = "0";
        secEl.textContent = "00";
        movesEl.textContent = "0";
        moves = 0;
        layOutCards();
   }


function layOutCards() {
    

    shuffle(cards);

    
    cardEls = document.querySelectorAll("card");

    for (card of cardEls) {
        card.onclick = function () {

            if (!playing) {
                playing = true;

                timer = window.setInterval(function () {
                    clockTick();
                }, 1000)

            }
            
                faceUpCards.push(this);

                if (faceUpCards.length === 2) {

                    window.setTimeout(function () {
                        endTurn(faceUpCards[0], faceUpCards[1]);
                    }, 1000);
                }

                function endTurn(card1, card2) {
                    let match = checkMatch(card1, card2);

                    if (match) {
                        card1.classList.add("matched");
                        card2.classList.add("matched");
                    } 

                    moves++;
                    movesEl.textContent = moves.toString();
                    faceUpCards = [];

                    if (document.querySelectorAll(".matched").length == 16) {
                        resetGame();
                    }
                
            }

        }
    }

}

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
            if(!this.classList.contains("matched")){//change back to 'face-up' later
                flipCard(this);
            }
        }        
    })
    
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



function flipCard(card){
    card.classList.add("face-up");

    if(faceUpCards.length < 2){
        faceUpCards.push(card);
    }    

    if(faceUpCards.length === 2){
        let firstCard = faceUpCards[0];
        let secondCard = faceUpCards[1];
        faceUpCards = [];

        window.setTimeout(function(){
            if(checkMatch(firstCard, secondCard)){
                firstCard.classList.add("matched");
                secondCard.classList.add("matched");
            }else{
                firstCard.classList.remove("face-up");
                secondCard.classList.remove("face-up");
            }

            if(document.getElementsByClassName("matched").length === 16){
                window.setTimeout(function(){
                    endGame();
                }, 1000);
            }
        }, 1000);
    }

    function checkMatch(firstCard, secondCard) {
        return firstCard.children[0].classList[1] === secondCard.children[0].classList[1];
    }

    function endGame(){
        alert("matched!");
        layOutCards();
    }
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
  
   

    document.querySelector(".restart").onclick = function () {
        layOutCards();
    };


};