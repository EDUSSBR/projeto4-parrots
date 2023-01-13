let view = {
    imgSRC: ['bobrossparrot', 'explodyparrot', 'fiestaparrot', 'metalparrot', 'revertitparrot', 'tripletsparrot', 'unicornparrot'],
    askForNumberOfCards: function askForNumberOfCards() {
        return window.prompt("Com quantas cartas deseja jogar? (ex: 4, 6, 8, 10, 12 ou 14)");
    },
    addNewCard: function addNewCard(id) {
        document.querySelector('main').innerHTML += `
        <div data-test="card" id=${id}>   
        <div onclick="turnCard(this);" class="card face">
            <img data-test="face-down-image" src="./imgs/back.png" alt="card">
        </div> 
        <div onclick="turnCard(this);" class="card face hidden">
            <img data-test="face-up-image" src="./imgs/${this.imgSRC[id]}.gif" alt="card">
        </div> 
        </div>   
        `
    },
    getAllCards: function getAllCards() {
        this.cards = document.querySelectorAll('.card');
        return this;
    },
    getAllSelectedCards: function getAllCards() {
        this.selectedCards = document.querySelectorAll('main > div.selected');
    },
    setNewCards: function setNewCards(cardsToChange) {
        let container = document.querySelector('#container');
        container.setInnerHtml("");
        container += this.addNewCard();
    },
    getCard: function getCard(id) {
        return document.querySelector(`#${id}`);
    },

    
}


let model = {
    setupGame: function setupGame() {
        let isNumberOfCardsOk = false;
        this.numberOfCards;
        this.cardsID = [];
        this.playedCounter = 0;
        this.counter = 0;
        this.selectedCards = [];
        this.cardPairsFound = [];
        do {
            this.numberOfCards = this.askForNumberOfCards();
            isNumberOfCardsOk = this.checkNumber(this.numberOfCards);
        }
        while (!isNumberOfCardsOk)
        this.generateSetOfCards();
        this.generateSetOfCards();
        // document.querySelectorAll(".card").forEach(item => item.classList.remove('hidden'))
    },
    checkNumber: function checkNumber(num) {
        return (String(num).match(/[02468]$/) && num > 3 && num < 15) ? true : false;
    },

    generateSetOfCards: function generateSetOfCards() {
        for (let i = 0; i < (this.numberOfCards / 2); i++) {
            this.cardsID.push(i);
        }
        this.cardsID.sort(() => (Math.random() - 0.5))
        for (let i = 0; i < (this.numberOfCards / 2); i++) {
            let cardID = this.cardsID.pop();
            this.addNewCard(cardID);
        }
    },
    checkAlreadySelected: function checkAlreadySelected(card) {
        if (card.parentNode === this.selectedCards[0] && this.selectedCards[0] !== undefined) {
            return true;
        }
    },
    checkEqualls: function checkEqualls() {
        return this.selectedCards[0].id === this.selectedCards[1].id;
    },
    setCardToSelected: function setCardToSelected(card) {

        this.selectedCards.push(card)
        card.classList.add('selected');
    },

    removeCardFromSelected: function removeCardFromSelected(card) {
        card.classList.remove('selected');
    },
    getSelectedCards: function getSelectedCards() {
        return this.selectedCards;
    },

    clearSelectedCards: function clearSelectedCards() {
        for (let item of this.selectedCards) {
            item.querySelectorAll('div').forEach(el => {
                el.classList.toggle('face');
                el.classList.toggle('front');
                el.classList.toggle('back');
                setTimeout(() => {
                    el.classList.toggle('hidden');
                }, (250));
            })
            this.removeCardFromSelected(item);
        }

        this.selectedCards.length = 0;

    },
    setPairAsFound: function setPairAsFound(){
        this.selectedCards.forEach(item=>{ 
            item.classList.add('found');
            item.classList.remove('selected');
        });
        this.removeCardFromSelected(this.selectedCards[0]);
        this.removeCardFromSelected(this.selectedCards[1]);
        this.cardPairsFound = [...this.cardPairsFound, ...this.selectedCards];
        this.selectedCards=[];
    },
    getAllFoundCards: function getAllFoundCards(){
        return this.cardPairsFound.length >= this.numberOfCards
    },

    updatePlayedCounter: function updatePlayedCounter(){
        this.playedCounter += 1;
    },
    updateCounter: function updateCounter(){
        this.counter += 1;
        document.querySelector('.counter').innerHTML = this.counter
    },
    resetGame: function resetGame(){
        document.querySelector('main').innerHTML=""
        document.querySelector('.counter').innerHTML="0"
        this.setupGame()
    }
}
let controller = Object.assign(Object.create(view), model);
controller.setupGame();
let interval = setInterval(()=>controller.updateCounter(), 1000)


function turnCard(card) {
    if (card.parentNode.classList.contains('found') || controller.selectedCards.length === 2 || controller.checkAlreadySelected(card)){
        return;
    }
    controller.setCardToSelected(card.parentNode);
    card.parentNode.querySelectorAll('div').forEach(el => {
        el.classList.toggle('face');
        el.classList.toggle('front');
        el.classList.toggle('back');
        setTimeout(() => {
            el.classList.toggle('hidden');
        }, (250));

    })
    controller.updatePlayedCounter()
    if (controller.selectedCards.length === 2) {
        if (controller.checkEqualls()){
            controller.setPairAsFound();
            controller.clearSelectedCards();
        }
        if (controller.getAllFoundCards()){
            setTimeout(() => {
            alert(`Você ganhou em ${controller.playedCounter} jogadas! A duração do jogo foi de ${controller.counter} segundos!`);
            let resetAnswer='hehe';
            while (resetAnswer!=='sim' && resetAnswer!=='não'){
                console.log("answer:",resetAnswer)
                resetAnswer = prompt(`Você gostaria de jogar novamente? (sim/não)`).trim();
            }
            if (resetAnswer=="não"){
                clearInterval(interval)
                return;
            } else if (resetAnswer=="sim"){
                controller.resetGame()        
            }
        }, 500);
        }
        if (controller.selectedCards.length == 2){
            setTimeout(() => {
                controller.clearSelectedCards();
            }, 1000);
        }
    }

}