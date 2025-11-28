import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { TodoInput } from '../components/TodoInput';
import { TodoItem } from '../components/TodoItem';

export function HomeScreen({ navigation, getTodos, addTodo, toggleTodo }) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const list = await getTodos.call();
    console.log("LOAD LIST ->", list);
    setTodos(list);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleAdd(title) {
    console.log("HANDLE ADD ->", title);
    await addTodo.call(title);
    await load();
  }

  async function handleToggle(id) {
    console.log("HANDLE TOGGLE ->", id);
    await toggleTodo.call(id);
    await load();
  }

  function handleOpenDetails(todo) {
    navigation.navigate("TaskDetails", { todo }); 
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Clean Architecture - ToDo</Text>
      <TodoInput onAdd={handleAdd} />

      {loading ? (
        <Text>Carregando...</Text>
      ) : (
        <FlatList
          data={todos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TodoItem
                todo={item}
                onToggle={() => handleToggle(item.id)}
                onOpenDetails={() =>
                navigation.navigate("TaskDetails", { todo: item })
                }
            />
            )}

          ListEmptyComponent={<Text style={styles.empty}>Nenhuma tarefa</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  empty: { marginTop: 20, textAlign: 'center', color: '#666' },
});
