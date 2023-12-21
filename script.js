const form = document.getElementById("form");
const input = document.getElementById("input");
const button = document.querySelector(".submit");
const tasks = document.querySelector(".tasks");
const empty = [
  document.querySelector(".empty"),
  document.querySelector(".empty_img"),
];
const error = document.getElementById("error");
let tasksList = [];
if (localStorage.getItem("data")) {
  tasksList = JSON.parse(localStorage.getItem("data"));
}
tasksList.forEach((i) => renderTaks(i));
function renderTaks(task) {
  const cssClass = task.done ? "task-title done" : "task-title";
  const taskHTML = `<li class='task_item' id=${task.id}>
  <span class='${cssClass}'>${task.text}</span>
  <div class="task_imgs">
  <button>
    <img src="/imgs/2.png" class="task_img" data-action='done'/>
  </button>
  <button>
    <img src="/imgs/1.png" class="task_img" data-action='delete'/>
  </button>
  </div>
</li>`;
  tasks.insertAdjacentHTML("beforeend", taskHTML);
}
function addTask(e) {
  e.preventDefault();
  const taskText = input.value;
  const newTask = {
    id: Date.now(),
    text: taskText,
    done: false,
  };
  if (taskText != "") {
    tasksList.push(newTask);
    renderTaks(newTask);

    input.value = "";
  } else {
    error.innerHTML = "Введите задачу";
    error.classList.add("red");
    setTimeout(cancelError, 2000);
    function cancelError() {
      error.innerHTML = "Какую задачу желаете добавить?";
      error.classList.remove("red");
    }
  }
  checkEmptyList();
  saveData();
}
form.addEventListener("submit", addTask);
function deleteTask(e) {
  if (e.target.dataset.action !== "delete") return;
  const parentNode = e.target.closest(".task_item");
  const id = Number(parentNode.id);
  tasksList = tasksList.filter((task) => task.id !== id);
  parentNode.remove();
  checkEmptyList();
  saveData();
}
tasks.addEventListener("click", deleteTask);
function doneTask(e) {
  if (e.target.dataset.action !== "done") return;
  e.target.closest(".task_item").querySelector("span").classList.toggle("done");
  const parentNode = e.target.closest(".task_item");
  const id = Number(parentNode.id);
  const currentTask = tasksList.find((task) => task.id === id);
  currentTask.done = !currentTask.done;
  saveData();
}
tasks.addEventListener("click", doneTask);
function checkEmptyList() {
  if (tasksList.length === 0) {
    empty.map((e) => {
      e.classList.remove("hidden");
    });
  } else {
    empty.map((e) => {
      e.classList.add("hidden");
    });
  }
  saveData();
}
function saveData() {
  localStorage.setItem("data", JSON.stringify(tasksList));
}
