// Shared authentication functions
function initializeAuth() {
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([]));
    }
}

// Login Page Functionality
if (document.getElementById('loginForm')) {
    initializeAuth();
    
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const errorElement = document.getElementById('loginError');
        
        const users = JSON.parse(localStorage.getItem('users'));
        const user = users.find(u => u.username === username && u.password === password);
        
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            window.location.href = 'app.html';
        } else {
            errorElement.textContent = 'Invalid username or password';
        }
    });

    document.getElementById('guestBtn').addEventListener('click', function() {
        localStorage.setItem('currentUser', JSON.stringify({
            username: 'guest',
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
        }));
        window.location.href = 'app.html';
    });
}

// Registration Page Functionality
if (document.getElementById('registerForm')) {
    initializeAuth();
    
    document.getElementById('registerForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('regUsername').value;
        const password = document.getElementById('regPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const errorElement = document.getElementById('registerError');
        
        if (password !== confirmPassword) {
            errorElement.textContent = 'Passwords do not match';
            return;
        }
        
        const users = JSON.parse(localStorage.getItem('users'));
        if (users.some(u => u.username === username)) {
            errorElement.textContent = 'Username already exists';
            return;
        }
        
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
        
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        window.location.href = 'app.html';
    });
}