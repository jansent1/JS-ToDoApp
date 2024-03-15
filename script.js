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
const taskData = [];

// Object to track state of the tasks when editing and discarding:
let currentTask = {};

// Button event listeners:
openTaskFormBtn.addEventListener("click", () => {
  taskForm.classList.toggle("hidden");
});

closeTaskFormBtn.addEventListener("click", () => {
  confirmCloseDialog.showModal();
});

cancelBtn.addEventListener("click", () => {
  confirmCloseDialog.close();
});

discardBtn.addEventListener("click", () => {
  confirmCloseDialog.close();
  taskForm.classList.toggle("hidden");
});

// Task form event listener:
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // Check if the task already exists:
  const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id);
  // Retrieve inputfield values & store them in a taskForm object:
  const taskObj = {
    // create a unique id:
    id: `${titleInput.value.toLowerCase().split(" ").join("-")}-${Date.now()}`,
    title: titleInput.value,
    date: dateInput.value,
    description: descriptionInput.value,
  };
  // Check if the task to add is a new task:
  if (dataArrIndex === -1) {
    taskData.unshift(taskObj);
    console.log(taskData);
  }
  // Display the contents of taskData in UI:
  taskData.forEach(({ id, title, date, description }) => {
    tasksContainer.innerHTML = `
      <div class="task" id="${id}">
      <p><strong>Title:</strong>${title}</p>
      <p><strong>Date:</strong>${date}</p>
      <p><strong>Description:</strong>${description}</p>
      <button type="button" class="btn">Edit</button>
      <button type="button" class="btn">Delete</button>
      </div>
    `;
  });
  // Close the form modal:
  taskForm.classList.toggle("hidden");
});
