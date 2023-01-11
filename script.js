let imgSRC = [ ]
let view = {
    askForNumberOfCards: function askForNumberOfCards() {
        return window.prompt("Com quantas cartas deseja jogar? (ex: 4, 6, 8, 10, 12 ou 14)");
    },
    addNewCard: function addNewCard(id) {

        document.querySelector('main').innerHTML += `
        <div id=${id} onclick="turnCard(this);" class="card">
            <img src="./imgs/back.png" alt="card">
        </div> `
    }
}
console.log([1, 2, 3, 4, 5, 6].sort(comparador))
function comparador() {
    return Math.random() - 0.5;
}
let model = {
    setupGame: function setupGame() {
        let isNumberOfCardsOk = false
        this.numberOfCards;
        do {
            this.numberOfCards = this.askForNumberOfCards()
            isNumberOfCardsOk = this.checkNumber(this.numberOfCards)
        }
        while (!isNumberOfCardsOk)
        for (let i=0; i<this.numberOfCards; i++) {
            this.addNewCard(i)
                   
        }

    },
    checkNumber: function checkNumber(num) {
        return (String(num).match(/[02468]$/) && num > 3 && num < 15) ? true : false
    }

}
let controller = Object.assign(Object.create(view), model)
controller.setupGame()


function turnCard(card){
    

    console.log(card)


}


