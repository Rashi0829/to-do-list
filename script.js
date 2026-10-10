let tasks = [];

let taskInput = document.getElementById("taskInput");
let addBtn = document.getElementById("addBtn");
let taskList = document.getElementById("taskList");

let total = document.getElementById("total");
let completed = document.getElementById("completed");
let remaining = document.getElementById("remaining");

let currentFilter = "all";
let editIndex = -1;

// Add Task
addBtn.addEventListener("click", function () {
    let text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task!");
        return;
    }

    if (editIndex !== -1) {
        tasks[editIndex].text = text;
        editIndex = -1;
        addBtn.innerText = "Add";
    } else {
        tasks.push({
            text: text,
            done: false
        });
    }

    taskInput.value = "";
    renderTasks();
});

// Enter key se task add ya save hoga
taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addBtn.click();
    }
});

// Display Tasks
function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function (task, index) {

        if (currentFilter === "active" && task.done) {
            return;
        }

        if (currentFilter === "completed" && !task.done) {
            return;
        }

        let li = document.createElement("li");
        li.className = "task";

        if (task.done) {
            li.classList.add("completed");
        }

        // Checkbox
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.done;

        checkbox.addEventListener("change", function () {
            tasks[index].done = checkbox.checked;
            renderTasks();
        });

        // Task Text
        let span = document.createElement("span");
        span.className = "task-text";
        span.innerText = task.text;

        // Edit Button
        let editBtn = document.createElement("button");
        editBtn.innerText = "Edit";
        editBtn.className = "edit-btn";

        editBtn.addEventListener("click", function () {
            taskInput.value = tasks[index].text;
            editIndex = index;
            addBtn.innerText = "Save";
            taskInput.focus();
        });

        // Delete Button
        let deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";
        deleteBtn.className = "delete-btn";

        deleteBtn.addEventListener("click", function () {
            tasks.splice(index, 1);

            if (editIndex === index) {
                editIndex = -1;
                taskInput.value = "";
                addBtn.innerText = "Add";
            } else if (editIndex > index) {
                editIndex--;
            }

            renderTasks();
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });

    // Update Task Count
    let completedCount = tasks.filter(function (task) {
        return task.done;
    }).length;

    total.innerText = tasks.length;
    completed.innerText = completedCount;
    remaining.innerText = tasks.length - completedCount;
}

// Filter Tasks
let filterButtons = document.querySelectorAll(".filter");

filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        currentFilter = button.dataset.filter;

        filterButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        renderTasks();
    });
});0