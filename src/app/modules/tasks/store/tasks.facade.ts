import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';

import {
  getTasks,
  getTasksFetchingStatus,
  getTaskCreationStatus,
  getTasksDeletionStatuses,
  getAllTasksFetchedStatus,
  getTasksAmount
} from './tasks.selectors';

import { tasksFetchingStart, taskCreationStart, taskDeletionStart } from './tasks.actions';
import { ITaskCreationData } from 'src/app/modules/tasks/interfaces/task.interface';
import { ITasksState } from './tasks.reducer';

@Injectable({
  providedIn: 'root'
})
export class TasksFacade {
  public readonly tasks$ = this.store.pipe(select(getTasks));
  public readonly tasksFetchingStatus$ = this.store.pipe(select(getTasksFetchingStatus));
  public readonly taskCreationStatus$ = this.store.pipe(select(getTaskCreationStatus));
  public readonly tasksDeletionStatuses$ = this.store.pipe(select(getTasksDeletionStatuses));
  public readonly allTasksFetchedStatus$ = this.store.pipe(select(getAllTasksFetchedStatus));
  public readonly tasksAmount$ = this.store.pipe(select(getTasksAmount));

  public constructor(private readonly store: Store<ITasksState>) { }

  public fetchTasks(): void {
    this.store.dispatch(tasksFetchingStart());
  }

  public createTask(task: ITaskCreationData): void {
    this.store.dispatch(taskCreationStart({ task }));
  }

  public deleteTask(taskId: number): void {
    this.store.dispatch(taskDeletionStart({ taskId }));
  }
}
