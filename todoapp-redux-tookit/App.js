import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { AppRegistry, View, ScrollView, StyleSheet, Text } from 'react-native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './redux/store'; // Đảm bảo đường dẫn đúng
import { fetchTodos } from './redux/todoSlice';
import TodoItem from './components/TodoItem';
import TodoForm from './components/TodoForm';
import { name as appName } from './app.json';

const App = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);
  const todoStatus = useSelector((state) => state.todos.status);
  const error = useSelector((state) => state.todos.error);

  const [todoToEdit, setTodoToEdit] = useState(null);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleEdit = (todo) => {
    setTodoToEdit(todo);
  };

  const handleCancelEdit = () => {
    setTodoToEdit(null);
  };
  return (
    <View style={styles.container}>
      <TodoForm todoToEdit={todoToEdit} onCancel={handleCancelEdit} />
      {todoStatus === 'loading' && <Text>Loading...</Text>}
      {error && <Text>Error: {error}</Text>}
      <ScrollView>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onEdit={handleEdit} />
        ))}
      </ScrollView>
    </View>
  );
};

const AppContainer = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
});

// Xuất component AppContainer là mặc định
export default AppContainer;

AppRegistry.registerComponent(appName, () => AppContainer);
