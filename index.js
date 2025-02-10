let deckId;
const shuffleDeckBtn = document.getElementById("shuffle-deck-btn");
const drawBtn = document.getElementById("draw-btn");
const computerCardImg = document.getElementById("computer-card-img");
const playerCardImg = document.getElementById("player-card-img");
const winMessage = document.getElementById("win-message");

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
    });
}

shuffleDeckBtn.addEventListener("click", handleClick);

drawBtn.addEventListener("click", () => {
  fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then((res) => res.json())
    .then((data) => {
      computerCardImg.innerHTML = `<img src=${data.cards[0].image} />`;
      playerCardImg.innerHTML = `<img src=${data.cards[1].image} />`;
      cardWinner(data.cards[0], data.cards[1]);
    });
});
