let deckId
const shuffleDeckBtn = document.getElementById("shuffle-deck-btn")
const drawBtn = document.getElementById("draw-btn")
const computerCardImg = document.getElementById("computer-card-img")
const playerCardImg = document.getElementById("player-card-img")

function handleClick() {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
            console.log(data)
            deckId = data.deck_id
        })
}

shuffleDeckBtn.addEventListener("click", handleClick)

drawBtn.addEventListener("click", () => {
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {

            computerCardImg.innerHTML = `<img src=${data.cards[0].image} />`
            playerCardImg.innerHTML = `<img src=${data.cards[1].image} />`
        })
})