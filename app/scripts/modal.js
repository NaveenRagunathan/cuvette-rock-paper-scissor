// DOM Elements for modal
const rulesBtn = document.getElementById('rules-btn');
const rulesBtnCelebration = document.getElementById('rules-btn-celebration');
const rulesModal = document.getElementById('rules-modal');
const closeModalBtn = document.getElementById('close-modal');

/**
 * Open the rules modal
 */
function openModal() {
    rulesModal.classList.remove('hidden');
}

/**
 * Close the rules modal
 */
function closeModal() {
    rulesModal.classList.add('hidden');
}

/**
 * Close modal when clicking outside the modal content
 * @param {Event} event - Click event
 */
function handleModalClick(event) {
    // Close modal if user clicks on the overlay (not the content)
    if (event.target === rulesModal) {
        closeModal();
    }
}

// Event listeners
rulesBtn.addEventListener('click', openModal);

// Add listener for celebration page rules button if it exists
if (rulesBtnCelebration) {
    rulesBtnCelebration.addEventListener('click', openModal);
}

closeModalBtn.addEventListener('click', closeModal);
rulesModal.addEventListener('click', handleModalClick);

// Close modal with Escape key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !rulesModal.classList.contains('hidden')) {
        closeModal();
    }
});
