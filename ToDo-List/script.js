document.addEventListener('DOMContentLoaded', () => {
    const todoList = document.getElementById('todo-list');

    window.addTodo = function() {
        const newTodoInput = document.getElementById('new-todo');
        const newTodoText = newTodoInput.value.trim();
        const todoDateInput = document.getElementById('todo-date');
        const todoDate = todoDateInput.value;

        if (newTodoText === '' || todoDate === '') return;

        const todoItem = document.createElement('li');
        todoItem.className = 'todo-item';
        todoItem.innerHTML = `
            <span>${newTodoText} - ${todoDate}</span>
            <div>
                <button onclick="completeTodo(this)">Complete</button>
                <button onclick="deleteTodo(this)">Delete</button>
            </div>
        `;
        todoList.appendChild(todoItem);
        newTodoInput.value = '';
        todoDateInput.value = '';
    };

    window.completeTodo = function(button) {
        const todoItem = button.parentElement.parentElement;
        todoItem.classList.toggle('completed');
    };

    window.deleteTodo = function(button) {
        const todoItem = button.parentElement.parentElement;
        todoList.removeChild(todoItem);
    };
});