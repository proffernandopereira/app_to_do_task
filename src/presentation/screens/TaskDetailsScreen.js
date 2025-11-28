import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, FlatList } from "react-native";
import { TimeField } from "../components/TimeField";


export function TaskDetailsScreen({ route, addSubTask }) {
  const { todo } = route.params;

  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [errors, setErrors] = useState({});
  const [subTasks, setSubTasks] = useState(todo.subTasks || []);

  useEffect(() => {
    setSubTasks(todo.subTasks || []);
  }, [todo]);

  function isValidTime(value) {
    return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value);
  }

  function calculateDuration(st, et) {
    const [sh, sm] = st.split(":").map(Number);
    const [eh, em] = et.split(":").map(Number);
    const start = sh * 60 + sm;
    const end = eh * 60 + em;
    return end - start;
  }

  async function handleSave() {
    const newErrors = {};

    if (!description.trim()) newErrors.description = "Descrição obrigatória";
    if (!startTime.trim()) newErrors.startTime = "Hora início obrigatória";
    if (!endTime.trim()) newErrors.endTime = "Hora fim obrigatória";

    if (startTime && !isValidTime(startTime))
      newErrors.startTime = "Formato inválido (HH:MM)";

    if (endTime && !isValidTime(endTime))
      newErrors.endTime = "Formato inválido (HH:MM)";

    if (!newErrors.startTime && !newErrors.endTime) {
      const diff = calculateDuration(startTime, endTime);
      if (diff < 0) newErrors.endTime = "Hora fim deve ser maior que início";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const duration = calculateDuration(startTime, endTime);

    const subTask = {
      id: Date.now().toString(),
      description: description.trim(),
      startTime,
      endTime,
      duration,
    };

    // ✅ salva no storage via usecase
    const updatedTodo = await addSubTask.call(todo.id, subTask);

    setSubTasks(updatedTodo.subTasks || []);

    // limpa formulário
    setDescription("");
    setStartTime("");
    setEndTime("");
    setErrors({});
  }

  function renderSubTask({ item }) {
    return (
      <View style={styles.subItem}>
        <Text style={styles.subTitle}>{item.description}</Text>
        <Text style={styles.subInfo}>
          {item.startTime} → {item.endTime}  |  {Math.floor(item.duration / 60)}h {item.duration % 60}min
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sub-rotinas: {todo.title}</Text>

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Estudar React Native"
        value={description}
        onChangeText={setDescription}
      />
      {errors.description && <Text style={styles.error}>{errors.description}</Text>}

      <TimeField
        label="Hora início"
        value={startTime}
        onChange={setStartTime}
        error={errors.startTime}
      />
      {errors.startTime && <Text style={styles.error}>{errors.startTime}</Text>}
      
      <TimeField
        label="Hora fim"
        value={endTime}
        onChange={setEndTime}
        error={errors.endTime}
        />
      {errors.endTime && <Text style={styles.error}>{errors.endTime}</Text>}

      <View style={{ marginTop: 10 }}>
        <Button title="Salvar Sub-tarefa" onPress={handleSave} />
      </View>

      <Text style={styles.listTitle}>Sub-tarefas salvas</Text>

      <FlatList
        data={subTasks}
        keyExtractor={(item) => item.id}
        renderItem={renderSubTask}
        ListEmptyComponent={<Text style={styles.empty}>Nenhuma sub-tarefa ainda</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },

  label: { marginTop: 10, fontWeight: "bold" },
  input: {
    borderWidth: 1, borderColor: "#ccc",
    padding: 10, borderRadius: 6, marginTop: 5,
  },

  error: { color: "red", marginTop: 4 },

  listTitle: {
    marginTop: 20, fontSize: 16, fontWeight: "bold",
  },
  empty: { marginTop: 10, color: "#777", textAlign: "center" },

  subItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 6,
    marginTop: 8,
    backgroundColor: "#fafafa",
  },
  subTitle: { fontWeight: "bold" },
  subInfo: { color: "#555", marginTop: 2 },
});
