document.addEventListener('DOMContentLoaded', function() {
    const addBtn = document.getElementById('addBtn');
    const refreshBtn = document.getElementById('refreshBtn');
    const addForm = document.getElementById('addForm');
    const submitBtn = document.getElementById('submitBtn');
    const themeToggle = document.getElementById('themeToggle');
    const todoTable = document.getElementById('todoTable').getElementsByTagName('tbody')[0];
    
    // Theme toggle functionality
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            themeToggle.textContent = '🌙';
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggle.textContent = '☀️';
            localStorage.setItem('theme', 'dark');
        }
    });
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.textContent = '☀️';
    }
    
    // Show/hide add form
    addBtn.addEventListener('click', function() {
        addForm.style.display = addForm.style.display === 'block' ? 'none' : 'block';
        if (addForm.style.display === 'block') {
            document.getElementById('taskName').focus();
        }
    });
    
    // Refresh the list
    refreshBtn.addEventListener('click', function() {
        if (todoTable.rows.length > 0) {
            if (confirm('Are you sure you want to clear all tasks?')) {
                todoTable.innerHTML = '';
            }
        }
    });
    
    // Add new task
    submitBtn.addEventListener('click', addNewTask);
    
    // Allow adding task with Enter key
    document.getElementById('taskName').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addNewTask();
        }
    });
    
    function addNewTask() {
        const taskName = document.getElementById('taskName').value.trim();
        
        if (taskName) {
            addTask(taskName, 'pending');
            
            // Reset form
            document.getElementById('taskName').value = '';
            addForm.style.display = 'none';
        }
    }
    
    // Function to add a new task
    function addTask(name, status) {
        const newRow = todoTable.insertRow();
        newRow.className = 'task-row';
        
        // Task name cell
        const nameCell = newRow.insertCell(0);
        nameCell.textContent = name;
        
        // Status cell with dropdown
        const statusCell = newRow.insertCell(1);
        const statusSelect = document.createElement('select');
        statusSelect.className = `status-select ${status === 'pending' ? 'status-pending' : 'status-completed'}`;
        statusSelect.innerHTML = `
            <option value="pending" ${status === 'pending' ? 'selected' : ''}>Pending</option>
            <option value="completed" ${status === 'completed' ? 'selected' : ''}>Completed</option>
        `;
        
        // Update status when changed
        statusSelect.addEventListener('change', function() {
            statusSelect.className = `status-select ${this.value === 'pending' ? 'status-pending' : 'status-completed'}`;
        });
        
        statusCell.appendChild(statusSelect);
        
        // Actions cell
        const actionsCell = newRow.insertCell(2);
        actionsCell.className = 'actions';
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'action-btn delete-btn';
        deleteBtn.innerHTML = '🗑️';
        deleteBtn.title = 'Delete task';
        deleteBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to delete this task?')) {
                todoTable.removeChild(newRow);
            }
        });
        
        actionsCell.appendChild(deleteBtn);
    }
    
    // Close form when clicking outside
    document.addEventListener('click', function(e) {
        if (!addForm.contains(e.target) && e.target !== addBtn) {
            addForm.style.display = 'none';
        }
    });
});