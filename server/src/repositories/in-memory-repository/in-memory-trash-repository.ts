import { Trash } from "../../entities/Trash";
import { TrashRepository } from "../Trash-repository";

export class InMemoryTrashRepository implements TrashRepository {
  trash: Trash[] = [];

  async create(trash: Trash): Promise<void> {
    this.trash.push(trash);
  }

  async findAllTrash(): Promise<Trash[]> {
    return this.trash;
  }
}
