import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import { ITask } from 'src/app/shared/models/tasks/task.model';
import { RequestStatus } from 'src/app/shared/models/server-request.model';
import * as tasksActions from './tasks.actions';

export interface ITasksState extends EntityState<ITask> {
  fetchingStatus: RequestStatus;
  creationStatus: RequestStatus;
  deletionStatuses: Record<number, RequestStatus>;
  allTasksFetched: boolean;
}

export const adapter = createEntityAdapter<ITask>({
  sortComparer: (a: ITask, b: ITask) => b.id - a.id
});

const initialState: ITasksState = adapter.getInitialState({
  fetchingStatus: RequestStatus.Idle,
  creationStatus: RequestStatus.Idle,
  deletionStatuses: {},
  allTasksFetched: false
});

const reducer = createReducer(initialState,
  on(tasksActions.tasksFetchingStart, state => ({
    ...state,
    fetchingStatus: RequestStatus.Pending
  })),

  on(tasksActions.tasksFetchingSuccess, (state, { tasks, allTasksFetched }) => ({
    ...adapter.addMany(tasks, state),
    fetchingStatus: RequestStatus.Success,
    allTasksFetched
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
    deletionStatuses: { ...state.deletionStatuses, [taskId]: RequestStatus.Success }
  })),

  on(tasksActions.taskDeletionFailure, (state, { taskId, deletionStatus }) => ({
    ...state,
    deletionStatuses: { ...state.deletionStatuses, [taskId]: deletionStatus }
  }))
);

export function tasksReducer(state: ITasksState, action: Action): ITasksState {
  return reducer(state, action);
}
