// 1. SELECT IMPORTANT ELEMENTS
const addButton = document.getElementById("add_button");
const input = document.querySelector("#input_box input");
const taskList = document.getElementById("tasks");


// 2. DELETE TASK (EVENT DELEGATION)
taskList.addEventListener("click", function (e) {
  if (e.target.classList.contains("Delete")) {
    e.target.parentElement.remove();
  }
});


// 3. ADD NEW TASK
input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addButton.click();
  }
});

addButton.addEventListener("click", function () {
  const taskText = input.value.trim();

  // prevent empty tasks
  if (taskText === "") return;

  // create new li
  const li = document.createElement("li");
  li.classList.add("task");

const id = "task_" + Date.now();

li.innerHTML = `
  <span class="task-left">
    <input type="checkbox" id="${id}">
    <label for="${id}">${taskText}</label>
  </span>
  <img src="del.png" class="Delete">
`;
  // add to list
  taskList.appendChild(li);

  // clear input
  input.value = "";
});