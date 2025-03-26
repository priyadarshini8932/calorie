document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorElement = document.getElementById('loginError');
    
    // Get users from localStorage or initialize empty array
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Find user
    const user = users.find(user => user.username === username && user.password === password);
    
    if (user) {
        // Store current user in localStorage
        localStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = 'index.html';
    } else {
        errorElement.textContent = 'Invalid username or password';
    }
});