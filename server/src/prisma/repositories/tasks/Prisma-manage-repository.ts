import { Task } from "../../../entities/Task";
import { PrismaTaskMapper } from "./Prisma-task-mapper";
import { PrismaClient } from "@prisma/client";
import { ManageRepository } from "../../../repositories/Manage-repository";
import { CreateTaskBody } from "../../../http/dtos/create-task-body";


const prisma = new PrismaClient();

export class PrismaManageRepository implements ManageRepository {
  update(task: Task): Promise<void> {
      throw new Error("Method not implemented.");
  }
  delete(task: Task): Promise<void> {
      throw new Error("Method not implemented.");
  }
  async create(task: Task): Promise<void> {
    const newTask = PrismaTaskMapper.toPrisma(task);
    await prisma.task.create({
      data: newTask,
    });
  }
}