export class ToggleTodo {
  constructor(todoRepository) {
    this.todoRepository = todoRepository;
  }

  async call(id) {
    if (!id) throw new Error('id inválido');
    return this.todoRepository.toggleTodo(id);
  }
}
