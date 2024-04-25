// required elements
const inputBox = document.querySelector(".inputField input");
const addButton = document.querySelector(".inputField button");
const todolist  = document.querySelector(".todolist");
const clear = document.querySelector(".clear")



inputBox.onkeyup = ()=>{
    let userData = inputBox.value; //getting user entered value
    if(userData.trim() != 0){ // if userData not spaces
        addButton.classList.add("active"); //active the add button
    }else{
        addButton.classList.remove("active"); // unactive the add button 
    }
}

inputBox.addEventListener("keyup", (event)=> {
    if(event.keyCode === 13 && inputBox.value.trim() !== ""){
        //event.preventDefault();
        addButton.click();
        inputBox.value = ""; 
    }
})

let listArr;
// if user click on "+" button
addButton.onclick = ()=>{
    let userData = inputBox.value;
    let getLocalStorage = localStorage.getItem("New ToDo");
    console.log(getLocalStorage) //logs array
    console.log(JSON.parse(getLocalStorage)) // logs array as json
    if(getLocalStorage == null){
        listArr = []; // creating blank array
    }else{
        listArr = JSON.parse(getLocalStorage); // transforming json string into a js object
    }
    if(userData.trim() !== ""){ // add to list if input value not emptfy 
        listArr.push(userData); // adding user Data
        localStorage.setItem("New ToDo", JSON.stringify(listArr)); //transforming js object into a json string
        showTasks();
        inputBox.value = null; // add this line to clear input field
    }
}
showTasks();



/*clear.onclick = ()=>{
    //listArr = [];
    localStorage.clear();
}*/
clear.onclick = () => {
    listArr = []; // more efficient otherwise entire localstorage get deleted
    localStorage.setItem("New ToDo", JSON.stringify(listArr));
    showTasks();
}

function showTasks(){
    let getLocalStorage = localStorage.getItem("New ToDo");
    if(getLocalStorage == null){
        listArr = []; // creating blank array
    }else{
        listArr = JSON.parse(getLocalStorage); // transforming json string into a js object
    }
    let newLiTag = '';
    // listArr.array.forEach(element => {
    //     newLiTag = `<li>  ${element}  <span><i class ="fas fa-trash"></i></span></li>`;
    //     });
    
    // listArr.foreach((element, index) => {
    //     newLiTag = `<li>  ${element}  <span><i class ="fas fa-trash"></i></span></li>`;
    // });

    listArr.forEach((element, index) => {
        newLiTag += `<li> ${element} <span><i class = "fas fa-trash"></i></span></li>`;
    });
    
    todolist.innerHTML = newLiTag; //adding new li tag inside ul tag
    updateTaskCount();
}

function updateTaskCount(){
    const countElement = document.querySelector(".task-count");
    const taskCount = listArr.length;
    if(taskCount === 1 || taskCount === 0 ){
        countElement.textContent = `task: ${taskCount}`;
        return; // exit the
    }
    countElement.textContent = `tasks: ${taskCount}`
}

updateTaskCount(); //when the page loads to show the initial task count