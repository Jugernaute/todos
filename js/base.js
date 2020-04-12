let $mainInput = $('#main_input');
let $ul = $(".add-todo");

let app = {
    create_task : (function () {
        $(document).on('keypress', function (e) {
            let task = $mainInput.val();
            if (e.which === 13 && task !== "") {
                let li = "<li class='view'><p>" + task + "</p> <input class='toogle' type='checkbox'><div class='remove'></div></li>";
                $ul.append(li);
                $mainInput.val("");
                let children = $ul.children();
                let length = children.length;
                if (length === 0) {
                    $('.lbl').addClass('hidden');
                } else if (length === 1) {
                    $('.lbl').removeClass("hidden");
                }
                let selectedEl = document.getElementById("selected");
                // let selectedNow = whichFilterSelectedNow();
                // debugger;
                addFilterFooter(selectedEl);
            }
        });
    }()),

    checkedAll: (function (){
        $(".lbl").click(function () {
            let collectionOfToogle = document.getElementsByClassName("toogle");
            let tooglesLength = collectionOfToogle.length;
            let uncheck = false;
            for (let i = 0; i < tooglesLength; i++) {
                let collectionOfToogleElement = collectionOfToogle[i];
                let checked = collectionOfToogleElement.checked;
                if(checked){
                    continue
                } uncheck = true ;
            }
            if (!uncheck){
                checkbox_check_uncheck_all(collectionOfToogle, false);
            } else {
                checkbox_check_uncheck_all(collectionOfToogle);
            }
            let l = getCountNotExecuteTasks();
            let selected = document.getElementById("selected").innerText;
            fillContent(selected);
            insertCountNotExecuteTasks(l);
        })
    }()),

    taskIsExecute : (function () {
        $(document).on("click",".view",function () {
            let checked = this.lastChild.checked;
            let firstChild = this.firstChild;
            if (checked){
                lineThrough(firstChild, true);
            }else lineThrough(firstChild,false);
        })
    }()),

    clickCheckbox : (function (){
        /*
        * after click checkbox
        * */
        $(document).on("click",".toogle",function () {
            let c = getCountNotExecuteTasks();
            insertCountNotExecuteTasks(c);
            let filterSelected = document.getElementById("selected");
            let filter = filterSelected.innerText;

            switch (filter) {
                case "All":
                    break;
                case "Active":
                    this.parentElement.classList.add("hidden")
                    console.log();
                    break;
                case "Completed":
                    break;
            }
            define_clearAll(c);
        })
    }()),

    filtersWork : (function (){
        $(document).on("click",".filter",function () {
            switchFilters()
            this.setAttribute("id","selected");
            fillContent(this.innerText);
        })
    }()),

    clearSelected: (function () {
        $(document).on("click","#clear",function () {
            // debugger;
            let checkbox = document.getElementsByClassName("toogle");
            let length = checkbox.length;
            for (let i = 0; i < length; i++) {
                let ch = checkbox[i];
                if (ch.checked===true){
                    length--; i--;
                    let parentNode = ch.parentNode;
                    parentNode.parentNode.removeChild(parentNode)
                }
            }
            define_clearAll(getCountNotExecuteTasks());
        })
    }()),

    removeTask: (function () {
        $(document).on("click",".remove",function () {
            let node = this.parentNode;
            node.parentNode.removeChild(node)
            let c = getCountNotExecuteTasks();
            insertCountNotExecuteTasks(c)
            define_clearAll(c);
        })
    }())
};



