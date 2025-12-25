/**
 * Rock Paper Scissors Game - Main Game Logic
 * Handles all game state, user interactions, and UI updates
 */

// Game state
let userScore = 0;
let computerScore = 0;
let isGameInProgress = false;

// Game configuration
const MAX_SCORE = 999;
const DEBOUNCE_DELAY = 500;

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

// DOM Elements - with null checks
let choiceButtons, choicesSection, resultSection, userScoreElement, computerScoreElement;
let userChoiceDisplay, computerChoiceDisplay, userChoiceWrapper, pcChoiceWrapper;
let resultText, resultSubtext, playAgainBtn, nextBtn, playAgainCelebrationBtn, celebrationPage;

/**
 * Initialize all DOM element references with validation
 * @returns {boolean} True if all elements found successfully
 */
function initializeDOMElements() {
    try {
        choiceButtons = document.querySelectorAll('.choice-btn');
        choicesSection = document.getElementById('choices-section');
        resultSection = document.getElementById('result-section');
        userScoreElement = document.getElementById('user-score');
        computerScoreElement = document.getElementById('computer-score');
        userChoiceDisplay = document.getElementById('user-choice-display');
        computerChoiceDisplay = document.getElementById('computer-choice-display');
        userChoiceWrapper = document.getElementById('user-choice-wrapper');
        pcChoiceWrapper = document.getElementById('pc-choice-wrapper');
        resultText = document.getElementById('result-text');
        resultSubtext = document.getElementById('result-subtext');
        playAgainBtn = document.getElementById('play-again-btn');
        nextBtn = document.getElementById('next-btn');
        playAgainCelebrationBtn = document.getElementById('play-again-celebration');
        celebrationPage = document.getElementById('celebration-page');

        // Validate all critical elements exist
        const requiredElements = [
            choicesSection, resultSection, userScoreElement, computerScoreElement,
            userChoiceDisplay, computerChoiceDisplay, resultText, playAgainBtn
        ];

        const allElementsFound = requiredElements.every(el => el !== null);

        if (!allElementsFound) {
            console.error('Critical DOM elements missing');
            return false;
        }

        return true;
    } catch (error) {
        console.error('Error initializing DOM elements:', error);
        return false;
    }
}

/**
 * Initialize the game with error handling
 */
function initGame() {
    try {
        // Initialize DOM elements
        if (!initializeDOMElements()) {
            console.error('Failed to initialize game - DOM elements missing');
            return;
        }

        // Load scores from localStorage with error handling
        const scores = initializeScores();
        userScore = Math.min(scores.userScore, MAX_SCORE);
        computerScore = Math.min(scores.computerScore, MAX_SCORE);

        // Update score display
        updateScoreDisplay();

        // Add event listeners to choice buttons with debouncing
        if (choiceButtons && choiceButtons.length > 0) {
            choiceButtons.forEach(button => {
                button.addEventListener('click', debounce(handleUserChoice, DEBOUNCE_DELAY));
            });
        }

        // Add event listeners to play again buttons
        if (playAgainBtn) {
            playAgainBtn.addEventListener('click', resetGame);
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', showCelebration);
        }
        if (playAgainCelebrationBtn) {
            playAgainCelebrationBtn.addEventListener('click', resetGameFromCelebration);
        }

        console.log('Game initialized successfully');
    } catch (error) {
        console.error('Fatal error initializing game:', error);
    }
}

/**
 * Debounce function to prevent rapid clicking
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Handle user's choice when they click a button
 * @param {Event} event - Click event
 */
function handleUserChoice(event) {
    // Prevent multiple simultaneous games
    if (isGameInProgress) {
        console.warn('Game already in progress');
        return;
    }

    try {
        isGameInProgress = true;

        // Validate event and dataset
        if (!event || !event.currentTarget || !event.currentTarget.dataset) {
            console.error('Invalid event object');
            isGameInProgress = false;
            return;
        }

        const userChoice = event.currentTarget.dataset.choice;

        // Validate user choice
        if (!CHOICES.includes(userChoice)) {
            console.error('Invalid user choice:', userChoice);
            isGameInProgress = false;
            return;
        }

        const computerChoice = getComputerChoice();

        // Determine winner
        const result = determineWinner(userChoice, computerChoice);

        // Update scores
        updateScores(result);

        // Show result
        displayResult(userChoice, computerChoice, result);

        // Reset game in progress flag after animation
        setTimeout(() => {
            isGameInProgress = false;
        }, 300);
    } catch (error) {
        console.error('Error handling user choice:', error);
        isGameInProgress = false;
    }
}

/**
 * Get random computer choice
 * @returns {string} Computer's choice (rock, paper, or scissors)
 */
function getComputerChoice() {
    try {
        const randomIndex = Math.floor(Math.random() * CHOICES.length);
        return CHOICES[randomIndex];
    } catch (error) {
        console.error('Error getting computer choice:', error);
        return 'rock'; // Fallback
    }
}

/**
 * Determine the winner of the game
 * @param {string} userChoice - User's choice
 * @param {string} computerChoice - Computer's choice
 * @returns {string} 'win', 'lose', or 'tie'
 */
function determineWinner(userChoice, computerChoice) {
    try {
        // Validate inputs
        if (!CHOICES.includes(userChoice) || !CHOICES.includes(computerChoice)) {
            console.error('Invalid choices for winner determination');
            return 'tie';
        }

        if (userChoice === computerChoice) {
            return 'tie';
        }

        // Check winning conditions
        const winConditions = {
            rock: 'scissors',
            paper: 'rock',
            scissors: 'paper'
        };

        return winConditions[userChoice] === computerChoice ? 'win' : 'lose';
    } catch (error) {
        console.error('Error determining winner:', error);
        return 'tie';
    }
}

