import React, { useState } from 'react';
import './TodoApp.css';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');

  const handleTaskChange = (e) => {
    setTask(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        task: task,
        status: 'pending',
      };
      setTodos([...todos, newTodo]);
      setTask('');
    }
  };

  const handleStatusUpdate = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          status: todo.status === 'pending' ? 'completed' : 'pending',
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const handleRemoveTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <div className="todo-app">
      <h1>Todo App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={task}
          onChange={handleTaskChange}
          placeholder="Enter a task"
        />
        <button type="submit">Add Todo</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span className={todo.status}>{todo.task}</span>
            <button onClick={() => handleStatusUpdate(todo.id)}>
              Update Status
            </button>
            <button onClick={() => handleRemoveTodo(todo.id)}>Remove Todo</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
