/**
 * Reset Scores Module
 * Handles reset confirmation modal and score reset functionality
 */

// DOM Elements for reset functionality
const resetBtn = document.getElementById('reset-btn');
const resetBtnCelebration = document.getElementById('reset-btn-celebration');
const resetModal = document.getElementById('reset-modal');
const closeResetModalBtn = document.getElementById('close-reset-modal');
const cancelResetBtn = document.getElementById('cancel-reset');
const confirmResetBtn = document.getElementById('confirm-reset');

/**
 * Open the reset confirmation modal
 */
function openResetModal() {
    if (resetModal) {
        resetModal.classList.remove('hidden');
    }
}

/**
 * Close the reset confirmation modal
 */
function closeResetModal() {
    if (resetModal) {
        resetModal.classList.add('hidden');
    }
}

/**
 * Execute the score reset with proper state management
 */
function executeScoreReset() {
    try {
        // Reset scores in localStorage using existing function from storage.js
        const success = resetScores();

        if (success) {
            // Update game state variables (from game.js)
            if (typeof userScore !== 'undefined') {
                userScore = 0;
            }
            if (typeof computerScore !== 'undefined') {
                computerScore = 0;
            }

            // Update score display on screen
            if (typeof updateScoreDisplay === 'function') {
                updateScoreDisplay();
            }

            console.log('Scores reset successfully');
        } else {
            console.error('Failed to reset scores in localStorage');
        }

        // Close the modal
        closeResetModal();
    } catch (error) {
        console.error('Error resetting scores:', error);
        closeResetModal();
    }
}

/**
 * Close modal when clicking outside the modal content
 * @param {Event} event - Click event
 */
function handleResetModalClick(event) {
    // Close modal if user clicks on the overlay (not the content)
    if (event.target === resetModal) {
        closeResetModal();
    }
}

// Event listeners for reset buttons
if (resetBtn) {
    resetBtn.addEventListener('click', openResetModal);
}

if (resetBtnCelebration) {
    resetBtnCelebration.addEventListener('click', openResetModal);
}

// Event listeners for modal actions
if (closeResetModalBtn) {
    closeResetModalBtn.addEventListener('click', closeResetModal);
}

if (cancelResetBtn) {
    cancelResetBtn.addEventListener('click', closeResetModal);
}

if (confirmResetBtn) {
    confirmResetBtn.addEventListener('click', executeScoreReset);
}

if (resetModal) {
    resetModal.addEventListener('click', handleResetModalClick);
}

// Close reset modal with Escape key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && resetModal && !resetModal.classList.contains('hidden')) {
        closeResetModal();
    }
});
