export interface ITaskCreationData {
  name: string;
  description: string;
}

export interface ITask {
  id: number;
  createdAt: string;
  name: string;
  description: string;
}
