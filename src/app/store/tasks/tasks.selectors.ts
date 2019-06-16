import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ITasksState, adapter } from './tasks.reducer';

const { selectAll, selectTotal } = adapter.getSelectors();
const featureSelector = createFeatureSelector<ITasksState>('tasks');

export const getTasks = createSelector(featureSelector, selectAll);
export const getTasksAmount = createSelector(featureSelector, selectTotal);
export const getTaskCreationStatus = createSelector(featureSelector, state => state.creationStatus);

export const getTasksFetchingStatus = createSelector(
  featureSelector,
  state => state.fetchingStatus
);

export const getTasksDeletionStatuses = createSelector(
  featureSelector,
  state => state.deletionStatuses
);

export const getAllTasksFetchedStatus = createSelector(
  featureSelector,
  state => state.allTasksFetched
);
