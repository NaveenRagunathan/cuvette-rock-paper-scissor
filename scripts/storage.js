/**
 * Storage utility module for managing game scores in localStorage
 * Handles all localStorage operations with error handling and validation
 */

// Storage keys for localStorage
const STORAGE_KEYS = {
    USER_SCORE: 'rps_user_score',
    COMPUTER_SCORE: 'rps_computer_score'
};

// Maximum allowed score
const MAX_SCORE = 999;

/**
 * Check if localStorage is available and working
 * @returns {boolean} True if localStorage is available
 */
function isLocalStorageAvailable() {
    try {
        const test = '__localStorage_test__';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch (e) {
        console.warn('localStorage is not available:', e);
        return false;
    }
}

/**
 * Save a score to localStorage with validation and error handling
 * @param {string} key - Storage key (use STORAGE_KEYS constants)
 * @param {number} value - Score value to save
 * @returns {boolean} True if save was successful
 */
function saveScore(key, value) {
    // Validate input
    if (typeof value !== 'number' || isNaN(value)) {
        console.error('Invalid score value:', value);
        return false;
    }

    // Clamp value to max score
    const clampedValue = Math.min(Math.max(0, value), MAX_SCORE);

    if (!isLocalStorageAvailable()) {
        console.warn('Cannot save score - localStorage unavailable');
        return false;
    }

    try {
        localStorage.setItem(key, clampedValue.toString());
        return true;
    } catch (e) {
        if (e.name === 'QuotaExceededError') {
            console.error('localStorage quota exceeded');
            // Clear old data and retry
            try {
                localStorage.clear();
                localStorage.setItem(key, clampedValue.toString());
                return true;
            } catch (retryError) {
                console.error('Failed to save after clearing:', retryError);
                return false;
            }
        }
        console.error('Error saving score:', e);
        return false;
    }
}

/**
 * Load a score from localStorage with validation
 * @param {string} key - Storage key (use STORAGE_KEYS constants)
 * @returns {number} Stored score or 0 if not found/invalid
 */
function loadScore(key) {
    if (!isLocalStorageAvailable()) {
        return 0;
    }

    try {
        const value = localStorage.getItem(key);

        // Return 0 if no value stored
        if (value === null) {
            return 0;
        }

        // Parse and validate
        const parsedValue = parseInt(value, 10);

        if (isNaN(parsedValue)) {
            console.warn('Invalid stored value, resetting to 0');
            saveScore(key, 0);
            return 0;
        }

        // Clamp to valid range
        return Math.min(Math.max(0, parsedValue), MAX_SCORE);
    } catch (e) {
        console.error('Error loading score:', e);
        return 0;
    }
}

/**
 * Initialize scores from localStorage or set to 0
 * @returns {Object} Object with userScore and computerScore
 */
function initializeScores() {
    const userScore = loadScore(STORAGE_KEYS.USER_SCORE);
    const computerScore = loadScore(STORAGE_KEYS.COMPUTER_SCORE);

    return {
        userScore,
        computerScore
    };
}

/**
 * Reset all scores to 0
 * @returns {boolean} True if reset was successful
 */
function resetScores() {
    const userSuccess = saveScore(STORAGE_KEYS.USER_SCORE, 0);
    const computerSuccess = saveScore(STORAGE_KEYS.COMPUTER_SCORE, 0);

    return userSuccess && computerSuccess;
}

/**
 * Get storage availability status
 * @returns {Object} Status object with availability info
 */
function getStorageStatus() {
    return {
        available: isLocalStorageAvailable(),
        userScore: loadScore(STORAGE_KEYS.USER_SCORE),
        computerScore: loadScore(STORAGE_KEYS.COMPUTER_SCORE)
    };
}
