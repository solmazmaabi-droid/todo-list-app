const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(addTaskToDOM);
}

function addTaskToDOM(taskText) {
  const li = document.createElement("li");
  li.textContent = taskText;
  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasks();
  });
  const delBtn = document.createElement("button");
  delBtn.textContent = "❌";
  delBtn.addEventListener("click", () => {
    li.remove();
    saveTasks();
  });
  li.appendChild(delBtn);
  taskList.appendChild(li);
}

function saveTasks() {
  const tasks = Array.from(taskList.children).map(li => li.textContent.replace("❌", "").trim());
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

addBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText) {
    addTaskToDOM(taskText);
    saveTasks();
    taskInput.value = "";
  }
});

loadTasks();
