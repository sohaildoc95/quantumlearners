// Dummy user for testing
const dummyUser = {
    phone: '1234567890',
    password: 'test123'
};

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    
    // Check credentials against dummy user
    if (phone === dummyUser.phone && password === dummyUser.password) {
        // Store login state in sessionStorage
        sessionStorage.setItem('isLoggedIn', 'true');
        
        // Redirect to dashboard using server path
        window.location.href = '/protected/pages/dashboard/index.html';
    } else {
        alert('Invalid phone number or password');
    }
}); 