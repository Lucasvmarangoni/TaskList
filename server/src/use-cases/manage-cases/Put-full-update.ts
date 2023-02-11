import { Task } from "../../entities/Task";
import { PrismaManageRepository } from "../../prisma/repositories/tasks/Prisma-manage-repository";
import { PrismaTaskQueryRepository } from "../../prisma/repositories/tasks/Prisma-query-repository";

export class FullUpdate {
  static async execute(body: Task, taskId: string) {
    const prismaQueryRepository = new PrismaTaskQueryRepository();
    let task: Task = await prismaQueryRepository.findeById(taskId);

    task.title = body.title;
    task.description = body.description;
    task.limitDay = body.limitDay;
    task.limitMonth = body.limitMonth;
    task.limitYear = body.limitYear;
    task.done = body.done;
    task.updated();

    if (!!task) {
      return { message: "Task not found" };
    }
    const prismaManageRepository = new PrismaManageRepository();
    return await prismaManageRepository.save(task);
  }
}