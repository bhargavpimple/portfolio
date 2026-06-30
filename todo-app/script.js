// Todo class to manage individual todos
class Todo {
  constructor(id, text, completed = false) {
    this.id = id;
    this.text = text;
    this.completed = completed;
  }
}

// TodoApp class for managing all functionality
class TodoApp {
  constructor() {
    this.todos = [];
    this.currentFilter = 'all';
    this.init();
  }

  init() {
    this.loadFromLocalStorage();
    this.attachEventListeners();
    this.render();
  }

  attachEventListeners() {
    // Add todo on button click
    document.getElementById('addBtn').addEventListener('click', () => this.addTodo());

    // Add todo on Enter key
    document.getElementById('todoInput').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.addTodo();
    });

    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => this.setFilter(e.target.dataset.filter));
    });

    // Clear completed button
    document.getElementById('clearBtn').addEventListener('click', () => this.clearCompleted());
  }

  addTodo() {
    const input = document.getElementById('todoInput');
    const text = input.value.trim();

    if (text === '') {
      alert('Please enter a task!');
      return;
    }

    const id = Date.now();
    const newTodo = new Todo(id, text, false);
    this.todos.push(newTodo);

    input.value = '';
    this.saveToLocalStorage();
    this.render();
  }

  toggleTodo(id) {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.saveToLocalStorage();
      this.render();
    }
  }

  deleteTodo(id) {
    this.todos = this.todos.filter(t => t.id !== id);
    this.saveToLocalStorage();
    this.render();
  }

  clearCompleted() {
    const completedCount = this.todos.filter(t => t.completed).length;
    
    if (completedCount === 0) {
      alert('No completed tasks to clear!');
      return;
    }

    if (confirm(`Delete ${completedCount} completed task(s)?`)) {
      this.todos = this.todos.filter(t => !t.completed);
      this.saveToLocalStorage();
      this.render();
    }
  }

  setFilter(filter) {
    this.currentFilter = filter;
    
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === filter);
    });

    this.render();
  }

  getFilteredTodos() {
    switch (this.currentFilter) {
      case 'active':
        return this.todos.filter(t => !t.completed);
      case 'completed':
        return this.todos.filter(t => t.completed);
      default:
        return this.todos;
    }
  }

  render() {
    this.renderTodoList();
    this.updateStats();
  }

  renderTodoList() {
    const todoList = document.getElementById('todoList');
    const filteredTodos = this.getFilteredTodos();

    todoList.innerHTML = '';

    if (filteredTodos.length === 0) {
      todoList.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">📝</div>
          <div class="empty-state-text">
            ${this.currentFilter === 'all' ? 'No tasks yet. Add one to get started!' : 
              this.currentFilter === 'active' ? 'All tasks completed! Great job!' : 
              'No completed tasks yet.'}
          </div>
        </div>
      `;
      return;
    }

    filteredTodos.forEach(todo => {
      const li = document.createElement('li');
      li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
      
      li.innerHTML = `
        <input 
          type="checkbox" 
          class="checkbox" 
          ${todo.completed ? 'checked' : ''}
          data-id="${todo.id}"
        >
        <span class="todo-text">${this.escapeHtml(todo.text)}</span>
        <button class="delete-btn" data-id="${todo.id}">Delete</button>
      `;

      // Checkbox listener
      li.querySelector('.checkbox').addEventListener('change', () => this.toggleTodo(todo.id));

      // Delete button listener
      li.querySelector('.delete-btn').addEventListener('click', () => this.deleteTodo(todo.id));

      todoList.appendChild(li);
    });
  }

  updateStats() {
    const total = this.todos.length;
    const completed = this.todos.filter(t => t.completed).length;
    const active = total - completed;

    document.getElementById('totalTodos').textContent = total;
    document.getElementById('activeTodos').textContent = active;
    document.getElementById('completedTodos').textContent = completed;
  }

  saveToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  loadFromLocalStorage() {
    const stored = localStorage.getItem('todos');
    if (stored) {
      const data = JSON.parse(stored);
      this.todos = data.map(t => new Todo(t.id, t.text, t.completed));
    }
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new TodoApp();
});