/**
 * Update scores based on game result with validation
 * @param {string} result - Game result ('win', 'lose', or 'tie')
 */
function updateScores(result) {
    try {
        if (result === 'win') {
            userScore = Math.min(userScore + 1, MAX_SCORE);
            const saved = saveScore(STORAGE_KEYS.USER_SCORE, userScore);
            if (!saved) {
                console.warn('Failed to save user score');
            }
        } else if (result === 'lose') {
            computerScore = Math.min(computerScore + 1, MAX_SCORE);
            const saved = saveScore(STORAGE_KEYS.COMPUTER_SCORE, computerScore);
            if (!saved) {
                console.warn('Failed to save computer score');
            }
        }

        updateScoreDisplay();
    } catch (error) {
        console.error('Error updating scores:', error);
    }
}

/**
 * Update score display on screen with validation
 */
function updateScoreDisplay() {
    try {
        if (userScoreElement) {
            userScoreElement.textContent = userScore;
        }
        if (computerScoreElement) {
            computerScoreElement.textContent = computerScore;
        }
    } catch (error) {
        console.error('Error updating score display:', error);
    }
}

/**
 * Display game result to the user with validation
 * @param {string} userChoice - User's choice
 * @param {string} computerChoice - Computer's choice
 * @param {string} result - Game result
 */
function displayResult(userChoice, computerChoice, result) {
    try {
        // Validate inputs
        if (!CHOICES.includes(userChoice) || !CHOICES.includes(computerChoice)) {
            console.error('Invalid choices for display');
            return;
        }

        // Hide choices section
        if (choicesSection) {
            choicesSection.classList.add('hidden');
        }

        // Display the choices made with colored borders
        if (userChoiceDisplay && CHOICE_EMOJIS[userChoice]) {
            userChoiceDisplay.innerHTML = `<span class="emoji-black">${CHOICE_EMOJIS[userChoice]}</span>`;
        }
        if (computerChoiceDisplay && CHOICE_EMOJIS[computerChoice]) {
            computerChoiceDisplay.innerHTML = `<span class="emoji-black">${CHOICE_EMOJIS[computerChoice]}</span>`;
        }

        // Set border colors
        const userColor = CHOICE_COLORS[userChoice];
        const computerColor = CHOICE_COLORS[computerChoice];

        if (userChoiceDisplay) {
            userChoiceDisplay.style.borderColor = getBorderColor(userColor);
        }
        if (computerChoiceDisplay) {
            computerChoiceDisplay.style.borderColor = getBorderColor(computerColor);
        }

        // Remove any existing winner class
        if (userChoiceWrapper) {
            userChoiceWrapper.classList.remove('winner');
        }
        if (pcChoiceWrapper) {
            pcChoiceWrapper.classList.remove('winner');
        }

        // Display result message
        if (result === 'win') {
            if (userChoiceWrapper) {
                userChoiceWrapper.classList.add('winner');
            }
            if (resultSection) {
                resultSection.classList.remove('hidden');
            }
            if (resultText) {
                resultText.textContent = 'YOU WIN';
            }
            if (resultSubtext) {
                resultSubtext.textContent = 'AGAINST PC';
            }
            if (playAgainBtn) {
                playAgainBtn.textContent = 'PLAY AGAIN';
            }
            if (nextBtn) {
                nextBtn.classList.remove('hidden');
            }
        } else {
            if (resultSection) {
                resultSection.classList.remove('hidden');
            }

            if (result === 'lose') {
                if (pcChoiceWrapper) {
                    pcChoiceWrapper.classList.add('winner');
                }
                if (resultText) {
                    resultText.textContent = 'YOU LOST';
                }
                if (resultSubtext) {
                    resultSubtext.textContent = 'AGAINST PC';
                }
                if (playAgainBtn) {
                    playAgainBtn.textContent = 'PLAY AGAIN';
                }
                if (nextBtn) {
                    nextBtn.classList.add('hidden');
                }
            } else {
                if (resultText) {
                    resultText.textContent = 'TIE UP';
                }
                if (resultSubtext) {
                    resultSubtext.textContent = '';
                }
                if (playAgainBtn) {
                    playAgainBtn.textContent = 'REPLAY';
                }
                if (nextBtn) {
                    nextBtn.classList.add('hidden');
                }
            }
        }
    } catch (error) {
        console.error('Error displaying result:', error);
    }
}

/**
 * Get border color based on choice color name
 * @param {string} colorName - Color name (blue, pink, orange)
 * @returns {string} Hex color code
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
    try {
        if (resultSection) {
            resultSection.classList.add('hidden');
        }
        if (celebrationPage) {
            celebrationPage.classList.remove('hidden');
        }
    } catch (error) {
        console.error('Error showing celebration:', error);
    }
}

/**
 * Reset game for new round (from result screen)
 */
function resetGame() {
    try {
        if (resultSection) {
            resultSection.classList.add('hidden');
        }
        if (choicesSection) {
            choicesSection.classList.remove('hidden');
        }
        isGameInProgress = false;
    } catch (error) {
        console.error('Error resetting game:', error);
    }
}

/**
 * Reset game from celebration page
 */
function resetGameFromCelebration() {
    try {
        if (celebrationPage) {
            celebrationPage.classList.add('hidden');
        }
        if (choicesSection) {
            choicesSection.classList.remove('hidden');
        }
        isGameInProgress = false;
    } catch (error) {
        console.error('Error resetting from celebration:', error);
    }
}

// Initialize game when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        initGame();
    } catch (error) {
        console.error('Fatal error on DOM load:', error);
    }
});
