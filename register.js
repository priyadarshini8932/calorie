document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const errorElement = document.getElementById('registerError');
    
    // Validate passwords match
    if (password !== confirmPassword) {
        errorElement.textContent = 'Passwords do not match';
        return;
    }
    
    // Get users from localStorage or initialize empty array
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Check if username exists
    if (users.some(user => user.username === username)) {
        errorElement.textContent = 'Username already exists';
        return;
    }
    
    // Create new user with default values
    const newUser = {
        username,
        password,
        foodEntries: [],
        totalCalories: 0,
        totalProtein: 0,
        totalCarbs: 0,
        totalFat: 0,
        goals: {
            calorieGoal: 0,
            proteinGoal: 0,
            carbsGoal: 0,
            fatGoal: 0
        }
    };
    
    // Save user
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    // Redirect to main page
    window.location.href = 'index.html';
});