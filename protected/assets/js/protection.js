// Check if user is logged in
function checkLoginStatus() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
        // Redirect to login page if not logged in
        window.location.href = '../../pages/login.html';
    }
}

// Handle logout
function logout() {
    // Clear session storage
    sessionStorage.removeItem('isLoggedIn');
    
    // Redirect to login page
    window.location.href = '../../pages/login.html';
}

// Run check when page loads
checkLoginStatus(); 