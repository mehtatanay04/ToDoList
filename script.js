document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});

let taskCounter = 1;

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');
    li.className = 'task-item';
    li.innerHTML = `
        <span class="task-number">${taskCounter++}</span>
        <span class="task-text">${taskText}</span>
        <button onclick="toggleStatus(this)" class="status-button pending">pending</button>
        <button onclick="deleteTask(this)" class="delete-button">
            <i class="fas fa-trash"></i>
        </button>
    `;
    taskList.appendChild(li);
    taskInput.value = '';
    saveTasks();
}

function toggleStatus(button) {
    const isPending = button.classList.contains('pending');
    button.classList.toggle('pending', !isPending);
    button.classList.toggle('completed', isPending);
    button.textContent = isPending ? 'Completed' : 'pending';
    saveTasks();
}

function deleteTask(button) {
    const taskList = document.getElementById('taskList');
    const li = button.parentElement;
    li.remove();
    taskCounter = 1;
    Array.from(taskList.children).forEach((child, index) => {
        child.querySelector('.task-number').textContent = index + 1;
        taskCounter = index + 2;
    });
    saveTasks();
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#taskList li').forEach(li => {
        tasks.push({
            text: li.querySelector('.task-text').textContent,
            status: li.querySelector('.status-button').classList.contains('pending') ? 'pending' : 'completed'
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('taskList');
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.innerHTML = `
            <span class="task-number">${taskCounter++}</span>
            <span class="task-text">${task.text}</span>
            <button onclick="toggleStatus(this)" class="status-button ${task.status}">${task.status}</button>
            <button onclick="deleteTask(this)" class="delete-button">
                <i class="fas fa-trash"></i>
            </button>
        `;
        taskList.appendChild(li);
    });
}

document.getElementById('taskInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});