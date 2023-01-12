let view = {
    imgSRC: ['bobrossparrot', 'explodyparrot', 'fiestaparrot', 'metalparrot', 'revertitparrot', 'tripletsparrot', 'unicornparrot'],
    askForNumberOfCards: function askForNumberOfCards() {
        return window.prompt("Com quantas cartas deseja jogar? (ex: 4, 6, 8, 10, 12 ou 14)");
    },
    addNewCard: function addNewCard(id) {
        document.querySelector('main').innerHTML += `
        <div id=${id}>   
        <div onclick="turnCard(this);" class="card">
            <img src="./imgs/back.png" alt="card">
        </div> 
        <div onclick="turnCard(this);" class="card hidden">
            <img src="./imgs/${this.imgSRC[id]}.gif" alt="card">
        </div> 
        </div>   
        
        `
    },
    getAllCards: function getAllCards() {
        this.cards = document.querySelectorAll('.card')
        return this
    },
    setNewCards: function setNewCards(cardsToChange) {
        let container = document.querySelector('#container')
        container.setInnerHtml("")
        container += this.addNewCard()
    }
}


let model = {
    setupGame: function setupGame() {
        let isNumberOfCardsOk = false
        this.numberOfCards;
        this.cardsID = []
        do {
            this.numberOfCards = this.askForNumberOfCards()
            isNumberOfCardsOk = this.checkNumber(this.numberOfCards)
        }
        while (!isNumberOfCardsOk)
        this.generateSetOfCards()
        this.generateSetOfCards()
        // document.querySelectorAll(".card").forEach(item => item.classList.remove('hidden'))
    },
    checkNumber: function checkNumber(num) {
        return (String(num).match(/[02468]$/) && num > 3 && num < 15) ? true : false
    },

    generateSetOfCards: function generateSetOfCards() {
        for (let i = 0; i < (this.numberOfCards / 2); i++) {
            this.cardsID.push(i)
        }
        this.cardsID.sort(() => (Math.random() - 0.5))
        for (let i = 0; i < (this.numberOfCards / 2); i++) {
            let cardID = this.cardsID.pop()
            this.addNewCard(cardID)
        }
    },


}
let controller = Object.assign(Object.create(view), model)
controller.setupGame()


function turnCard(card) {
    card.parentNode
   card.parentNode.querySelectorAll('div').forEach(el => {
        el.classList.toggle('hidden')
    });

    // console.log(card)


}


