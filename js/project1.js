let tasksList = [];
let tasks = localStorage.getItem("tasksList");

//changing pattern of date
Date.prototype.getNewDate = function (taskDate) {
    let [month, day, year] = ((new Date(taskDate)).toLocaleDateString()).split("/");
    return `${day}/${month}/${year}`;
}

//adding new elements and array
const myAction = () =>{
    const dateId = new Date();
    const data = {
        id: dateId.getMilliseconds(),
        taskName: document.getElementById("task").value,
        taskDate: dateId.getNewDate(document.getElementById("date").value),
        taskTime: document.getElementById("time").value,
    }
    tasksList.push(data);
    localStorage.setItem("tasksList", JSON.stringify(tasksList));
    buildTask(data);
    document.getElementById("myForm").reset();
};

//create a new note with description of task
const buildTask = (item) =>{
    const tasksContainer = document.querySelector(".tasks-list-container");
    const taskContainer = document.createElement("div");
    taskContainer.classList.add("task-res");
    
//remove the note from the window
    const closeTask = document.createElement("button");
    closeTask.setAttribute("closeId",item.id);
    closeTask.innerHTML = "<i class='btn-close'></i>"
    closeTask.classList.add("closeTask");
    closeTask.addEventListener("click", () =>{
        tasksContainer.removeChild(taskContainer);

//remove the note from the local storage and the array of tasks
            tasks = localStorage.getItem("tasksList");
            const itemId = parseInt(closeTask.getAttribute("closeId"));
            tasks = JSON.parse(tasks);
            let removeIndex = tasks.map(item => item.id).indexOf(itemId);
            tasks.splice(removeIndex, 1);
            tasksList = tasks;
            localStorage.setItem("tasksList", JSON.stringify(tasks));
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
    tasksContainer.appendChild(taskContainer);
};

//getting the tasks from the local storage
if (tasks) {
        tasksList = JSON.parse(tasks);
        tasksList.map((item)=>{
            buildTask(item);
        });
};