const inputEl = document.querySelector("#input-el");
const addBtnEl = document.querySelector("#addbtn-el");
const viewBtnEl = document.querySelector("#viewbtn-el");
const deleteBtnEl = document.querySelector("#deletebtn-el");
const ulEl = document.querySelector("#list-el");

let taskData = [];
let taskCheckBox = ["images/checkbox.png", "images/checkbox-fill.png"];

let getDatafromStorage = JSON.parse(localStorage.getItem("listKey"));

function renderList() {
    let newList = "";
    for (let i = 0; i < taskData.length; i++) {
        newList += `
        <li class="flex items-center gap-[10px]">
            <img src="${taskCheckBox[0]}" class="w-[20px] h-[20px]">
            ${taskData[i]}
        </li>
        `
    }
    ulEl.innerHTML = newList;
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