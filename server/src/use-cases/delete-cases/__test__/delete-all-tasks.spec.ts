import { InMemoryDeleteRepository } from "@src/repositories/in-memory-repository/in-memory-delete-repository";
import { MakeTask } from "@src/test/factories/task-factory";
import { DeleteAllTasks } from "../delete-all-tasks";

describe("Deleted all tasks", () => {
  it("should return all deleted tasks", async () => {
    const deleteRepository = new InMemoryDeleteRepository();
    const deleteAllTasks = new DeleteAllTasks(deleteRepository);

    const task = MakeTask();

    const called = vi.spyOn(deleteRepository, "create");

    await deleteRepository.create(task);
    await deleteRepository.create(task);
    await deleteRepository.create(task);

    expect(deleteRepository.tasks).toHaveLength(3);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { deleteTrash } = await deleteAllTasks.execute(task.userId);    
    
    expect(called).toHaveBeenCalledTimes(3);
    expect(deleteRepository.tasks).toHaveLength(0);
  });
});
