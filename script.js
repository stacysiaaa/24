const greetingEl = document.getElementById("greeting");
let userName = localStorage.getItem("userName");

if (!userName) {
    userName = prompt("Введіть ваше ім'я").trim() || "гість";
    if (userName !== "гість") {
        localStorage.setItem("userName", userName);
    }
}
greetingEl.textContent = `Привіт, ${userName}!`;


let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
renderTasks();


function addTask() {
    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();

    if (taskText !== "") {
        tasks.push(taskText);
        input.value = "";
        saveTasks();
        renderTasks();
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

document.getElementById("addBtn").addEventListener("click", addTask);
document.getElementById("taskInput").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});


function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.textContent = task;

        const btn = document.createElement("button");
        btn.textContent = "Видалити";
        btn.className = "delete";

        btn.addEventListener("click", () => deleteTask(index));

        list.appendChild(li);

        li.appendChild(btn);
    })
}


const select = document.getElementById("colorSelect");

const savedColor = localStorage.getItem("colorSelect");
if (savedColor) {
    document.body.style.backgroundColor = savedColor;
    select.value = savedColor;

}

select.addEventListener("change", () => {
    const color = select.value;
    localStorage.setItem("colorSelect", color);
    document.body.style.backgroundColor = color;
});


const checkboxes = document.querySelectorAll('input[type="checkbox"]');

const saved = JSON.parse(localStorage.getItem('checkedItems')) || [];
checkboxes.forEach(cb => {
    if (saved.includes(cb.value)) {
        cb.checked = true;
    }
});

checkboxes.forEach(cb => {
    cb.addEventListener('change', () => {
        const checked = Array.from(checkboxes)
            .filter(c => c.checked)
            .map(c => c.value);
        localStorage.setItem('checkedItems', JSON.stringify(checked));
    });
});





