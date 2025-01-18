// Load user balance
function loadUserBalance() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.credits) {
        document.getElementById('userBalance').textContent = `$${user.credits.toFixed(2)}`;
    }
}

// Handle redeem form
if (document.getElementById('redeemForm')) {
    const form = document.getElementById('redeemForm');
    const minAmount = 500;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const user = JSON.parse(localStorage.getItem('user'));
        const amount = parseFloat(document.getElementById('amount').value);
        const paymentMethod = document.getElementById('paymentMethod').value;
        const paymentDetails = document.getElementById('paymentDetails').value;

        if (!user?.credits || user.credits < minAmount) {
            alert(`You need at least $${minAmount} to cash out`);
            return;
        }

        if (amount > user.credits) {
            alert('Amount exceeds available balance');
            return;
        }

        try {
            const response = await fetch('/api/redeem', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    userId: user.id,
                    amount,
                    paymentMethod,
                    paymentDetails
                })
            });

            if (!response.ok) throw new Error('Withdrawal failed');

            alert('Withdrawal request submitted successfully');
            window.location.href = `/pages/processing.html?amount=${amount}&method=${encodeURIComponent(paymentMethod)}`;
        } catch (error) {
            alert('Failed to process withdrawal');
        }
    });
}

// Load balance on page load
loadUserBalance(); 