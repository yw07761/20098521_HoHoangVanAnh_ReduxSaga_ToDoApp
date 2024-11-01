// src/redux/reducers/todoReducer.js
import {
  FETCH_TODOS_SUCCESS,
  FETCH_TODOS_FAILURE,
  ADD_TODO_REQUEST,
  UPDATE_TODO_REQUEST,
  DELETE_TODO_REQUEST,
} from '../actions/todoActions';

const initialState = {
  todos: [],
  error: null,
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TODOS_SUCCESS:
      return { ...state, todos: action.payload };
    case FETCH_TODOS_FAILURE:
      return { ...state, error: action.payload };
    case ADD_TODO_REQUEST:
      return { ...state, todos: [...state.todos, action.payload] }; // Handle optimistically
    case UPDATE_TODO_REQUEST:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id ? { ...todo, ...action.payload.todo } : todo
        ),
      };
    case DELETE_TODO_REQUEST:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };
    default:
      return state;
  }
};

export default todoReducer;
