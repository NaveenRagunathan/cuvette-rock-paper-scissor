/**
 * Global configuration for Rock Paper Scissors Game
 * This file must be loaded FIRST before other scripts
 */

// Storage keys for localStorage (global scope for cross-file access)
window.STORAGE_KEYS = {
    USER_SCORE: 'rps_user_score',
    COMPUTER_SCORE: 'rps_computer_score'
};

// Maximum allowed score (global for use across all files)
window.MAX_SCORE = 999;
