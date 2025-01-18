// Load user data and update UI
function loadDashboard() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return;

    // Update credits display
    document.getElementById('userCredits').textContent = `$${user.credits?.toFixed(2) || '0.00'}`;

    // Get dashboard container
    const container = document.querySelector('.grid');
    
    // Add dashboard cards
    container.innerHTML = `
        <!-- Balance Card -->
        <div class="bg-white p-6 rounded-lg shadow">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-semibold">Total Balance</h3>
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            </div>
            <p class="text-2xl font-bold">$${user.credits?.toFixed(2) || '0.00'}</p>
            <p class="text-sm text-gray-500 mt-2">Complete offers to earn more</p>
        </div>

        <!-- Offers Card -->
        <a href="/pages/offers.html" class="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-semibold">Complete Offers</h3>
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
            </div>
            <p class="text-sm text-gray-500">Earn money by completing simple tasks and offers</p>
        </a>

        <!-- Referral Card -->
        <a href="/pages/referral.html" class="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-semibold">Refer & Earn</h3>
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
            </div>
            <p class="text-sm text-gray-500">Earn $5 for each friend you refer</p>
        </a>
    `;
}

// Handle logout
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

// Load dashboard on page load
loadDashboard(); 