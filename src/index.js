const taskList = document.getElementById("task-list");
const taskAddForm = document.getElementById("task-add-form");
const taskEditForm = document.getElementById("task-edit-form");
const taskContainer = document.getElementById("task-container");
const taskListFooter = document.getElementById("task-list-footer");
const taskCountMessage = document.getElementById("task-count-message");

const cancelButton = document.getElementById("cancel-button");
cancelButton.addEventListener("click", (event) => {
  event.preventDefault();
  cancelAddTask();
  console.log("CANCEL ADD");
});

const confirmButton = document.getElementById("confirm-button");
confirmButton.addEventListener("click", (event) => {
  event.preventDefault();
  addTaskToList();
  console.log("CONFIRM ADD");
});

const cancelButtonEdit = document.getElementById("cancel-button-edit");
cancelButtonEdit.addEventListener("click", (event) => {
  event.preventDefault();
  cancelEditTask();
  console.log("CANCEL EDIT");
});

const confirmButtonEdit = document.getElementById("confirm-button-edit");
confirmButtonEdit.addEventListener("click", (event) => {
  event.preventDefault();
  editTaskInList();
  console.log("CONFIRM EDIT");
});

const tasks = [];

const addTaskToList = () => {
  const newTaskTitle = document.getElementById("title").value;
  const newTaskDeadline = document.getElementById("deadline").value;
  const newTaskStatus = document.getElementById("status").value;

  let previousId = -1;
  if (tasks.length > 0) {
    previousId = tasks[tasks.length - 1].id;
  }

  tasks.push({
    id: previousId + 1,
    title: newTaskTitle,
    deadline: newTaskDeadline,
    status: newTaskStatus,
  });

  cancelAddTask();
  refreshTaskList();
  refreshAddTaskForm();
};

const editTaskInList = () => {
  const editTaskTitle = document.getElementById("title-edit").value;
  const editTaskDeadline = document.getElementById("deadline-edit").value;
  const editTaskStatus = document.getElementById("status-edit").value;
  const editTaskId = parseInt(document.getElementById("id-edit").innerHTML);

  const index = tasks.findIndex((element) => element.id === editTaskId);
  tasks[index].title = editTaskTitle;
  tasks[index].deadline = editTaskDeadline;
  tasks[index].status = editTaskStatus;

  cancelEditTask();
  refreshTaskList();
};

const refreshTaskList = () => {
  console.log("Refreshing task list...");
  taskContainer.innerHTML = "";

  if (tasks.length === 0) {
    taskContainer.classList.add("hidden");
    taskListFooter.classList.add("hidden");
    console.log("No items in task list.");
    return;
  }
  taskContainer.classList.remove("hidden");
  taskListFooter.classList.remove("hidden");

  if (tasks.length === 1) {
    taskCountMessage.innerHTML = "You have 1 task";
  } else {
    taskCountMessage.innerHTML =
      "You have " + tasks.length.toString() + " tasks";
  }

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
    taskButtonsEdit.addEventListener("click", () =>
      editTaskButton(taskElement.id)
    );

    const taskButtonsDelete = document.createElement("button");
    taskButtonsDelete.classList.add("task__buttons--delete");
    taskButtonsDelete.innerHTML = "❌";
    taskButtonsDelete.addEventListener("click", () =>
      deleteTaskButton(taskElement.id)
    );

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

const deleteTaskButton = (id) => {
  console.log("Deleting task " + id.toString());

  const index = tasks.findIndex((element) => element.id === id);
  tasks.splice(index, 1);
  refreshTaskList();
};

const refreshAddTaskForm = () => {
  document.getElementById("title").value = "";
  document.getElementById("deadline").value = "";
  document.getElementById("status").value = "In progress";
};

const addTaskButton = () => {
  toggleElement(taskList, false);
  toggleElement(taskAddForm, true);
};

const clearTasksButton = () => {
  tasks.splice(0, tasks.length);
  refreshTaskList();
};

const cancelAddTask = () => {
  toggleElement(taskAddForm, false);
  toggleElement(taskList, true);
};

const editTaskButton = (id) => {
  const index = tasks.findIndex((element) => element.id === id);

  document.getElementById("title-edit").value = tasks[index].title;
  document.getElementById("deadline-edit").value = tasks[index].deadline;
  document.getElementById("status-edit").value = tasks[index].status;
  document.getElementById("id-edit").innerHTML = id.toString();

  toggleElement(taskList, false);
  toggleElement(taskEditForm, true);
};

const cancelEditTask = () => {
  toggleElement(taskEditForm, false);
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
refreshAddTaskForm();
