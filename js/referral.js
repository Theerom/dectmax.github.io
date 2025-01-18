// Load user data and update UI
function loadReferral() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return;

    // Update credits display
    document.getElementById('userCredits').textContent = `$${user.credits?.toFixed(2) || '0.00'}`;
    
    // Update referral code
    document.getElementById('referralCode').textContent = user.referralCode || '';

    // Base URL for sharing
    const baseUrl = window.location.origin;
    const shareText = `Join me on Earnpaper and start earning! Use my referral code: ${user.referralCode} - ${baseUrl}`;

    // Handle copy button
    document.getElementById('copyBtn').addEventListener('click', () => {
        navigator.clipboard.writeText(shareText).then(() => {
            alert('Referral link copied to clipboard!');
        });
    });

    // Handle WhatsApp sharing
    document.getElementById('whatsappBtn').addEventListener('click', () => {
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
        window.open(whatsappUrl, '_blank');
    });

    // Handle Email sharing
    document.getElementById('emailBtn').addEventListener('click', () => {
        const subject = 'Join me on Earnpaper!';
        const emailUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(shareText)}`;
        window.open(emailUrl);
    });
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

// Load referral data on page load
loadReferral(); 