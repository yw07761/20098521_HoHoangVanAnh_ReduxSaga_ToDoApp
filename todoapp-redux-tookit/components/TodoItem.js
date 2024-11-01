import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { removeTodo } from '../redux/todoSlice';

const TodoItem = ({ todo, onEdit }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeTodo(todo.id));
  };

  return (
    <View style={styles.todoItem}>
      <Text>{todo.task}</Text>
      <View style={styles.buttons}>
        <Button title="Edit" onPress={() => onEdit(todo)} />
        <View style={styles.buttonSpacing} /> {/* Add spacer */}
        <Button title="Remove" onPress={handleRemove} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center', // Center buttons vertically
  },
  buttonSpacing: {
    width: 10, // Adjust this value for desired spacing
  },
});

export default TodoItem;
