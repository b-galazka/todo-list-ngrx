import { createAction, props } from '@ngrx/store';

import { ITask, ITaskCreationData } from 'src/app/modules/tasks/interfaces/task.interface';
import { RequestStatus } from 'src/app/shared/enums/request-status.enum';

export const tasksFetchingStart = createAction('[Tasks] Fetching start');

export const tasksFetchingSuccess = createAction(
  '[Tasks] Fetching success',
  props<{ tasks: Array<ITask>; allTasksFetched: boolean }>()
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
  props<{ taskId: string }>()
);

export const taskDeletionSuccess = createAction(
  '[Tasks] Deletion success',
  props<{ taskId: string }>()
);

export const taskDeletionFailure = createAction(
  '[Tasks] Deletion failure',
  props<{ taskId: string; deletionStatus: RequestStatus }>()
);
