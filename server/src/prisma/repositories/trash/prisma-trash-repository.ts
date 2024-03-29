import { Trash } from "@src/entities/trash";
import { prisma } from "@src/prisma/prisma-client";
import { TrashRepository } from "@src/repositories/trash-repository";
import { PrismaTrashMapper } from "./prisma-trash-mapper";

export class PrismaTrashRepository implements TrashRepository {
  async create(task: Trash): Promise<void> {
    const trashTask = PrismaTrashMapper.toPrisma(task);

    await prisma.deletedTask.create({
      data: {
        ...trashTask,
        deletedAt: new Date(),
      },
    });
  }

  async findAllTrash(userId: string): Promise<Trash[]> {
    const allTrash = prisma.deletedTask.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return (await allTrash).map(PrismaTrashMapper.toDomain);
  }
}
