import { createFeatureSelector, createSelector } from '@ngrx/store';

import { tasksFeatureKey } from './tasks.consts';
import { adapter, ITasksState } from './tasks.reducer';

const { selectAll, selectTotal } = adapter.getSelectors();
const featureSelector = createFeatureSelector<ITasksState>(tasksFeatureKey);

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
