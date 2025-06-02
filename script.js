let dragCard=null;
function AddTask(tasks){
    const task=document.getElementById(`${tasks}-input`);
    if(task.value==''){
        return;
    }
    const card=CreateCard(task.value);
    document.getElementById(`${tasks}-task`).appendChild(card);
    task.value="";
}

function CreateCard(tsk){
    const task=document.createElement("div");
    task.textContent=tsk;
    task.classList.add("card");
    task.draggable=true;
    task.addEventListener("dragstart",dragStart);
    task.addEventListener("dragend",dragEnd);
    return task;
}

function dragStart(){
    this.classList.add("dragging");
    dragCard=this;
}
function dragEnd(){
    this.classList.remove("dragging");
    dragCard=null;
}

const columns=document.querySelectorAll(".column .tasks");

columns.forEach((column) => {
    column.addEventListener("dragover",dragOver);})

function dragOver(elem){
    console.log(elem);
    elem.preventDefault();
    this.appendChild(dragCard);
}    
