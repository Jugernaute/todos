
function addFilterFooter(selectedEl) {
    let el1 = document.getElementsByClassName("filters");
    let el2 = document.getElementsByClassName("filter-clear");

    if (el1.length!==0 && el2.length!==0){
        document.querySelector(".filters").remove()
        document.querySelector(".filter-clear").remove()
    }

    let l = getCountNotExecuteTasks();
    let ul = "<ul class='filters view2'>" +
        "<li><span id='task_count'>"+l+"</span><span>\&nbsp;item left</span><span class='remove'></span></li>" +
        "<div class='filter all'>All</div>" +
        "<div class='filter active'>Active</div>" +
        "<div class='filter completed'>Completed</div>" +
        "</ul>";
    let clearAll = "<div class='filter-clear'><span id='clear'>Clear</span></div>";
    $ul.append(ul);
    $ul.append(clearAll);
    noneDisplayClear_ALL();
    addSelectedFilter(selectedEl)
}

function addSelectedFilter(selectedClass){
    if (selectedClass!==null){
        let classNames = selectedClass.className;
        let name = document.getElementsByClassName(classNames);
        name[0].setAttribute("id","selected");
        fillContent(selectedClass.innerText);
    } else{
        let el = document.getElementsByClassName("all");
        el[0].setAttribute("id","selected");
    }
}

function switchFilters(){
    let el = document.getElementsByClassName("filter");
    for (let i = 0; i < el.length; i++) {
        let className = el[i].getAttribute("id");
        if (className==="selected") {
            el[i].removeAttribute("id");
            return;
        }
    }
}

function fillContent(filter){
    let el = document.getElementsByClassName("toogle");
    switch (filter) {
        case "All":
            for (let i = 0; i < el.length; i++) {
                let e = el[i];
                let parent = e.parentElement;
                parent.classList.remove("hidden");
            }
            break;
        case "Active":
            filling(el,true);
            break;
        case "Completed":
            filling(el,false);
            break;
    }
}

function filling(elements, bollean){
    for (let i = 0; i < elements.length; i++) {
        let e = elements[i];
        let b = e.checked;
        let parent = e.parentElement;
        if (b===bollean){
            parent.classList.add("hidden")
        } else parent.classList.remove("hidden");
    }
}

function checkbox_check_uncheck_all(listCheckbox, boolean){
    if (boolean===undefined) {
        boolean = true;
        displayClear_ALL();
        lineThrough(listCheckbox,true);
    } else {
        noneDisplayClear_ALL();
        lineThrough(listCheckbox, false);
    }

    for (let i = 0; i < listCheckbox.length; i++) {
        let checkbox = listCheckbox[i];
        checkbox.checked=boolean;
    }
}

function define_clearAll(howManyCheckedFalse) {
    let countAllCheckbox = document.getElementsByClassName("toogle").length;
    let number = countAllCheckbox-howManyCheckedFalse;
    if (number!==0){
        displayClear_ALL();
    } else {
        noneDisplayClear_ALL();
    }
}

function displayClear_ALL() {
    let el = $("#clear");
    el.removeClass("hidden");
}

function noneDisplayClear_ALL() {
    let el = $("#clear");
    el.addClass("hidden");
}

function lineThrough(el, boolean) {
    if (el.length===undefined){
        if (boolean){
            el.setAttribute("style","text-decoration:line-through");
            el.classList.add("transparent");
        } else {
            el.removeAttribute("style");
            el.classList.remove("transparent")
        }
    } else {
        for (let i = 0; i < el.length; i++) {
            let elElement = el[i];
            let previousSibling = elElement.previousSibling.previousSibling;
            lineThrough(previousSibling,boolean);
        }
    }
}

function insertCountNotExecuteTasks(countNotExecuteTask){
    let id = document.getElementById("task_count");
    id.textContent=countNotExecuteTask;
}

function getCountNotExecuteTasks(){
    let el = document.getElementsByClassName("toogle");
    let count = 0;
    for (let i = 0; i < el.length; i++) {
        let e = el[i];
        if (e.checked===false) count++;
    }
    return count;
}
