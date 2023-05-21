import { Trash } from "../../entities/trash";
import { PrismaDeleteRepository } from "../../prisma/repositories/tasks/Prisma-delete-repository";
import { PrismaManageRepository } from "../../prisma/repositories/tasks/Prisma-manage-repository";
import { PrismaTaskQueryRepository } from "../../prisma/repositories/tasks/Prisma-query-repository";
import { PrismaTrashRepository } from "../../prisma/repositories/trash/Prisma-trash-repository";
import { DeleteAllTasks } from "../../use-cases/delete-cases/delete-all-tasks";
import { DeleteTask } from "../../use-cases/delete-cases/delete-task";
import { CreateAllTrash } from "../../use-cases/trash-cases/create-all-trash";
import { CreateTrash } from "../../use-cases/trash-cases/create-trash";
import { TrashViewModel } from "../view-models/trash-view-model";

export class DeleteTasks {
  async deleteTask(
    req: { params: { id: string } },
    res: { json: (arg0: TrashViewModel | void) => Promise<Trash> }
  ) {
    const id: string = req.params.id;

    const create = new CreateTrash(
      new PrismaTrashRepository(),
      new PrismaManageRepository()
    );
    const deleteTask = new DeleteTask(new PrismaDeleteRepository());

    const { createTrash } = await create.execute(id);
    const { deleteTrash } = await deleteTask.execute(id);

    return {
      create: res.json(TrashViewModel.toHTTP(createTrash)),
      delete: res.json(deleteTrash),
    };
  }

  async deletedAllTasks(
    _: Request,
    res: {
      json: (arg0: Trash | void) => Promise<Trash[]>;
    }
  ) {
    const create = new CreateAllTrash(
      new PrismaTrashRepository(),
      new PrismaTaskQueryRepository()
    );
    const deleteAllTasks = new DeleteAllTasks(new PrismaDeleteRepository());

    const { createTrash } = await create.execute();
    const { deleteTrash } = await deleteAllTasks.execute();

    return {
      create: res.json(createTrash),
      delete: res.json(deleteTrash),
    };
  }
}