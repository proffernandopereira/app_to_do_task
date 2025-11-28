export class AddSubTask {
  constructor(todoRepository) {
    this.todoRepository = todoRepository;
  }

  async call(todoId, subTask) {
    const todos = await this.todoRepository.getTodos();
    const todo = todos.find((t) => t.id === todoId);

    if (!todo) throw new Error("Todo não encontrado");

    const updatedTodo = {
      ...todo,
      subTasks: [...(todo.subTasks || []), subTask],
    };

    await this.todoRepository.updateTodo(updatedTodo);
    return updatedTodo;
  }
}
