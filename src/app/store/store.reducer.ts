import { ITasksState, tasksReducer } from './tasks/tasks.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface IAppState {
  tasks: ITasksState;
}

export const reducer: ActionReducerMap<IAppState> = {
  tasks: tasksReducer
};
