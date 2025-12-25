// Storage keys for localStorage
const STORAGE_KEYS = {
    USER_SCORE: 'userScore',
    COMPUTER_SCORE: 'computerScore'
};

/**
 * Save score to localStorage
 * @param {string} key - The storage key
 * @param {number} value - The score value
 */
function saveScore(key, value) {
    localStorage.setItem(key, value.toString());
}

/**
 * Load score from localStorage
 * @param {string} key - The storage key
 * @returns {number} - The stored score or 0 if not found
 */
function loadScore(key) {
    const score = localStorage.getItem(key);
    return score ? parseInt(score, 10) : 0;
}

/**
 * Initialize scores from localStorage
 * @returns {object} - Object with userScore and computerScore
 */
function initializeScores() {
    return {
        userScore: loadScore(STORAGE_KEYS.USER_SCORE),
        computerScore: loadScore(STORAGE_KEYS.COMPUTER_SCORE)
    };
}

/**
 * Reset all scores to 0
 */
function resetScores() {
    saveScore(STORAGE_KEYS.USER_SCORE, 0);
    saveScore(STORAGE_KEYS.COMPUTER_SCORE, 0);
}
