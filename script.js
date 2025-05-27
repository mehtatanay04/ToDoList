// Load tasks from localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');
    li.className = 'task-item flex justify-between items-center p-3 bg-gray-100 rounded-lg';
    li.innerHTML = `
        <div class="flex items-center">
            <input type="checkbox" onchange="toggleTask(this)" class="mr-2 h-5 w-5">
            <span>${taskText}</span>
        </div>
        <button onclick="deleteTask(this)" class="text-red-500 hover:text-red-700">✕</button>
    `;
    taskList.appendChild(li);
    taskInput.value = '';
    saveTasks();
    updateClearAllButton();
}

function toggleTask(checkbox) {
    const li = checkbox.parentElement.parentElement;
    li.classList.toggle('completed', checkbox.checked);
    saveTasks();
}

function deleteTask(button) {
    button.parentElement.remove();
    saveTasks();
    updateClearAllButton();
}

function clearAllTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    saveTasks();
    updateClearAllButton();
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#taskList li').forEach(li => {
        tasks.push({
            text: li.querySelector('span').textContent,
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('taskList');
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item flex justify-between items-center p-3 bg-gray-100 rounded-lg ${task.completed ? 'completed' : ''}`;
        li.innerHTML = `
            <div class="flex items-center">
                <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(this)" class="mr-2 h-5 w-5">
                <span>${task.text}</span>
            </div>
            <button onclick="deleteTask(this)" class="text-red-500 hover:text-red-700">✕</button>
        `;
        taskList.appendChild(li);
    });
    updateClearAllButton();
}

function updateClearAllButton() {
    const clearAllBtn = document.getElementById('clear-all-btn');
    const taskList = document.getElementById('taskList');
    clearAllBtn.classList.toggle('hidden', taskList.children.length === 0);
}

// Allow adding task with Enter key
document.getElementById('taskInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});