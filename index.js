let deckId;
const shuffleDeckBtn = document.getElementById("shuffle-deck-btn");
const drawBtn = document.getElementById("draw-btn");
const computerCardImg = document.getElementById("computer-card-img");
const playerCardImg = document.getElementById("player-card-img");
const winMessage = document.getElementById("win-message");
const remainingCards = document.getElementById("remaining-cards")
remainingCards.textContent = 52

drawBtn.classList.add('inactive-btn')
// drawBtn.style.pointerEvents = 'none'
// drawBtn.style.backgroundColor = '#ADA94D'

const cardConverter = (card) => {
  const valueMap = {
    JACK: 11,
    QUEEN: 12,
    KING: 13,
    ACE: 14,
  };

  // Convert the card value if it exists in the map, otherwise keep the original value
  const convertedValue = valueMap[card.value] || card.value;

  // Return a new object to avoid mutating the original card
  return { ...card, value: convertedValue };
};

const cardWinner = (cardOne, cardTwo) => {
  const convertedCardOne = cardConverter(cardOne);
  const convertedCardTwo = cardConverter(cardTwo);

  if (convertedCardOne.value > convertedCardTwo.value) {
    winMessage.textContent = "Card 1 wins!";
  } else if (convertedCardOne.value < convertedCardTwo.value) {
    winMessage.textContent = "Card 2 wins!";
  } else {
    winMessage.textContent = "War!";
  }
};

function handleClick() {
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then((res) => res.json())
    .then((data) => {
      deckId = data.deck_id;
      remainingCards.textContent = data.remaining;
    //   drawBtn.style.pointerEvents = 'auto'
    //   drawBtn.style.backgroundColor = '#f7f150'
    drawBtn.classList.remove('inactive-btn')
    });
}

shuffleDeckBtn.addEventListener("click", handleClick);

drawBtn.addEventListener("click", () => {
    
  fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then((res) => res.json())
    .then((data) => {
        remainingCards.textContent = data.remaining;
        
        if(data.remaining > 0) {
            computerCardImg.innerHTML = `<img src=${data.cards[0].image} />`;
            playerCardImg.innerHTML = `<img src=${data.cards[1].image} />`;
            cardWinner(data.cards[0], data.cards[1]);
            remainingCards.textContent = data.remaining;
        } else {
            // drawBtn.style.pointerEvents = 'none'
            // drawBtn.style.backgroundColor = '#ADA94D'
            drawBtn.classList.add('inactive-btn')
        }
      
    });
});


