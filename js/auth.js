// Check if user is logged in
function checkAuth() {
    const token = localStorage.getItem('token');
    if (!token && !window.location.pathname.includes('/login.html') && !window.location.pathname.includes('/signup.html')) {
        window.location.href = '/pages/login.html';
    }
}

// Handle login form
if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                window.location.href = '/pages/dashboard.html';
            } else {
                alert(data.error || 'Login failed');
            }
        } catch (error) {
            alert('An error occurred during login');
        }
    });
}

// Run auth check on page load
checkAuth(); 