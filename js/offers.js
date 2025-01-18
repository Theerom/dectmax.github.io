// Load user data and update UI
function loadOffers() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return;

    // Update credits display
    document.getElementById('userCredits').textContent = `$${user.credits?.toFixed(2) || '0.00'}`;

    // Set up MyLead offerwall
    const offerwallFrame = document.getElementById('offerwallFrame');
    const MYLEAD_URL = "https://reward-me.eu/5eed231c-d4cc-11ef-b697-8a5fb7be40ea";
    
    // Add user ID as parameter for tracking
    offerwallFrame.src = user.id ? `${MYLEAD_URL}?user_id=${user.id}` : MYLEAD_URL;
}

// Handle logout (reuse from dashboard.js)
document.getElementById('logoutBtn')?.addEventListener('click', async () => {
    try {
        await fetch('/api/auth/logout', { method: 'POST' });
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/pages/login.html';
    } catch (error) {
        alert('Failed to logout');
    }
});

// Load offers on page load
loadOffers(); 