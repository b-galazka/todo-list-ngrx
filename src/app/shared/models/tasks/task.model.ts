export enum TaskStatus {
  New = 'new',
  InProgress = 'in progress',
  Finished = 'finished'
}

export interface ITaskCreationData {
  name: string;
  description: string;
  status?: TaskStatus;
}

export type ITaskUpdateData = Partial<ITaskCreationData>;

export interface ITask extends ITaskCreationData {
  id: number;
  createdAt: string;
  updatedAt: string;
  status: TaskStatus;
}
