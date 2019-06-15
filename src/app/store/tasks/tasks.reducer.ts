import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { ITask } from 'src/app/shared/models/tasks/task.model';
import { RequestStatus } from 'src/app/shared/models/server-request.model';
import * as tasksActions from './tasks.actions';

export interface ITasksState extends EntityState<ITask> {
  fetchingStatus: RequestStatus;
  creationStatus: RequestStatus;
  deletionStatuses: Record<number, RequestStatus>;
}

export const adapter = createEntityAdapter<ITask>();

const initialState: ITasksState = adapter.getInitialState({
  fetchingStatus: RequestStatus.Idle,
  creationStatus: RequestStatus.Idle,
  deletionStatuses: {}
});

export const tasksReducer = createReducer(initialState,
  on(tasksActions.tasksFetchingStart, state => ({
    ...state,
    fetchingStatus: RequestStatus.Pending
  })),

  on(tasksActions.tasksFetchingSuccess, (state, { tasks }) => ({
    ...adapter.addMany(tasks, state),
    fetchingStatus: RequestStatus.Success
  })),

  on(tasksActions.tasksFetchingFailure, (state, { fetchingStatus }) => ({
    ...state,
    fetchingStatus
  })),

  on(tasksActions.taskCreationStart, state => ({
    ...state,
    creationStatus: RequestStatus.Pending
  })),

  on(tasksActions.taskCreationSuccess, (state, { task }) => ({
    ...adapter.addOne(task, state),
    creationStatus: RequestStatus.Success
  })),

  on(tasksActions.taskCreationFailure, (state, { creationStatus }) => ({
    ...state,
    creationStatus
  })),

  on(tasksActions.taskDeletionStart, (state, { taskId }) => ({
    ...state,
    deletionStatuses: { ...state.deletionStatuses, [taskId]: RequestStatus.Pending }
  })),

  on(tasksActions.taskDeletionSuccess, (state, { taskId }) => ({
    ...adapter.removeOne(taskId, state),
    deletionStatus: { ...state.deletionStatuses, [taskId]: RequestStatus.Success }
  })),

  on(tasksActions.taskDeletionFailure, (state, { taskId, deletionStatus }) => ({
    ...state,
    deletionStatuses: { ...state.deletionStatuses, [taskId]: deletionStatus }
  }))
);
