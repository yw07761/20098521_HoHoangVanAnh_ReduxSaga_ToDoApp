import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Fetch todos từ API
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await fetch('https://66ff36ab2b9aac9c997e88f6.mockapi.io/todo/v1/todo');
  if (!response.ok) {
    throw new Error('Failed to fetch todos');
  }
  return await response.json();
});

// Thêm một todo mới
export const addTodo = createAsyncThunk('todos/addTodo', async (todo) => {
  const response = await fetch('https://66ff36ab2b9aac9c997e88f6.mockapi.io/todo/v1/todo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  });
  if (!response.ok) {
    throw new Error('Failed to add todo');
  }
  return await response.json();
});

// Sửa todo
export const editTodo = createAsyncThunk('todos/editTodo', async ({ id, task }) => {
  const response = await fetch(`https://66ff36ab2b9aac9c997e88f6.mockapi.io/todo/v1/todo/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ task }),
  });
  if (!response.ok) {
    throw new Error('Failed to edit todo');
  }
  return await response.json();
});

// Xóa todo
export const removeTodo = createAsyncThunk('todos/removeTodo', async (id) => {
  const response = await fetch(`https://66ff36ab2b9aac9c997e88f6.mockapi.io/todo/v1/todo/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete todo');
  }
  return id; // Trả về id để xóa khỏi state
});

// Khởi tạo slice
const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
    status: 'idle',
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(editTodo.fulfilled, (state, action) => {
        const index = state.todos.findIndex(todo => todo.id === action.payload.id);
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      })
      .addCase(removeTodo.fulfilled, (state, action) => {
        const id = action.payload;
        state.todos = state.todos.filter(todo => todo.id !== id);
      });
  },
});

// Xuất reducer
export default todoSlice.reducer;
