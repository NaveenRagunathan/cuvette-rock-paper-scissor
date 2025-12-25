// Game state
let userScore = 0;
let computerScore = 0;

// Game choices
const CHOICES = ['rock', 'paper', 'scissors'];

// Choice emojis
const CHOICE_EMOJIS = {
    rock: '✊',
    paper: '✋',
    scissors: '✌️'
};

// Choice colors
const CHOICE_COLORS = {
    rock: 'blue',
    paper: 'orange',
    scissors: 'pink'
};

// DOM Elements
const choiceButtons = document.querySelectorAll('.choice-btn');
const choicesSection = document.getElementById('choices-section');
const resultSection = document.getElementById('result-section');
const userScoreElement = document.getElementById('user-score');
const computerScoreElement = document.getElementById('computer-score');
const userChoiceDisplay = document.getElementById('user-choice-display');
const computerChoiceDisplay = document.getElementById('computer-choice-display');
const userChoiceWrapper = document.getElementById('user-choice-wrapper');
const pcChoiceWrapper = document.getElementById('pc-choice-wrapper');
const resultText = document.getElementById('result-text');
const resultSubtext = document.getElementById('result-subtext');
const playAgainBtn = document.getElementById('play-again-btn');
const nextBtn = document.getElementById('next-btn');
const playAgainCelebrationBtn = document.getElementById('play-again-celebration');
const celebrationPage = document.getElementById('celebration-page');

/**
 * Initialize the game
 */
function initGame() {
    // Load scores from localStorage
    const scores = initializeScores();
    userScore = scores.userScore;
    computerScore = scores.computerScore;

    // Update score display
    updateScoreDisplay();

    // Add event listeners to choice buttons
    choiceButtons.forEach(button => {
        button.addEventListener('click', handleUserChoice);
    });

    // Add event listeners to play again buttons
    playAgainBtn.addEventListener('click', resetGame);
    nextBtn.addEventListener('click', showCelebration);
    playAgainCelebrationBtn.addEventListener('click', resetGameFromCelebration);
}

/**
 * Handle user's choice when they click a button
 */
function handleUserChoice(event) {
    const userChoice = event.currentTarget.dataset.choice;
    const computerChoice = getComputerChoice();

    // Determine winner
    const result = determineWinner(userChoice, computerChoice);

    // Update scores
    updateScores(result);

    // Show result
    displayResult(userChoice, computerChoice, result);
}

/**
 * Get random computer choice
 * @returns {string} - Computer's choice (rock, paper, or scissors)
 */
function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * CHOICES.length);
    return CHOICES[randomIndex];
}

/**
 * Determine the winner of the game
 * @param {string} userChoice - User's choice
 * @param {string} computerChoice - Computer's choice
 * @returns {string} - 'win', 'lose', or 'tie'
 */
function determineWinner(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
        return 'tie';
    }

    // Check winning conditions
    if (
        (userChoice === 'rock' && computerChoice === 'scissors') ||
        (userChoice === 'paper' && computerChoice === 'rock') ||
        (userChoice === 'scissors' && computerChoice === 'paper')
    ) {
        return 'win';
    }

    return 'lose';
}

/**
 * Update scores based on game result
 * @param {string} result - Game result ('win', 'lose', or 'tie')
 */
function updateScores(result) {
    if (result === 'win') {
        userScore++;
        saveScore(STORAGE_KEYS.USER_SCORE, userScore);
    } else if (result === 'lose') {
        computerScore++;
        saveScore(STORAGE_KEYS.COMPUTER_SCORE, computerScore);
    }
    // No score update for tie

    updateScoreDisplay();
}

/**
 * Update score display on screen
 */
function updateScoreDisplay() {
    userScoreElement.textContent = userScore;
    computerScoreElement.textContent = computerScore;
}

/**
 * Display game result to the user
 * @param {string} userChoice - User's choice
 * @param {string} computerChoice - Computer's choice
 * @param {string} result - Game result
 */
function displayResult(userChoice, computerChoice, result) {
    // Hide choices section
    choicesSection.classList.add('hidden');

    // Display the choices made with colored borders
    userChoiceDisplay.innerHTML = `<span class="emoji-black">${CHOICE_EMOJIS[userChoice]}</span>`;
    computerChoiceDisplay.innerHTML = `<span class="emoji-black">${CHOICE_EMOJIS[computerChoice]}</span>`;

    // Set border colors
    const userColor = CHOICE_COLORS[userChoice];
    const computerColor = CHOICE_COLORS[computerChoice];

    userChoiceDisplay.style.borderColor = getBorderColor(userColor);
    computerChoiceDisplay.style.borderColor = getBorderColor(computerColor);

    // Remove any existing winner class
    userChoiceWrapper.classList.remove('winner');
    pcChoiceWrapper.classList.remove('winner');

    // Display result message
    if (result === 'win') {
        // Add winner glow to user's choice
        userChoiceWrapper.classList.add('winner');

        // Show result section for wins (not celebration page yet)
        resultSection.classList.remove('hidden');
        resultText.textContent = 'YOU WIN';
        resultSubtext.textContent = 'AGAINST PC';
        playAgainBtn.textContent = 'PLAY AGAIN';
        nextBtn.classList.remove('hidden'); // Show NEXT button for wins
    } else {
        // Show result section for lose/tie
        resultSection.classList.remove('hidden');

        if (result === 'lose') {
            // Add winner glow to computer's choice
            pcChoiceWrapper.classList.add('winner');

            resultText.textContent = 'YOU LOST';
            resultSubtext.textContent = 'AGAINST PC';
            playAgainBtn.textContent = 'PLAY AGAIN';
            nextBtn.classList.add('hidden');
        } else {
            // Tie - no glow effect
            resultText.textContent = 'TIE UP';
            resultSubtext.textContent = '';
            playAgainBtn.textContent = 'REPLAY';
            nextBtn.classList.add('hidden');
        }
    }
}

/**
 * Get border color based on choice color name
 * @param {string} colorName - Color name (blue, pink, orange)
 * @returns {string} - Hex color code
 */
function getBorderColor(colorName) {
    const colors = {
        blue: '#0074B6',
        pink: '#BD00FF',
        orange: '#FFA943'
    };
    return colors[colorName] || '#FFFFFF';
}

/**
 * Show celebration page (from result screen after clicking NEXT)
 */
function showCelebration() {
    resultSection.classList.add('hidden');
    celebrationPage.classList.remove('hidden');
}

/**
 * Reset game for new round (from result screen)
 */
function resetGame() {
    resultSection.classList.add('hidden');
    choicesSection.classList.remove('hidden');
}

/**
 * Reset game from celebration page
 */
function resetGameFromCelebration() {
    celebrationPage.classList.add('hidden');
    choicesSection.classList.remove('hidden');
}

// Initialize game when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initGame);
