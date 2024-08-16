document.getElementById('addTaskBtn').addEventListener('click', addTask);
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    updateClock();
    setInterval(updateClock, 1000);
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    const dateInput = document.getElementById('dateInput').value;
    const timeInput = document.getElementById('timeInput').value;
    
    if (taskText !== '' && dateInput !== '' && timeInput !== '') {
        const taskList = document.getElementById('taskList');

        const dateTime = `${dateInput} ${timeInput}`;

        const li = document.createElement('li');

        const taskContent = document.createElement('span');
        taskContent.textContent = `${taskText} (${dateTime})`;

        const doneBtn = document.createElement('button');
        doneBtn.textContent = '✅';
        doneBtn.className = 'doneBtn';
        doneBtn.addEventListener('click', () => {
            li.classList.toggle('done');
            saveTasks();
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '❌';
        deleteBtn.className = 'deleteBtn';
        deleteBtn.addEventListener('click', () => {
            taskList.removeChild(li);
            saveTasks();
        });

        li.appendChild(taskContent);
        li.appendChild(doneBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);

        taskInput.value = '';
        document.getElementById('dateInput').value = '';
        document.getElementById('timeInput').value = '';
        saveTasks();
    } else {
        alert('Please enter a task, date, and time.');
    }
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#taskList li').forEach(li => {
        const taskContent = li.querySelector('span').textContent;
        tasks.push({
            text: taskContent,
            done: li.classList.contains('done')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
        tasks.forEach(task => {
            const taskList = document.getElementById('taskList');

            const li = document.createElement('li');

            const taskContent = document.createElement('span');
            taskContent.textContent = task.text;

            if (task.done) {
                li.classList.add('done');
            }

            const doneBtn = document.createElement('button');
            doneBtn.textContent = '✅';
            doneBtn.className = 'doneBtn';
            doneBtn.addEventListener('click', () => {
                li.classList.toggle('done');
                saveTasks();
            });

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = '❌';
            deleteBtn.className = 'deleteBtn';
            deleteBtn.addEventListener('click', () => {
                taskList.removeChild(li);
                saveTasks();
            });

            li.appendChild(taskContent);
            li.appendChild(doneBtn);
            li.appendChild(deleteBtn);
            taskList.appendChild(li);
        });
    }
}

function updateClock() {
    const now = new Date();

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const currentDate = now.toLocaleDateString(undefined, options);
    document.getElementById('currentDate').textContent = currentDate;

    const currentTime = now.toLocaleTimeString();
    document.getElementById('currentTime').textContent = currentTime;
}
