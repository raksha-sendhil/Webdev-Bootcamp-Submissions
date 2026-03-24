const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');

// Function to add a task
function addTask() {
    const taskValue = input.value.trim();
    
    if (taskValue === "") {
        alert("Please enter a task!");
        return;
    }

    const li = document.createElement('li');
    li.innerHTML = `
        <span>${taskValue}</span>
        <button class="delete-btn">Delete</button>
    `;

    taskList.appendChild(li);
    input.value = ""; // Clear input after adding
}

// Add task on button click
addBtn.addEventListener('click', addTask);

// Add task on "Enter" key press
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

// Delete task using Event Delegation
taskList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        e.target.parentElement.remove();
    }
})