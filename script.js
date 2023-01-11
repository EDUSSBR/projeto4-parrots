
let view = {
    askForNumberOfCards: function askForNumberOfCards() {
        return window.prompt("Com quantas cartas deseja jogar? (ex: 4, 6, 8, 10, 12 ou 14)");
    }
}
let model = {
    setupGame: function setupGame() {
        let isNumberOfCardsOk = false
        let numberOfCards;
        do {
            numberOfCards = this.askForNumberOfCards()
            isNumberOfCardsOk = this.checkNumber(numberOfCards)
        }
        while (!isNumberOfCardsOk) 
    },
    checkNumber: function checkNumber(num) {
        return (String(num).match(/[02468]$/)  && num > 3 && num < 15) ? true : false
    }
}
let controller = Object.assign(Object.create(view), model)
controller.setupGame()





