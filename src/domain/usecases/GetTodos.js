export class GetTodos {
  constructor(todoRepository) {
    this.todoRepository = todoRepository;
  }

  async call() {
    return this.todoRepository.getTodos();
  }
}
