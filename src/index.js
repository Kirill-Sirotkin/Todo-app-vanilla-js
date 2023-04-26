const taskList = document.getElementById("task-list");
const taskAddForm = document.getElementById("task-add-form");
const taskContainer = document.getElementById("task-container");

const cancelButton = document.getElementById("cancel-button");
cancelButton.addEventListener("click", (event) => {
  event.preventDefault();
  cancelAddTask();
  console.log("CANCEL");
});

const confirmButton = document.getElementById("confirm-button");
confirmButton.addEventListener("click", (event) => {
  event.preventDefault();

  const newTaskTitle = document.getElementById("title").value;
  const newTaskDeadline = document.getElementById("deadline").value;
  const newTaskStatus = document.getElementById("status").value;

  tasks.push({
    id: 0,
    title: newTaskTitle,
    deadline: newTaskDeadline,
    status: newTaskStatus,
  });

  cancelAddTask();
  refreshTaskList();

  console.log("CONFIRM");
});

const tasks = [];

const refreshTaskList = () => {
  console.log("Refreshing task list...");
  taskContainer.innerHTML = "";

  if (tasks.length === 0) {
    taskContainer.classList.add("hidden");
    console.log("No items in task list.");
    return;
  }
  taskContainer.classList.remove("hidden");

  tasks.forEach((taskElement) => {
    const taskObject = document.createElement("div");
    taskObject.classList.add("task");

    const taskInfo = document.createElement("div");
    taskInfo.classList.add("task__info");

    const taskTitle = document.createElement("h1");
    taskTitle.innerHTML = taskElement.title;

    const taskStatus = document.createElement("h2");
    taskStatus.innerHTML = taskElement.status;

    const taskDeadline = document.createElement("h3");
    taskDeadline.innerHTML = "Deadline: " + taskElement.deadline.toString();

    const taskButtons = document.createElement("div");
    taskButtons.classList.add("task__buttons");

    const taskButtonsEdit = document.createElement("button");
    taskButtonsEdit.classList.add("task__buttons--edit");
    taskButtonsEdit.innerHTML = "✏️";

    const taskButtonsDelete = document.createElement("button");
    taskButtonsDelete.classList.add("task__buttons--delete");
    taskButtonsDelete.innerHTML = "❌";

    taskContainer.appendChild(taskObject);

    taskObject.appendChild(taskInfo);
    taskInfo.appendChild(taskTitle);
    taskInfo.appendChild(taskStatus);
    taskInfo.appendChild(taskDeadline);

    taskObject.appendChild(taskButtons);
    taskButtons.appendChild(taskButtonsEdit);
    taskButtons.appendChild(taskButtonsDelete);
  });
};

const addTaskButton = () => {
  toggleElement(taskList, false);
  toggleElement(taskAddForm, true);
};

const cancelAddTask = () => {
  toggleElement(taskAddForm, false);
  toggleElement(taskList, true);
};

const toggleElement = (element, toggleBool) => {
  if (!toggleBool) {
    element.classList.add("hidden");
    return;
  }

  element.classList.remove("hidden");
};

refreshTaskList();
