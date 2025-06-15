import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-database.js";

const firebaseConfig = {
    databaseURL: "https://todolist-df1cd-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const refInDB = ref(database, "todoList");

onValue(refInDB, function(snapshot) {
    const snapshotExist = snapshot.exists();

    if (snapshotExist) {
        const snapshotValues = snapshot.val();
        const taskLists = Object.values(snapshotValues);
        renderList(taskLists);
    }
})

const inputEl = document.querySelector("#input-el");
const addBtnEl = document.querySelector("#addbtn-el");
const viewBtnEl = document.querySelector("#viewbtn-el");
const deleteBtnEl = document.querySelector("#deletebtn-el");
const ulEl = document.querySelector("#list-el");

let taskCheckBox = ["images/checkbox.svg", "images/checkbox-fill.svg"];

function renderList(taskData) {
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
        push(refInDB, inputEl.value);
        inputEl.value = "";
        renderList();
    } else {
        inputEl.setAttribute("required", "true");
        inputEl.reportValidity();
    }
})

viewBtnEl.addEventListener("click", function() {
    
})

deleteBtnEl.addEventListener("click", function() {
    remove(refInDB);
    ulEl.innerHTML = "";
})