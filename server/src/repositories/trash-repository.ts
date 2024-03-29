import { Trash } from '../entities/trash';

export abstract class TrashRepository {
  abstract create(trash: Trash): Promise<void>;
  abstract findAllTrash(userId: string): Promise<Trash[]>;
}
