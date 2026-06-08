const taskInput = document.querySelector("#taskInput");
const addTaskBtn = document.querySelector("#addTaskBtn");
const taskList = document.querySelector("#taskList");

if (addTaskBtn) {
  addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
      alert("Please enter a task.");
      return;
    }

    const li = document.createElement("li");
    li.textContent = taskText;

    taskList.appendChild(li);
    taskInput.value = "";
  });
}