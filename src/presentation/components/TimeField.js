import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

function formatTime(date) {
  const hh = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");
  return `${hh}:${mm}`;
}

export function TimeField({ label, value, onChange, error }) {
  const [show, setShow] = useState(false);
  const [internalDate, setInternalDate] = useState(new Date());

  const openPicker = () => setShow(true);

  function onPickerChange(event, selectedDate) {
    setShow(false);

    if (event.type === "dismissed") return;
    const date = selectedDate || internalDate;

    setInternalDate(date);
    onChange(formatTime(date));
  }

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>

      <Pressable style={styles.input} onPress={openPicker}>
        <Text style={{ color: value ? "#000" : "#999" }}>
          {value || "Selecionar hora"}
        </Text>
      </Pressable>

      {error && <Text style={styles.error}>{error}</Text>}

      {show && (
        <DateTimePicker
          value={internalDate}
          mode="time"
          is24Hour={true}
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={onPickerChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginTop: 10 },
  label: { fontWeight: "bold" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 6,
    marginTop: 5,
  },
  error: { color: "red", marginTop: 4 },
});
