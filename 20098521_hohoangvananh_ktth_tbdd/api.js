// src/api.js
export const fetchTodos = async () => {
  const response = await fetch('https://66ff36ab2b9aac9c997e88f6.mockapi.io/todo/v1/todo');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
};

export const createTodo = async (todo) => {
  const response = await fetch('https://66ff36ab2b9aac9c997e88f6.mockapi.io/todo/v1/todo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
};

export const updateTodo = async (id, todo) => {
  const response = await fetch(`https://66ff36ab2b9aac9c997e88f6.mockapi.io/todo/v1/todo/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
};

export const deleteTodo = async (id) => {
  const response = await fetch(`https://66ff36ab2b9aac9c997e88f6.mockapi.io/todo/v1/todo/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
};
