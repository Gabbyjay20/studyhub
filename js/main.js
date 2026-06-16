const taskInput = document.querySelector("#taskInput");
const addTaskBtn = document.querySelector("#addTaskBtn");
const taskList = document.querySelector("#taskList");

const goalInput = document.querySelector("#goalInput");
const addGoalBtn = document.querySelector("#addGoalBtn");
const goalList = document.querySelector("#goalList");

const completedCount = document.querySelector("#completedCount");
const totalCount = document.querySelector("#totalCount");
const progressBar = document.querySelector("#progressBar");
const progressText = document.querySelector("#progressText");
const goalCount = document.querySelector("#goalCount");

let tasks = JSON.parse(localStorage.getItem("studyhubTasks")) || [];
let goals = JSON.parse(localStorage.getItem("studyhubGoals")) || [];

function saveData() {
  localStorage.setItem("studyhubTasks", JSON.stringify(tasks));
  localStorage.setItem("studyhubGoals", JSON.stringify(goals));
}

function updateProgress() {
  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  if (totalCount) totalCount.textContent = total;
  if (completedCount) completedCount.textContent = completed;
  if (progressBar) progressBar.value = percent;
  if (progressText) progressText.textContent = percent;
  if (goalCount) goalCount.textContent = goals.length;
}

function renderTasks() {
  if (!taskList) return;

  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed item-row" : "item-row";

    const span = document.createElement("span");
    span.textContent = task.text;

    const completeBtn = document.createElement("button");
    completeBtn.textContent = task.completed ? "Undo" : "Done";

    completeBtn.addEventListener("click", () => {
      tasks[index].completed = !tasks[index].completed;
      saveData();
      renderTasks();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", () => {
      tasks.splice(index, 1);
      saveData();
      renderTasks();
    });

    li.appendChild(span);
    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
  });

  updateProgress();
}

function renderGoals() {
  if (!goalList) return;

  goalList.innerHTML = "";

  goals.forEach((goal, index) => {
    const li = document.createElement("li");
    li.className = "item-row";

    const span = document.createElement("span");
    span.textContent = goal;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", () => {
      goals.splice(index, 1);
      saveData();
      renderGoals();
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);

    goalList.appendChild(li);
  });

  updateProgress();
}

if (addTaskBtn) {
  addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();

    if (!taskText) {
      alert("Please enter a task.");
      return;
    }

    tasks.push({
      text: taskText,
      completed: false
    });

    taskInput.value = "";

    saveData();
    renderTasks();
  });
}

if (addGoalBtn) {
  addGoalBtn.addEventListener("click", () => {
    const goalText = goalInput.value.trim();

    if (!goalText) {
      alert("Please enter a goal.");
      return;
    }

    goals.push(goalText);

    goalInput.value = "";

    saveData();
    renderGoals();
  });
}

renderTasks();
renderGoals();

// Pomodoro Timer

const timerDisplay = document.querySelector("#timerDisplay");
const startTimerBtn = document.querySelector("#startTimer");
const pauseTimerBtn = document.querySelector("#pauseTimer");
const resetTimerBtn = document.querySelector("#resetTimer");

if (timerDisplay) {
  let timeLeft = 25 * 60;
  let timerInterval = null;

  function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    timerDisplay.textContent =
      `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  function startTimer() {
    if (timerInterval) return;

    timerInterval = setInterval(() => {
      timeLeft--;

      updateTimerDisplay();

      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        timerInterval = null;
        alert("Pomodoro session complete!");
      }
    }, 1000);
  }

  function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
  }

  function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    timeLeft = 25 * 60;
    updateTimerDisplay();
  }

  startTimerBtn?.addEventListener("click", startTimer);
  pauseTimerBtn?.addEventListener("click", pauseTimer);
  resetTimerBtn?.addEventListener("click", resetTimer);

  updateTimerDisplay();
}

// Motivational Quotes

const quoteText = document.getElementById("quoteText");

if (quoteText) {
  fetch("https://zenquotes.io/api/random")
    .then(response => response.json())
    .then(data => {
      quoteText.textContent =
        `"${data[0].q}" — ${data[0].a}`;
    })
    .catch(() => {
      quoteText.textContent =
        "Success is the sum of small efforts repeated day after day.";
    });
}
