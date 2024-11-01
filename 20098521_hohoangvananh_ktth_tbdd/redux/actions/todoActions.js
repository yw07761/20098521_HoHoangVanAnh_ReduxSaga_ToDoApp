export const FETCH_TODOS_REQUEST = 'FETCH_TODOS_REQUEST';
export const FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS';
export const FETCH_TODOS_FAILURE = 'FETCH_TODOS_FAILURE';
export const ADD_TODO_REQUEST = 'ADD_TODO_REQUEST';
export const UPDATE_TODO_REQUEST = 'UPDATE_TODO_REQUEST';
export const DELETE_TODO_REQUEST = 'DELETE_TODO_REQUEST';

export const fetchTodos = () => ({ type: FETCH_TODOS_REQUEST });
export const addTodo = (todo) => ({ type: ADD_TODO_REQUEST, payload: todo });
export const updateTodo = (id, todo) => ({ type: UPDATE_TODO_REQUEST, payload: { id, todo } });
export const deleteTodo = (id) => ({ type: DELETE_TODO_REQUEST, payload: id });
