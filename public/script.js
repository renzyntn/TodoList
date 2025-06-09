const inputEl = document.querySelector("#input-el");
const addBtnEl = document.querySelector("#addbtn-el");
const viewBtnEl = document.querySelector("#viewbtn-el");
const deleteBtnEl = document.querySelector("#deletebtn-el");
const ulEl = document.querySelector("#list-el");

let taskData = [];
let taskCheckBox = ["images/checkbox.svg", "images/checkbox-fill.svg"];

let getDatafromStorage = JSON.parse(localStorage.getItem("listKey"));

function renderList() {
    let newList = "";
    for (let i = 0; i < taskData.length; i++) {
        newList += `
        <li class="flex items-center gap-[10px]" data-index="${i}">
            <img src="${taskCheckBox[0]}" class="w-[20px] h-[20px]" data-status="unchecked">
            <span>${taskData[i]}</span>
        </li>
        `
    }
    ulEl.innerHTML = newList;

    const listItems = ulEl.querySelectorAll("li");
    listItems.forEach(item => {
        item.addEventListener("click", toggleTaskStatus);
    })
}

function toggleTaskStatus(event) {
    const listItem = event.currentTarget;
    const checkboxImage = listItem.querySelector("img");
    const taskText = listItem.querySelector("span");

    if (checkboxImage.getAttribute("data-status") === "unchecked") {
        checkboxImage.setAttribute("src", taskCheckBox[1]);
        checkboxImage.setAttribute("data-status", "checked");

        taskText.classList.add("line-through");
    } else {
        checkboxImage.setAttribute("src", taskCheckBox[0]);
        checkboxImage.setAttribute("data-status", "unchecked");

        taskText.classList.remove("line-through");
    }
}

addBtnEl.addEventListener("click", function() {
    if (inputEl.value != "") {
        taskData.push(inputEl.value);
        localStorage.setItem("listKey", JSON.stringify(taskData));
        inputEl.value = "";
        renderList();
    } else {
        inputEl.setAttribute("required", "true");
        inputEl.reportValidity();
    }
})

viewBtnEl.addEventListener("click", function() {
        if (getDatafromStorage) {
        taskData = getDatafromStorage;
        renderList();
    }
})

deleteBtnEl.addEventListener("click", function() {
    taskData.splice(0, taskData.length);
    localStorage.clear();
    ulEl.innerHTML = "";
    renderList();
})