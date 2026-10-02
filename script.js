//Select DOM elements
const input=document.getElementById('todo-input')
const addBtn=document.getElementById('add-btn')
const list=document.getElementById('todo-list')

//Try to load saved todos from local storage(if any)
const saved=localStorage.getItem('todos');
const todos=saved?JSON.parse(saved):[];

function saveTodos(){
    //Save current todos array to local storage
    localStorage.setItem('todos',JSON.stringify(todos));
}

// create a dom node for a todo object and append it to the list
function createTodoNode(todo,index){
    const li=document.createElement('li');
    const checkbox=document.createElement('input');
    checkbox.type='checkbox';
    checkbox.checked=!!todo.completed;
    checkbox.addEventListener("change",()=>{
        todo.completed=checkbox.checked;

        //strike through the text if completed
        textSpan.style.textDecoration=
        checkbox.checked? "line-through" : "none";

        saveTodos();
    })

    //Text of the todo

    const textSpan=document.createElement("span");
    textSpan.textContent=todo.text;
    textSpan.style.margin='0 8px';
    if(todo.completed){
        textSpan.style.textDecoration='line-through';
    }
        //double click to edit the text
        textSpan.addEventListener("dblclick",()=>{
            const newText=prompt("Edit todo:",todo.text);
            if(newText !== null){
                todo.text=newText.trim()
                textSpan.textContent=todo.text;
                saveTodos();
            }
        });

        //delete todo
        const delBtn=document.createElement('button');
        delBtn.textContent="Delete";
        delBtn.addEventListener('click',()=>{
            todos.splice(index,1);
            render();
            saveTodos();
        })

        li.appendChild(checkbox);
        li.appendChild(textSpan);
        li.appendChild(delBtn);
        return li;

}

//render the whole todo list from todo array
function render(){
    list.innerHTML='';

    //Recreate each item
    todos.forEach((todo,index)=>{
        const node=createTodoNode(todo,index);
        list.appendChild(node)
    });
}

function addTodo(){
    const text=input.value.trim();
    if(!text){
        return;

        todos.push({
            text,
            completed:false
        });
        input.value="";
        render();
        saveTodos();
    }

    //push a new todo object
    todos.push({text,completed:false});
    input.value='';
    render()
    saveTodos()
}

addBtn.addEventListener('click',addTodo);
input.addEventListener('keydown',(e)=>{
    if(e.key=='Enter'){
        addTodo();
    }
})
render();