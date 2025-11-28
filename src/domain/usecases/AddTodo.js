import { Todo } from '../entities/Todo';

export class AddTodo {
  constructor(todoRepository) {
    this.todoRepository = todoRepository;
  }

  async call(title) {
    if (!title || !title.trim()) {
      throw new Error('Título inválido');
    }

    const todo = new Todo({
      id: Date.now().toString(),  // ✅ id simples e confiável
      title: title.trim(),
      done: false,
    });

    return this.todoRepository.addTodo(todo);
  }
}
