# projeto4-parrots


The "Parrot's Card Game" project is a memory game developed exclusively with pure JavaScript, without the use of libraries or other languages that compile to JavaScript. Using Git and GitHub, the project should be developed in a public repository, with descriptive commits for each implemented feature.

The game layout was designed to be applied on both desktop and mobile devices, following the Figma design. Upon starting the game, the user will be prompted to enter the number of cards they want to play with, using the prompt function. Only even numbers between 4 and 14 should be accepted, and if the user enters an invalid number, the prompt will repeat in a loop until a valid number is entered. After that, the cards should be distributed randomly on the page, faced down.

The parrot images should be implemented as <img src="..."> tags, and the images of the parrots faced down and faced up (gifs) should be the same. When clicking on a card, it should be turned over. If it is the first card of the pair, it should remain turned over until the user chooses the second card. If the second card chosen is equal to the first one, the user guessed correctly and both cards should stay faced up until the end of the game. Otherwise, the game should wait for 1 second and turn both cards faced down again.

Please note that the project still needs to be refactored, but all functionalities are already implemented and should be followed the requirements.
