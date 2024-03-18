// Variables for html elements:
const taskForm = document.getElementById("task-form");
const confirmCloseDialog = document.getElementById("confirm-close-dialog");
const openTaskFormBtn = document.getElementById("open-task-form-btn");
const closeTaskFormBtn = document.getElementById("close-task-form-btn");
const addOrUpdateTaskBtn = document.getElementById("add-or-update-task-btn");
const cancelBtn = document.getElementById("cancel-btn");
const discardBtn = document.getElementById("discard-btn");
const tasksContainer = document.getElementById("tasks-container");
const titleInput = document.getElementById("title-input");
const dateInput = document.getElementById("date-input");
const descriptionInput = document.getElementById("description-input");

// Array to store the tasks along with associated data:
const taskData = JSON.parse(localStorage.getItem("data")) || [];

// Object to track state of the tasks when editing and discarding:
let currentTask = {};

// add inputfields to taskData:
const addOrUpdateTask = () => {
  addOrUpdateTaskBtn.innerText = "Add Task";
  // Check if the task already exists:
  const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id);
  // Retrieve inputfield values & store them in a taskForm object:
  const taskObj = {
    // create a unique id:
    id: `${titleInput.value.toLowerCase().split(" ").join("-")}-${Date.now()}`,
    // Asign inputvalues to other properties:
    title: titleInput.value,
    date: dateInput.value,
    description: descriptionInput.value,
  };
  // Check if the task to add is a new task:
  if (dataArrIndex === -1) {
    taskData.unshift(taskObj);
  } else {
    taskData[dataArrIndex] = taskObj;
  }
  localStorage.setItem("data", JSON.stringify(taskData));
  updateTaskContainer();
  reset();
};

const updateTaskContainer = () => {
  tasksContainer.innerHTML = "";
  // Display the contents of taskData in UI:
  taskData.forEach(({ id, title, date, description }) => {
    tasksContainer.innerHTML += `
      <div class="task" id="${id}">
        <p><strong>Title:</strong> ${title}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Description:</strong> ${description}</p>
        <button type="button" class="btn" onclick="editTask(this)">Edit</button>
        <button type="button" class="btn" onclick="deleteTask(this)">Delete</button>
      </div>
    `;
  });
};

// Delete Task function:
const deleteTask = (buttonEl) => {
  const dataArrIndex = taskData.findIndex(
    (item) => item.id === buttonEl.parentElement.id
  );
  buttonEl.parentElement.remove();
  taskData.splice(dataArrIndex, 1);
  localStorage.setItem("data", JSON.stringify(taskData));
};

// Edit Task function:
const editTask = (buttonEl) => {
  const dataArrIndex = taskData.findIndex(
    (item) => item.id === buttonEl.parentElement.id
  );
  currentTask = taskData[dataArrIndex];
  titleInput.value = currentTask.title;
  dateInput.value = currentTask.date;
  descriptionInput.value = currentTask.description;
  addOrUpdateTaskBtn.innerText = "Update Task";
  taskForm.classList.toggle("hidden");
};

// Clear input fields function:
const reset = () => {
  titleInput.value = "";
  dateInput.value = "";
  descriptionInput.value = "";
  taskForm.classList.toggle("hidden");
  currentTask = {};
};

if (taskData.length) {
  updateTaskContainer();
}

// Button event listeners:
openTaskFormBtn.addEventListener("click", () =>
  taskForm.classList.toggle("hidden")
);

closeTaskFormBtn.addEventListener("click", () => {
  const formInputsContainValues =
    titleInput.value || dateInput.value || descriptionInput.value;
  const formInputValuesUpdated =
    titleInput.value !== currentTask.title ||
    dateInput.value !== currentTask.date ||
    descriptionInput.value !== currentTask.description;
  if (formInputsContainValues && formInputValuesUpdated) {
    confirmCloseDialog.showModal();
  } else {
    reset();
  }
});

cancelBtn.addEventListener("click", () => confirmCloseDialog.close());

discardBtn.addEventListener("click", () => {
  confirmCloseDialog.close();
  reset();
});

// Task form event listener:
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addOrUpdateTask();
});
/*
const myTaskArr = [
  { task: "Walk the Dog", date: "22-04-2022" },
  { task: "Read some books", date: "02-11-2023" },
  { task: "Watch football", date: "10-08-2021" },
];

localStorage.setItem("data", JSON.stringify(myTaskArr));
localStorage.clear();

const getTaskArr = localStorage.getItem("data");
console.log(getTaskArr);

const getTaskArrObj = JSON.parse(localStorage.getItem("data"));
console.log(getTaskArrObj);
*/
