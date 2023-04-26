const taskContainer = document.getElementById("task-container");

const tasks = [
  {
    id: 0,
    title: "Task 1",
    status: "Not started",
  },
  {
    id: 1,
    title: "Task 2",
    status: "In progress",
  },
  {
    id: 2,
    title: "Task 3",
    status: "Done",
  },
];

const refreshTaskList = () => {
  console.log("Refreshing task list...");
  taskContainer.innerHTML = "";

  if (tasks.length === 0) {
    taskContainer.classList.add("hidden");
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

    taskObject.appendChild(taskButtons);
    taskButtons.appendChild(taskButtonsEdit);
    taskButtons.appendChild(taskButtonsDelete);
  });
};

refreshTaskList();
