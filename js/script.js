// Scroll Animation and Magic Card Trick Script

document.addEventListener("DOMContentLoaded", function() {
    // Scroll Animation
    const projectItems = document.querySelectorAll('.project-item');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, { threshold: 0.1 });

    projectItems.forEach(item => {
        observer.observe(item);
    });

    // Menu Toggle for Mobile View
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');

    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    // Add the event listener for the start button
    const startButton = document.getElementById('startButton');
    if (startButton) {
        startButton.addEventListener('click', startGame);
    }
});

// Magic Card Trick JavaScript Code
let game = {
    deck: [],
    rounds: 0,
    maxRounds: 3,
    columns: [],
};

function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}

function startGame() {
    const numbers = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    const suits = ["♥", "♦", "♠", "♣"];

    let deck = [];
    for (let suit of suits) {
        for (let number of numbers) {
            deck.push(number + " of " + suit);
        }
    }

    deck = shuffle(deck);
    game.deck = deck.slice(0, 21);
    game.rounds = 0;

    alert("Memorize one of the following cards and click on the column where your card is located.");

    dealCards();
}

function dealCards() {
    game.rounds++;

    let firstColumn = [];
    let secondColumn = [];
    let thirdColumn = [];

    for (let i = 0; i < game.deck.length; i++) {
        if (i % 3 === 0) {
            firstColumn.push(game.deck[i]);
        } else if (i % 3 === 1) {
            secondColumn.push(game.deck[i]);
        } else if (i % 3 === 2) {
            thirdColumn.push(game.deck[i]);
        }
    }

    game.columns = [firstColumn, secondColumn, thirdColumn];

    displayColumns();
}

function displayColumns() {
    // Clear the previous display
    const columnsContainer = document.getElementById('columnsContainer');
    columnsContainer.innerHTML = '';

    // Create the columns
    for (let i = 0; i < 3; i++) {
        let columnDiv = document.createElement('div');
        columnDiv.classList.add('column');
        let columnTitle = document.createElement('div');
        columnTitle.classList.add('column-title');
        columnTitle.innerText = `Column ${i + 1}`;
        columnDiv.appendChild(columnTitle);

        // Add the cards
        let columnCards = game.columns[i];
        for (let card of columnCards) {
            let cardDiv = document.createElement('div');
            cardDiv.classList.add('card');
            cardDiv.innerText = card;
            columnDiv.appendChild(cardDiv);
        }

        // Add event listener for selection
        columnDiv.addEventListener('click', function() {
            columnSelected(i);
        });

        columnsContainer.appendChild(columnDiv);
    }

    // Display instructions
    const instructions = document.getElementById('instructions');
    if (game.rounds < game.maxRounds) {
        instructions.innerText = `Round ${game.rounds}: Click on the column where your card is located. We will do this ${game.maxRounds - game.rounds} more time(s).`;
    } else {
        instructions.innerText = `Round ${game.rounds}: Click on the column where your card is located.`;
    }
}

function columnSelected(columnIndex) {
    // Rearrange the deck based on the selected column
    const selectedColumn = game.columns[columnIndex];

    let newDeck = [];

    if (columnIndex === 0) {
        newDeck = game.columns[1].concat(game.columns[0], game.columns[2]);
    } else if (columnIndex === 1) {
        newDeck = game.columns[2].concat(game.columns[1], game.columns[0]);
    } else if (columnIndex === 2) {
        newDeck = game.columns[1].concat(game.columns[2], game.columns[0]);
    }

    game.deck = newDeck;

    if (game.rounds < game.maxRounds) {
        dealCards();
    } else {
        revealCard();
    }
}

function revealCard() {
    const columnsContainer = document.getElementById('columnsContainer');
    columnsContainer.innerHTML = '';

    const instructions = document.getElementById('instructions');
    instructions.innerText = '';

    const resultDiv = document.createElement('div');
    resultDiv.innerText = `I figured it out! Your card was the ${game.deck[10]}.`;
    resultDiv.style.fontSize = '18px';
    resultDiv.style.marginBottom = '20px';

    columnsContainer.appendChild(resultDiv);

    const playAgainButton = document.createElement('button');
    playAgainButton.innerText = 'Play Again';
    playAgainButton.addEventListener('click', startGame);

    columnsContainer.appendChild(playAgainButton);
}