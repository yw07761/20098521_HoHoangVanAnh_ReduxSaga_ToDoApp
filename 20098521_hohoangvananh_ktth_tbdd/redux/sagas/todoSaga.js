// src/redux/sagas/todoSaga.js
import { call, put, takeEvery } from 'redux-saga/effects';
import {
  FETCH_TODOS_REQUEST,
  FETCH_TODOS_SUCCESS,
  FETCH_TODOS_FAILURE,
  ADD_TODO_REQUEST,
  UPDATE_TODO_REQUEST,
  DELETE_TODO_REQUEST,
} from '../actions/todoActions';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from '../../api';

function* fetchTodosSaga() {
  try {
    const todos = yield call(fetchTodos);
    yield put({ type: FETCH_TODOS_SUCCESS, payload: todos });
  } catch (error) {
    yield put({ type: FETCH_TODOS_FAILURE, payload: error.message });
  }
}

function* addTodoSaga(action) {
  try {
    const todo = yield call(createTodo, action.payload);
    yield put({ type: FETCH_TODOS_REQUEST }); // Refetch todos
  } catch (error) {
    yield put({ type: FETCH_TODOS_FAILURE, payload: error.message });
  }
}

function* updateTodoSaga(action) {
  try {
    yield call(updateTodo, action.payload.id, action.payload.todo);
    yield put({ type: FETCH_TODOS_REQUEST }); // Refetch todos
  } catch (error) {
    yield put({ type: FETCH_TODOS_FAILURE, payload: error.message });
  }
}

function* deleteTodoSaga(action) {
  try {
    yield call(deleteTodo, action.payload);
    yield put({ type: FETCH_TODOS_REQUEST }); // Refetch todos
  } catch (error) {
    yield put({ type: FETCH_TODOS_FAILURE, payload: error.message });
  }
}

export default function* todoSaga() {
  yield takeEvery(FETCH_TODOS_REQUEST, fetchTodosSaga);
  yield takeEvery(ADD_TODO_REQUEST, addTodoSaga);
  yield takeEvery(UPDATE_TODO_REQUEST, updateTodoSaga);
  yield takeEvery(DELETE_TODO_REQUEST, deleteTodoSaga);
}
