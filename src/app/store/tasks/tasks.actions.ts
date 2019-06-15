import { createAction, props } from '@ngrx/store';

import { ITaskCreationData, ITask } from 'src/app/shared/models/tasks/task.model';
import { RequestStatus } from 'src/app/shared/models/server-request.model';

export const tasksFetchingStart = createAction('[Tasks] Fetching start');

export const tasksFetchingSuccess = createAction(
  '[Tasks] Fetching success',
  props<{ tasks: Array<ITask> }>()
);

export const tasksFetchingFailure = createAction(
  '[Tasks] Fetching failure',
  props<{ fetchingStatus: RequestStatus }>()
);

export const taskCreationStart = createAction(
  '[Tasks] Creation start',
  props<{ task: ITaskCreationData }>()
);

export const taskCreationSuccess = createAction(
  '[Tasks] Creation success',
  props<{ task: ITask }>()
);

export const taskCreationFailure = createAction(
  '[Tasks] Creation failure',
  props<{ creationStatus: RequestStatus }>()
);

export const taskDeletionStart = createAction(
  '[Tasks] Deletion start',
  props<{ taskId: number }>()
);

export const taskDeletionSuccess = createAction(
  '[Tasks] Deletion success',
  props<{ taskId: number }>()
);

export const taskDeletionFailure = createAction(
  '[Tasks] Deletion failure',
  props<{ taskId: number, deletionStatus: RequestStatus }>()
);
