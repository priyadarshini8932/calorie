// Load goals from localStorage
document.addEventListener('DOMContentLoaded', () => {
    const calorieGoal = localStorage.getItem("calorieGoal") || 0;
    const proteinGoal = localStorage.getItem("proteinGoal") || 0;
    const carbsGoal = localStorage.getItem("carbsGoal") || 0;
    const fatGoal = localStorage.getItem("fatGoal") || 0;

    document.getElementById('calorieGoal').value = calorieGoal;
    document.getElementById('proteinGoal').value = proteinGoal;
    document.getElementById('carbsGoal').value = carbsGoal;
    document.getElementById('fatGoal').value = fatGoal;

    updateProgress();
});

// Set goals and save to localStorage
document.getElementById('goalForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const calorieGoal = document.getElementById('calorieGoal').value;
    const proteinGoal = document.getElementById('proteinGoal').value;
    const carbsGoal = document.getElementById('carbsGoal').value;
    const fatGoal = document.getElementById('fatGoal').value;

    localStorage.setItem("calorieGoal", calorieGoal);
    localStorage.setItem("proteinGoal", proteinGoal);
    localStorage.setItem("carbsGoal", carbsGoal);
    localStorage.setItem("fatGoal", fatGoal);

    updateProgress();
});

// Update progress based on goals and consumed values
function updateProgress() {
    const calorieGoal = localStorage.getItem("calorieGoal") || 0;
    const proteinGoal = localStorage.getItem("proteinGoal") || 0;
    const carbsGoal = localStorage.getItem("carbsGoal") || 0;
    const fatGoal = localStorage.getItem("fatGoal") || 0;

    const caloriesConsumed = localStorage.getItem("totalCalories") || 0;
    const proteinConsumed = localStorage.getItem("totalProtein") || 0;
    const carbsConsumed = localStorage.getItem("totalCarbs") || 0;
    const fatConsumed = localStorage.getItem("totalFat") || 0;

    document.getElementById('calorieGoalDisplay').textContent = calorieGoal;
    document.getElementById('proteinGoalDisplay').textContent = proteinGoal;
    document.getElementById('carbsGoalDisplay').textContent = carbsGoal;
    document.getElementById('fatGoalDisplay').textContent = fatGoal;

    document.getElementById('caloriesConsumed').textContent = caloriesConsumed;
    document.getElementById('proteinConsumed').textContent = proteinConsumed;
    document.getElementById('carbsConsumed').textContent = carbsConsumed;
    document.getElementById('fatConsumed').textContent = fatConsumed;
}
// Load goals from current user
document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('currentUser')) || {};
    const goals = user.goals || {};
    
    document.getElementById('calorieGoal').value = goals.calorieGoal || 0;
    document.getElementById('proteinGoal').value = goals.proteinGoal || 0;
    document.getElementById('carbsGoal').value = goals.carbsGoal || 0;
    document.getElementById('fatGoal').value = goals.fatGoal || 0;

    updateProgress();
});

// Set goals and save to current user
document.getElementById('goalForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem('currentUser')) || {};
    if (!user.goals) user.goals = {};
    
    user.goals.calorieGoal = document.getElementById('calorieGoal').value;
    user.goals.proteinGoal = document.getElementById('proteinGoal').value;
    user.goals.carbsGoal = document.getElementById('carbsGoal').value;
    user.goals.fatGoal = document.getElementById('fatGoal').value;

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

    updateProgress();
});