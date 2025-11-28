import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

export function TodoItem({ todo, onToggle, onOpenDetails }) {
  return (
    <TouchableOpacity
      onPress={onOpenDetails}   // ✅ abre detalhes
      onLongPress={onToggle}    // ✅ opcional: long press marca done
      style={styles.item}
    >
      <Text style={[styles.text, todo.done && styles.done]}>
        {todo.title}
      </Text>
      <Text style={styles.status}>{todo.done ? "✔" : "—"}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  text: { fontSize: 16 },
  done: { textDecorationLine: "line-through", color: "#999" },
  status: { fontSize: 16, color: "#666" },
});
