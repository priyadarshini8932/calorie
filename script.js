// Check authentication state
document.addEventListener('DOMContentLoaded', function() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
        window.location.href = 'index.html';
        return;
    }

    // Add logout button for logged-in users
    if (user.username !== 'guest') {
        const logoutBtn = document.createElement('a');
        logoutBtn.href = '#';
        logoutBtn.textContent = 'Logout';
        logoutBtn.style.float = 'right';
        logoutBtn.style.marginLeft = '15px';
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('currentUser');
            window.location.href = 'index.html';
        });
        
        const header = document.querySelector('.container h1');
        header.insertAdjacentElement('afterend', logoutBtn);
    }

    // Rest of your existing code...
    loadFoodEntries();
});



let foodData = {};  // Store dataset in an object

// Load CSV file into JavaScript
fetch('data/indian_food_large_dataset.csv')
    .then(response => response.text())
    .then(data => {
        let rows = data.split("\n").slice(1);  // Remove header
        rows.forEach(row => {
            let columns = row.split(",");
            let name = columns[0].trim().toLowerCase();
            foodData[name] = {
                calories: parseInt(columns[1]),
                protein: parseFloat(columns[2]),
                carbs: parseInt(columns[3]),
                fat: parseFloat(columns[4])
            };
        });
    });

// Get current user data
function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser')) || {
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
    };
}

// Save current user data
function saveCurrentUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    // Update users array if not guest
    if (user.username !== 'guest') {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const index = users.findIndex(u => u.username === user.username);
        if (index !== -1) {
            users[index] = user;
            localStorage.setItem('users', JSON.stringify(users));
        }
    }
}

// Load food entries for current user
function loadFoodEntries() {
    const user = getCurrentUser();
    const foodTable = document.getElementById('foodTable');
    foodTable.innerHTML = '';
    
    user.foodEntries.forEach(entry => {
        let row = `<tr>
            <td>${entry.name}</td>
            <td>${entry.calories}</td>
            <td>${entry.protein}</td>
            <td>${entry.carbs}</td>
            <td>${entry.fat}</td>
        </tr>`;
        foodTable.innerHTML += row;
    });
    
    // Update totals display
    document.getElementById('totalCalories').textContent = user.totalCalories;
    
    // Update localStorage for backward compatibility (temporary)
    localStorage.setItem("totalCalories", user.totalCalories);
    localStorage.setItem("totalProtein", user.totalProtein);
    localStorage.setItem("totalCarbs", user.totalCarbs);
    localStorage.setItem("totalFat", user.totalFat);
}

// Add food to the table and update totals
function addFood() {
    let foodName = document.getElementById('foodInput').value.toLowerCase();
    if (foodData[foodName]) {
        let foodInfo = foodData[foodName];
        const user = getCurrentUser();

        // Add to food entries
        user.foodEntries.push({
            name: foodName,
            calories: foodInfo.calories,
            protein: foodInfo.protein,
            carbs: foodInfo.carbs,
            fat: foodInfo.fat
        });

        // Update totals
        user.totalCalories += foodInfo.calories;
        user.totalProtein += foodInfo.protein;
        user.totalCarbs += foodInfo.carbs;
        user.totalFat += foodInfo.fat;

        // Save user and update UI
        saveCurrentUser(user);
        loadFoodEntries();
        
        // Clear input field
        document.getElementById('foodInput').value = '';
    } else {
        alert("Food not found in database.");
    }
}

// Load food entries when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadFoodEntries();
    
    // Show logout link if logged in
    const user = getCurrentUser();
    const logoutLink = document.getElementById('logoutLink');
    if (user.username !== 'guest') {
        logoutLink.style.display = 'inline';
    }
});
// Add this to your existing script.js
function updateUserGreeting() {
    const user = getCurrentUser();
    const greetingElement = document.getElementById('userGreeting');
    const logoutLink = document.getElementById('logoutLink');
    
    if (user.username !== 'guest') {
        greetingElement.textContent = `Welcome, ${user.username}!`;
        logoutLink.style.display = 'inline';
    } else {
        greetingElement.textContent = 'Guest Mode';
        logoutLink.style.display = 'none';
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

// Call this in your DOMContentLoaded event
document.addEventListener('DOMContentLoaded', () => {
    loadFoodEntries();
    updateUserGreeting(); // Add this line
});
// Check authentication state
document.addEventListener('DOMContentLoaded', function() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
        // If no user found, redirect to login page
        window.location.href = 'index.html';
        return;
    }

    // Update UI based on user type
    const authStatus = document.createElement('div');
    authStatus.className = 'auth-status';
    authStatus.innerHTML = user.username === 'guest' 
        ? 'Guest Mode | <a href="index.html">Login</a>' 
        : `Logged in as ${user.username} | <a href="#" id="logout">Logout</a>`;
    
    document.querySelector('.container').prepend(authStatus);
    
    if (user.username !== 'guest') {
        document.getElementById('logout').addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('currentUser');
            window.location.href = 'index.html';
        });
    }

    // Rest of your existing code...
    loadFoodEntries();
});