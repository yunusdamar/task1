const addTaskForm = document.querySelector("#addTaskForm");
const input = document.querySelector("#txtTaskName");
const btnAddNewTask = document.querySelector("#btnAddNewTask");
const btnDeleteAll = document.querySelector("#btnDeleteAll");
const taskList = document.querySelector("#task-list");
let todos;

loadItems();
eventListeners();



function eventListeners() {
    addTaskForm.addEventListener("submit", addNewItem);
    taskList.addEventListener("click", deleteItem);
    btnDeleteAll.addEventListener("click", deleteAllItems);
}

//localdeki verileri yüklemek
function loadItems() {
    todos = getItemsFromLS();
    todos.forEach(function (item) {
        createItem(item);
    })
}

//localden verileri çekmek
function getItemsFromLS() {
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}


function setItemToLS(newTodo) {
    todos = getItemsFromLS();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

//localden verileri silmek
function deleteTodoFromStorage(deletetodo) {
    let todos = getItemsFromLS();
    todos.forEach(function (todo, index) {
        if (todo === deletetodo) {
            todos.splice(index, 1)
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}

//todo item eklemek
function createItem(newTodo) {
    const li = document.createElement("li");
    li.className = "list-group-item list-group-item-secondary";
    li.appendChild(document.createTextNode(newTodo));

    const a = document.createElement("a");
    a.classList = "delete-item float-right";
    a.setAttribute("href", "#");
    a.innerHTML = '<i class="fas fa-times"></i>';

    li.appendChild(a);
    taskList.appendChild(li);
}

//locale ve görsele yeni todo eklemek
function addNewItem(e) {
    if (input.value === '') {
        alert("Add a task name!");
        console.log("submit");

    }
    createItem(input.value);
    setItemToLS(input.value);

    input.value = "";

    e.preventDefault();
}


//Single remove
function deleteItem(e) {

    if (e.target.className === "fas fa-times") {
        if (confirm("Silmek istediğinize emin misiniz?")) {
            e.target.parentElement.parentElement.remove();
            deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);

        }
    }

}

//Delete All
function deleteAllItems(e) {
    if (confirm("Tüm verileri silmek istediğinize emin misiniz?")) {
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }
        localStorage.clear();
    }

}