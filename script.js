const form = document.querySelector('#todoForm');
const input = document.querySelector('#todoInput');
const output = document.querySelector('#output');
const nekad = document.querySelector('#error')

let todos = [];

const fetchTodos = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos')
    const data = await res.json()
    todos = data;
    console.log(data)
    listTodos();
}

fetchTodos();

const listTodos = () => {
    output.innerHTML = ''
    todos.forEach(todo => {
    output.appendChild(createTodoElement(todo))
    })
}

const createTodoElement = todo => {

    let card = document.createElement('div');
    card.classList.add('todo');

    let title = document.createElement('p');
    title.classList.add('todo-title');
    title.innerText = todo.title;

    let button = document.createElement('button');
    button.classList.add('btn', 'btn-danger', 'btn-sm');
    button.innerText = 'X';

    
    card.appendChild(title);
    card.appendChild(button);
    
    button.addEventListener('click', () => removeTodo(todo.id, card))
    return card;
}

function removeTodo(id, todo) {
    todos = todos.filter (todo => todo.id !== id)
    // button.parentElement.remove();
    // listTodos()
    // DELETE FROM DB
    // if (???)
    todo.remove()
}

const createNewTodo = title => {
    fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
            title: title,
            completed: false
        })
        // Lägg ++ på id??
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        todos.unshift(data);
        // listTodos();
        output.prepend(createTodoElement(data))
    })
}

form.addEventListener('submit', e => {
    e.preventDefault();
    if(input.value !== '') {
        createNewTodo(input.value)
        input.value = '';
        input.focus()
        nekad.classList.remove('vis-visible')
    }
    else{
        nekad.classList.add('vis-visible')
    }
})