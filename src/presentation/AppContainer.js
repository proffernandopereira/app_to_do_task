import React, { useEffect } from "react";
import { createContainer } from "../di/container";
import { AppNavigator } from "./navigation/AppNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function AppContainer() {
  const container = createContainer();
  const { getTodos, addTodo, toggleTodo, addSubTask } = container;

  // ✅ se quiser resetar storage, faz só 1 vez ao abrir o app
  useEffect(() => {
    //AsyncStorage.removeItem("@clean_todo:todos");
  }, []);

  return (
    <AppNavigator
      getTodos={getTodos}
      addTodo={addTodo}
      toggleTodo={toggleTodo}
      addSubTask={addSubTask}
    />
  );
}
