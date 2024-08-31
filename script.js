// Required elements
const inputBox = document.querySelector(".inputField input");
const addButton = document.querySelector(".inputField button");
const todolist = document.querySelector(".todolist");
const clear = document.querySelector(".clear");

inputBox.onkeyup = () => {
    let userData = inputBox.value; // Getting user entered value
    if (userData.trim() != 0) { // If userData not empty
        addButton.classList.add("active"); // Activate the add button
    } else {
        addButton.classList.remove("active"); // Deactivate the add button 
    }
};

inputBox.addEventListener("keyup", (event) => {
    if (event.keyCode === 13 && inputBox.value.trim() !== "") {
        addButton.click();
        inputBox.value = ""; 
    }
});

let listArr = [];

addButton.onclick = () => {
    let userData = inputBox.value;
    let getLocalStorage = localStorage.getItem("New ToDo");
    if (getLocalStorage == null) {
        listArr = []; // Creating a blank array
    } else {
        listArr = JSON.parse(getLocalStorage); // Transforming JSON string into a JS object
    }
    if (userData.trim() !== "") { // Add to list if input value is not empty
        listArr.push({ text: userData, completed: false }); // ***Storing task with its completed status***
        localStorage.setItem("New ToDo", JSON.stringify(listArr)); // Transforming JS object into a JSON string
        showTasks();
        inputBox.value = ""; // Clear input field
    }
};

showTasks();

clear.onclick = () => {
    listArr = []; // More efficient, otherwise entire localStorage gets deleted
    localStorage.setItem("New ToDo", JSON.stringify(listArr));
    showTasks();
};

function showTasks() {
    let getLocalStorage = localStorage.getItem("New ToDo");
    if (getLocalStorage == null) {
        listArr = []; // Creating a blank array
    } else {
        listArr = JSON.parse(getLocalStorage); // Transforming JSON string into a JS object
    }
    let newLiTag = '';
    listArr.forEach((element, index) => {
        newLiTag += `<li class="${element.completed ? 'completed' : ''}" onclick="toggleCompleted(${index})">
            ${element.text} <span class="remove" onclick="deleteTask(${index}); event.stopPropagation();">×</span>
        </li>`; // ***Added class and onclick event to toggle completed status***
    });
    todolist.innerHTML = newLiTag; // Adding new li tag inside ul tag
    updateTaskCount();
}

// toggle task completion
function toggleCompleted(index) {
    listArr[index].completed = !listArr[index].completed; // Toggle the completed status
    localStorage.setItem("New ToDo", JSON.stringify(listArr)); // Update localStorage
    showTasks(); // Refresh the list
}

function deleteTask(index) {
    listArr.splice(index, 1); // Delete the task
    localStorage.setItem("New ToDo", JSON.stringify(listArr)); // Update localStorage
    showTasks(); // Refresh the list
}

function updateTaskCount() {
    const countElement = document.querySelector(".task-count");
    const taskCount = listArr.length;
    countElement.textContent = `task${taskCount === 1 ? '' : 's'}: ${taskCount}`;
}

updateTaskCount(); // When the page loads, show the initial task count
