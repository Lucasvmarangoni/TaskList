import { Task as RawTask } from "@prisma/client";
import { Task } from "@src/entities/task";
import { LimitDate } from "@src/entities/task-entities/limitDate";

export class PrismaTaskMapper {
  static toPrisma(task: Task) {
    return {
      id: task.id,
      title: task.title,
      content: task.content,
      date: task.date.value,
      done: task.done,
      createdAt: task.createdAt,
      userId: task.userId,
    };
  }

  static toDomain(raw: RawTask): Task {
    return new Task(
      {
        title: raw.title,
        content: raw.content,
        date: new LimitDate(raw.date),
        done: raw.done,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        userId: raw.userId
      },
      raw.id
    );
  }
}
