import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

export function TodoInput({ onAdd }) {
  const [text, setText] = useState('');

  function submit() {
    if (!text.trim()) return;
    onAdd(text.trim());
    setText('');
  }

  return (
    <View style={styles.row}>
      <TextInput
        placeholder="Nova tarefa"
        value={text}
        onChangeText={setText}
        style={styles.input}
      />
      <Button title="Add" onPress={submit} />  //criar um novo componete 
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', marginBottom: 12 },
  input: { flex: 1, borderWidth: 1, borderColor: '#ddd', marginRight: 8, paddingHorizontal: 8, height: 40, borderRadius: 4 },
});
