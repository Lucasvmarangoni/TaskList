import { QueryRepository } from "../../repositories/Query-repository";
import { GetTasksResponse } from "./Get-all";

type ParameterType = number;

export interface IPromiseType {
  title: string;
  description: string;
  done: boolean;
  createdAt: Date;
  updatedAt: Date;
}
[];

export class TasksCondition {
  public conditionParameter!: ParameterType;

  constructor(private findRecipientRepository: QueryRepository) {}

  public async execute(
    conditionParameter: ParameterType
  ): Promise<GetTasksResponse> {
    this.conditionParameter = conditionParameter;

    const condition = this.conditionParameter === 1 ? true : false;

    return {
      tasks: await this.findRecipientRepository.findByStatus(condition),
    };
  }
}
