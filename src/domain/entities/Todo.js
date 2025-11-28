export class Todo {
  constructor({ id, title, done = false, subTasks = [] }) {
    this.id = id;
    this.title = title;
    this.done = done;
    this.subTasks = subTasks; // ✅ lista de sub-rotinas
  }
}
