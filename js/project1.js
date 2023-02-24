//changing pattern of date
const getNewDate = (taskDate) => {
  let [month, day, year] = ((new Date(taskDate)).toLocaleDateString()).split("/");
  return `${day}/${month}/${year}`;
};

//adding new elements and array
const myAction = (taskList, taskName, taskDate, taskTime) => {
  const dateId = new Date();
  const data = {
    id: dateId.getMilliseconds(),
    taskName: taskName,
    taskDate: getNewDate(taskDate),
    taskTime: taskTime,
  }
  const newTaskList = [...taskList, data];
  localStorage.setItem("tasksList", JSON.stringify(newTaskList));
  return newTaskList;
};

//create a new note with description of task
const buildTask = (item, removeTask) => {
  const taskContainer = document.createElement("div");
  taskContainer.classList.add("task-res");

  //remove the note from the window
  const closeTask = document.createElement("button");
  closeTask.setAttribute("closeId", item.id);
  closeTask.innerHTML = "<i class='btn-close'></i>"
  closeTask.classList.add("closeTask");
  closeTask.addEventListener("click", () => {
    removeTask(item.id);
    taskContainer.remove();
  });

  //creating the elements using dom functions
  const taskText = document.createElement("div");
  taskText.classList.add("task-text");
  taskText.innerHTML = item.taskName;

  const dateText = document.createElement("div");
  dateText.classList.add("date-text");
  dateText.innerHTML = item.taskDate;

  const timeText = document.createElement("div");
  timeText.classList.add("time-text");
  timeText.innerHTML = item.taskTime;

  taskContainer.appendChild(closeTask);
  taskContainer.appendChild(taskText);
  taskContainer.appendChild(dateText);
  taskContainer.appendChild(timeText);
  return taskContainer;
};

//getting the tasks from the local storage
const getTasks = () => {
  const tasks = localStorage.getItem("tasksList");
  if (tasks) {
    return JSON.parse(tasks);
  } else {
    return [];
  }
};

//render tasks on the page
const renderTasks = (tasksList, removeTask) => {
  const tasksContainer = document.querySelector(".tasks-list-container");
  tasksContainer.innerHTML = "";
  tasksList.forEach((item) => {
    const taskContainer = buildTask(item, removeTask);
    tasksContainer.appendChild(taskContainer);
  });
};

//initialize the app
const init = () => {
  let tasksList = getTasks();

  const removeTask = (id) => {
    tasksList = tasksList.filter((item) => item.id !== id);
    localStorage.setItem("tasksList", JSON.stringify(tasksList));
  };

  const form = document.getElementById("myForm");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const taskName = document.getElementById("task").value;
    const taskDate = document.getElementById("date").value;
    const taskTime = document.getElementById("time").value;
    tasksList = myAction(tasksList, taskName, taskDate, taskTime);
    renderTasks(tasksList, removeTask);
    form.reset();
  });

  renderTasks(tasksList, removeTask);
};

init();
