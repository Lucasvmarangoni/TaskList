import { Task } from '../entities/task';

export abstract class ManageRepository {
  abstract create(task: Task): Promise<void>;
  abstract saveCondition(taskId: Task): Promise<void>;
  abstract save(task: Task): Promise<void>;
  abstract findeById(taskId: string): Promise<Task>;
}
