/*
 * Create a list that holds all of your cards
 */



/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976


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

    for (card of cardEls) {
        card.onclick = function () {

            if (!playing) {
                playing = true;

                timer = window.setInterval(function () {
                    clockTick();
                }, 1000)

            }

            if (!this.classList.contains("face-up")) {
                this.classList.add("face-up");
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
                    } else {
                        card1.classList.remove("face-up");
                        card2.classList.remove("face-up");
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

    function layOutCards() {
        const deck = document.querySelector(".deck");
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

        shuffle(cards);

        cardHTML = ``;
        for (let card of cards) {
            cardHTML += ` <li class="card">
                                    <i class="fa ${card}"></i>
                                </li>`;
        }
        deck.innerHTML = cardHTML;

    }

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

    function checkMatch(firstCard, secondCard) {
        return firstCard.children[0].classList[1] === secondCard.children[0].classList[1];
    }

    function resetGame() {
        alert("matched!");
        playing = false;
        window.clearInterval(timer);
        minEl.textContent = "0";
        secEl.textContent = "00";
        movesEl.textContent = "0";
        moves = 0;
        cardEls.forEach(function (card) {
            card.classList.remove("matched");
            card.classList.remove("face-up");
        })
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

    newGame();

    document.querySelector(".restart").onclick = function () {
        newGame();
    };


};