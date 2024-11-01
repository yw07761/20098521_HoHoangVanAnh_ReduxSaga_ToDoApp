import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { addTodo, editTodo } from '../redux/todoSlice';

const TodoForm = ({ todoToEdit, onCancel }) => {
  const [task, setTask] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (todoToEdit) {
      setTask(todoToEdit.task);
    } else {
      setTask('');
    }
  }, [todoToEdit]);

  const handleSubmit = () => {
    if (todoToEdit) {
      dispatch(editTodo({ id: todoToEdit.id, task }));
    } else {
      dispatch(addTodo({ task }));
    }
    setTask(''); // Reset form
    onCancel(); // Close the edit form
  };

  return (
    <View style={styles.form}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>
        ToDo App - Redux toolkit
      </Text>
      <TextInput
        value={task}
        onChangeText={setTask}
        placeholder="Add/Edit Todo"
        style={styles.input}
      />
      <View style={styles.buttons}>
        <Button
          title={todoToEdit ? 'Edit Todo' : 'Add Todo'}
          onPress={handleSubmit}
        />
        <View style={styles.buttonSpacing} /> {/* Add spacer */}
        {todoToEdit && <Button title="Cancel" onPress={onCancel} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    marginBottom: 40,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center', // Center buttons vertically
  },
  buttonSpacing: {
    width: 10, // Adjust this value for desired spacing
  },
});

export default TodoForm;
