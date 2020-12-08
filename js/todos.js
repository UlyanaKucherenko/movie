console.log('todos');




const input = document.getElementById('title');
const textarea = document.getElementById('description');
const button = document.getElementById('create-todo');
const form = document.getElementById('form');
const todosWraper = document.getElementById('todos');
let todos = [];

const getTodos = () => {

  const res = JSON.parse(localStorage.getItem('todos'));
  todos = [...res];
};

const updateTodos = () => {
  localStorage.setItem('todos', JSON.stringify(todos));
};



const renderTodosList = () => {
  todosWraper.innerHTML = todos.map((item) => {
    return `
      <div class="uk-card uk-card-default uk-card-body uk-margin">
      <input  class="uk-checkbox todo-input"   data-id="${item.id}" type="checkbox" ${item.checked? "checked" : ''}>
        <label class="uk-h4 todo-label"> 
          ${item.title} - ${item.descr}
        </label>
       
      </div>
    `;
  }).join("");
};

const checkInputs = () => {
  !input.value.length || !textarea.value.length ? button.setAttribute('disabled',"true") : button.removeAttribute("disabled");
}

input.oninput = () => checkInputs();
textarea.oninput = () => checkInputs();

//checkInputs();


form.onsubmit= (event)=> {
    event.preventDefault();

    const title = input.value;
    const descr = textarea.value;

    todos.push({
        id:todos.length,
        title:title,
        descr:descr,
        checked: false
    });

    input.value = "";
    textarea.value = "";
    console.log(todos);
    updateTodos();
    renderTodosList();
};

document.addEventListener("DOMContentLoaded", () => {
  getTodos();
  checkInputs();
  renderTodosList();
});
