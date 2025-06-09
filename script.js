let dragCard=null;
let showcontext=null;
function AddTask(tasks){
    const task=document.getElementById(`${tasks}-input`);
    if(task.value.trim()==''){
        return;
    }
    const datetask=new Date().toLocaleString();
    // console.log(datetask);
    const card=CreateCard(task.value, datetask);
    document.getElementById(`${tasks}-task`).appendChild(card);
    task.value="";
    updatecount(tasks);
}

function CreateCard(tsk, datetask){
    const task=document.createElement("div");
        task.innerHTML=`
        <span>${tsk}</span><br>
        <small class="time">${datetask}</small>
        `
    task.classList.add("card");
    task.draggable=true;
    task.addEventListener("dragstart",dragStart);
    task.addEventListener("dragend",dragEnd);
    task.addEventListener("contextmenu",function (ele){
        ele.preventDefault();
        showcontext=this;
        addcontextMenu(ele.pageX, ele.pageY);
    });
    return task;
}

function dragStart(){
    this.classList.add("dragging");
    dragCard=this;
}
function dragEnd(){
    this.classList.remove("dragging");
    dragCard=null;
    ["task","doing","done"].forEach((event)=>{
        updatecount(event);
    })
}

const columns=document.querySelectorAll(".column .tasks");

columns.forEach((column) => {
    column.addEventListener("dragover",dragOver);})

function dragOver(elem){
    // console.log(elem);
    elem.preventDefault();
    this.appendChild(dragCard);
}    

let contextMenu=document.querySelector('.context-menu');
function addcontextMenu(x, y){
    // console.log(x,y);
    contextMenu.style.left=`${x}px`;
    contextMenu.style.top=`${y}px`;
    contextMenu.style.display='block';
}


document.addEventListener("click",()=>{
    // console.log("click");
    contextMenu.style.display='none';
})


function editTask(){
    if(showcontext!==null){
        let newtext= prompt("Edit task:",showcontext.querySelector("span").textContent);
        newtext=newtext.trim();
        const datetask=new Date().toLocaleString();
        if(newtext!==""){
            showcontext.innerHTML=`
        <span>${newtext}</span><br>
        <small class="time">${datetask}</small>
        `
        }
    }
}

function deleteTask(){
    if(showcontext!==null){
        let columnId=showcontext.parentElement.parentElement.id;
        showcontext.remove();
        updatecount(columnId);
    }
}

function updatecount(columnId){
    let count= document.querySelectorAll(`#${columnId}-task .card`).length;
    document.querySelector(`#${columnId}-count`).textContent=count;
}