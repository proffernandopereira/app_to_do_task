export class TodoModel {
  constructor({ id, title, done, subTasks = [] }) {
    this.id = id;
    this.title = title;
    this.done = done;
    this.subTasks = subTasks;
  }

  static fromEntity(entity) {
    return new TodoModel({
      id: entity.id,
      title: entity.title,
      done: entity.done,
      subTasks: entity.subTasks || [],
    });
  }

  toEntity() {
    return {
      id: this.id,
      title: this.title,
      done: this.done,
      subTasks: this.subTasks || [], 
    };
  }
}
