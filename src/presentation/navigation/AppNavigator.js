import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HomeScreen } from "../screens/HomeScreen";
import { TaskDetailsScreen } from "../screens/TaskDetailsScreen";

const Stack = createNativeStackNavigator();

export function AppNavigator({ getTodos, addTodo, toggleTodo, addSubTask }) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" options={{ title: "Clean ToDo" }}>
          {(props) => (
            <HomeScreen
              {...props}
              getTodos={getTodos}
              addTodo={addTodo}
              toggleTodo={toggleTodo}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="TaskDetails">
          {(props) => (
            <TaskDetailsScreen
              {...props}
              addSubTask={addSubTask} 
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
