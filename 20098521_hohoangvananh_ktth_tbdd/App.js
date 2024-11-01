import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import todoReducer from './redux/reducers/todoReducer';
import todoSaga from './redux/sagas/todoSaga';
import TodoItem from './components/TodoItem';
import TodoForm from './components/TodoForm';
import { fetchTodos } from './redux/actions/todoActions';

const App = () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(todoReducer, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(todoSaga);

  return (
    <Provider store={store}>
      <MainComponent />
    </Provider>
  );
};

const MainComponent = () => {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <TodoForm />
      <ScrollView>
        {todos.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
});

export default App;
