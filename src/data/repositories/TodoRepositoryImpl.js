import { TodoRepository } from '../../domain/repositories/TodoRepository';
import { TodoModel } from '../models/TodoModel';

export class TodoRepositoryImpl extends TodoRepository {
  constructor(localDataSource) {
    super();
    this.local = localDataSource;
  }

  async getTodos() {
    const raw = await this.local.getAll();
    return raw.map((r) => ({
      id: r.id,
      title: r.title,
      done: r.done,
      subTasks: r.subTasks || [], 
    }));
  }

  async addTodo(todo) {
    const current = await this.local.getAll();
    const model = TodoModel.fromEntity(todo);

    current.push({
      id: model.id,
      title: model.title,
      done: model.done,
      subTasks: model.subTasks || [], 
    });

    await this.local.saveAll(current);
  }

  async toggleTodo(id) {
    const current = await this.local.getAll();
    const idx = current.findIndex((t) => t.id === id);
    if (idx === -1) throw new Error('Todo não encontrado');

    current[idx].done = !current[idx].done;
    await this.local.saveAll(current);
  }

   async updateTodo(todo) {
    const current = await this.local.getAll();
    const idx = current.findIndex((t) => t.id === todo.id);
    if (idx === -1) throw new Error("Todo não encontrado");

    current[idx] = {
      ...current[idx],
      title: todo.title,
      done: todo.done,
      subTasks: todo.subTasks || [],
    };

    await this.local.saveAll(current);
  }
}
