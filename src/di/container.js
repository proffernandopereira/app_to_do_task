import { LocalTodoDataSource } from '../data/datasources/LocalTodoDataSource';
import { TodoRepositoryImpl } from '../data/repositories/TodoRepositoryImpl';
import { GetTodos } from '../domain/usecases/GetTodos';
import { AddTodo } from '../domain/usecases/AddTodo';
import { ToggleTodo } from '../domain/usecases/ToggleTodo';
import { AddSubTask } from '../domain/usecases/AddSubTask'; 

export function createContainer() {
  const localDs = new LocalTodoDataSource();
  const todoRepo = new TodoRepositoryImpl(localDs);

  const getTodos = new GetTodos(todoRepo);
  const addTodo = new AddTodo(todoRepo);
  const toggleTodo = new ToggleTodo(todoRepo);
  const addSubTask = new AddSubTask(todoRepo); 
  return {
    getTodos,
    addTodo,
    toggleTodo,
    addSubTask,  
  };
}
