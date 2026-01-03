/**
 * Rock Paper Scissors Game
 * Complete implementation matching Figma design
 */

// ========== STORAGE ==========
const STORAGE_KEYS = {
    USER_SCORE: 'rps_user_score',
    COMPUTER_SCORE: 'rps_computer_score'
};

function loadScores() {
    return {
        user: parseInt(localStorage.getItem(STORAGE_KEYS.USER_SCORE)) || 0,
        computer: parseInt(localStorage.getItem(STORAGE_KEYS.COMPUTER_SCORE)) || 0
    };
}

function saveScores(userScore, computerScore) {
    localStorage.setItem(STORAGE_KEYS.USER_SCORE, userScore);
    localStorage.setItem(STORAGE_KEYS.COMPUTER_SCORE, computerScore);
}

// ========== GAME STATE ==========
let userScore = 0;
let computerScore = 0;

const CHOICES = ['rock', 'paper', 'scissors'];
const ICONS = {
    rock: '✊',
    paper: '✋',
    scissors: '✌️'
};

// ========== DOM ELEMENTS ==========
// Screens
const gameScreen = document.getElementById('game-screen');
const resultScreen = document.getElementById('result-screen');
const celebrationScreen = document.getElementById('celebration-screen');
const rulesModal = document.getElementById('rules-modal');

// Choice buttons
const choiceButtons = document.querySelectorAll('.choice-btn');

// Score displays
const userScoreEl = document.getElementById('user-score');
const computerScoreEl = document.getElementById('computer-score');
const userScoreResultEl = document.getElementById('user-score-result');
const computerScoreResultEl = document.getElementById('computer-score-result');

// Result elements
const userPick = document.getElementById('user-pick');
const pcPick = document.getElementById('pc-pick');
const resultText = document.getElementById('result-text');
const resultSubtext = document.getElementById('result-subtext');

// Buttons
const playAgainBtn = document.getElementById('play-again-btn');
const nextBtn = document.getElementById('next-btn');
const playAgainCelebration = document.getElementById('play-again-celebration');

// Rules buttons
const rulesBtn = document.getElementById('rules-btn');
const rulesBtnResult = document.getElementById('rules-btn-result');
const rulesBtnCelebration = document.getElementById('rules-btn-celebration');
const closeModal = document.getElementById('close-modal');

// ========== GAME LOGIC ==========
function getComputerChoice() {
    return CHOICES[Math.floor(Math.random() * CHOICES.length)];
}

function determineWinner(userChoice, computerChoice) {
    if (userChoice === computerChoice) return 'tie';

    const wins = {
        rock: 'scissors',
        paper: 'rock',
        scissors: 'paper'
    };

    return wins[userChoice] === computerChoice ? 'win' : 'lose';
}

function updateScoreDisplays() {
    userScoreEl.textContent = userScore;
    computerScoreEl.textContent = computerScore;
    userScoreResultEl.textContent = userScore;
    computerScoreResultEl.textContent = computerScore;
}

function showScreen(screen) {
    gameScreen.classList.add('hidden');
    resultScreen.classList.add('hidden');
    celebrationScreen.classList.add('hidden');
    screen.classList.remove('hidden');
}

function playGame(userChoice) {
    const computerChoice = getComputerChoice();
    const result = determineWinner(userChoice, computerChoice);

    // Update scores
    if (result === 'win') {
        userScore++;
    } else if (result === 'lose') {
        computerScore++;
    }

    saveScores(userScore, computerScore);
    updateScoreDisplays();

    // Show result
    showResult(userChoice, computerChoice, result);
}

function showResult(userChoice, computerChoice, result) {
    // Set user pick
    userPick.innerHTML = `<span class="icon">${ICONS[userChoice]}</span>`;
    userPick.className = `pick-circle ${userChoice}`;

    // Set PC pick  
    pcPick.innerHTML = `<span class="icon">${ICONS[computerChoice]}</span>`;
    pcPick.className = `pick-circle ${computerChoice}`;

    // Remove winner class from both
    userPick.classList.remove('winner');
    pcPick.classList.remove('winner');

    // Set result text and winner glow
    if (result === 'win') {
        resultText.textContent = 'YOU WIN';
        resultSubtext.textContent = 'AGAINST PC';
        playAgainBtn.textContent = 'PLAY AGAIN';
        userPick.classList.add('winner');
        nextBtn.classList.remove('hidden');
    } else if (result === 'lose') {
        resultText.textContent = 'YOU LOST';
        resultSubtext.textContent = 'AGAINST PC';
        playAgainBtn.textContent = 'PLAY AGAIN';
        pcPick.classList.add('winner');
        nextBtn.classList.add('hidden');
    } else {
        resultText.textContent = 'TIE UP';
        resultSubtext.textContent = '';
        playAgainBtn.textContent = 'REPLAY';
        nextBtn.classList.add('hidden');
    }

    showScreen(resultScreen);
}

function showCelebration() {
    showScreen(celebrationScreen);
}

function goToGameScreen() {
    showScreen(gameScreen);
}

// ========== MODAL ==========
function openRulesModal() {
    rulesModal.classList.remove('hidden');
}

function closeRulesModal() {
    rulesModal.classList.add('hidden');
}

// ========== EVENT LISTENERS ==========
// Choice buttons
choiceButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const choice = btn.dataset.choice;
        playGame(choice);
    });
});

// Play Again buttons
playAgainBtn.addEventListener('click', goToGameScreen);
playAgainCelebration.addEventListener('click', goToGameScreen);

// Next button (go to celebration)
nextBtn.addEventListener('click', showCelebration);

// Rules buttons
rulesBtn.addEventListener('click', openRulesModal);
rulesBtnResult.addEventListener('click', openRulesModal);
rulesBtnCelebration.addEventListener('click', openRulesModal);
closeModal.addEventListener('click', closeRulesModal);

// Close modal on backdrop click
rulesModal.addEventListener('click', (e) => {
    if (e.target === rulesModal) {
        closeRulesModal();
    }
});

// Close modal on Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !rulesModal.classList.contains('hidden')) {
        closeRulesModal();
    }
});

// ========== INIT ==========
function init() {
    const scores = loadScores();
    userScore = scores.user;
    computerScore = scores.computer;
    updateScoreDisplays();
    console.log('Rock Paper Scissors initialized!');
}

init();
