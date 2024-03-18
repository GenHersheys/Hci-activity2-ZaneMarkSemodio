const symbols = ['🏀', '🩵', '💡', '✈️', '💻', '🏐', '🔓', '🎲'];
let cards = [];
let flippedCards = [];
let matchedCards = [];

function createGameBoard() {
  const gameBoard = document.getElementById('game-board');
  gameBoard.innerHTML = '';
  cards = [];
  matchedCards = [];
  
  const shuffledSymbols = [...symbols, ...symbols].sort(() => Math.random() - 0.5);
  
  for (let i = 0; i < shuffledSymbols.length; i++) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-index', i);
    
    const frontFace = document.createElement('div');
    frontFace.classList.add('front-face');
    frontFace.textContent = '?';
    
    const backFace = document.createElement('div');
    backFace.classList.add('back-face');
    backFace.textContent = shuffledSymbols[i];
    
    card.appendChild(frontFace);
    card.appendChild(backFace);
    
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
    cards.push(card);
  }
}

function flipCard() {
  const card = this;
  
  if (!card.classList.contains('flipped') && flippedCards.length < 2 && !matchedCards.includes(card)) {
    card.classList.add('flipped');
    flippedCards.push(card);
    
    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 1000);
    }
  }
}

function checkMatch() {
  const symbol1 = flippedCards[0].querySelector('.back-face').textContent;
  const symbol2 = flippedCards[1].querySelector('.back-face').textContent;
  
  if (symbol1 === symbol2) {
    flippedCards.forEach(card => {
      card.classList.add('matched');
      matchedCards.push(card);
    });
  } else {
    flippedCards.forEach(card => card.classList.remove('flipped'));
  }
  
  flippedCards = [];
  checkWin();
}

function checkWin() {
  if (matchedCards.length === cards.length) {
    setTimeout(() => {
      alert('Congratulations! You won!');
    }, 500);
  }
}

function resetGame() {
  createGameBoard();
}

createGameBoard();
