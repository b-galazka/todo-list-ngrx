import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import {
  getAllTasksFetchedStatus,
  getTaskCreationStatus,
  getTasks,
  getTasksAmount,
  getTasksDeletionStatuses,
  getTasksFetchingStatus
} from './tasks.selectors';

import { ITaskCreationData } from 'src/app/modules/tasks/interfaces/task.interface';
import { taskCreationStart, taskDeletionStart, tasksFetchingStart } from './tasks.actions';
import { ITasksState } from './tasks.reducer';

@Injectable()
export class TasksFacade {
  public readonly tasks$ = this.store.pipe(select(getTasks));
  public readonly tasksFetchingStatus$ = this.store.pipe(select(getTasksFetchingStatus));
  public readonly taskCreationStatus$ = this.store.pipe(select(getTaskCreationStatus));
  public readonly tasksDeletionStatuses$ = this.store.pipe(select(getTasksDeletionStatuses));
  public readonly allTasksFetchedStatus$ = this.store.pipe(select(getAllTasksFetchedStatus));
  public readonly tasksAmount$ = this.store.pipe(select(getTasksAmount));

  public constructor(private readonly store: Store<ITasksState>) {}

  public fetchTasks(): void {
    this.store.dispatch(tasksFetchingStart());
  }

  public createTask(task: ITaskCreationData): void {
    this.store.dispatch(taskCreationStart({ task }));
  }

  public deleteTask(taskId: string): void {
    this.store.dispatch(taskDeletionStart({ taskId }));
  }
}
