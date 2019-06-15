import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ITasksState } from './tasks.reducer';

const featureSelector = createFeatureSelector<ITasksState>('tasks');

export const getTasks = createSelector(featureSelector, state => state.entities);

export const getTasksFetchingStatus = createSelector(
  featureSelector,
  state => state.fetchingStatus
);

export const getTaskCreationStatus = createSelector(featureSelector, state => state.creationStatus);

export const getTasksDeletionStatuses = createSelector(
  featureSelector,
  state => state.deletionStatuses
);
