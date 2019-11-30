import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, first, map, mergeMap, switchMap } from 'rxjs/operators';

import { determineResponseType } from 'src/app/shared/utils/http-client.utils';
import { TasksService } from '../services/tasks.service';
import { TasksFacade } from './tasks.facade';

import {
  taskCreationFailure,
  taskCreationStart,
  taskCreationSuccess,
  taskDeletionFailure,
  taskDeletionStart,
  taskDeletionSuccess,
  tasksFetchingFailure,
  tasksFetchingStart,
  tasksFetchingSuccess
} from './tasks.actions';

@Injectable()
export class TasksEffects {
  public constructor(
    private readonly actions$: Actions,
    private readonly tasksService: TasksService,
    private readonly tasksFacade: TasksFacade
  ) {}

  @Effect()
  public readonly tasksFetchingStart = this.actions$.pipe(
    ofType(tasksFetchingStart),
    switchMap(() => this.tasksFacade.tasksAmount$.pipe(first())),
    map(tasksAmount => this.tasksService.getNextPageNumber(tasksAmount)),
    switchMap(page => this.tasksService.getTasks(page)),

    map(res =>
      tasksFetchingSuccess({
        tasks: res.data,
        allTasksFetched: res.page === res.pageCount
      })
    ),

    catchError((err: HttpErrorResponse) =>
      of(tasksFetchingFailure({ fetchingStatus: determineResponseType(err) }))
    )
  );

  @Effect()
  public readonly taskCreationStart = this.actions$.pipe(
    ofType(taskCreationStart),
    switchMap(({ task }) => this.tasksService.createTask(task)),
    map(task => taskCreationSuccess({ task })),

    catchError((err: HttpErrorResponse) =>
      of(taskCreationFailure({ creationStatus: determineResponseType(err) }))
    )
  );

  @Effect()
  public readonly taskDeletionStart = this.actions$.pipe(
    ofType(taskDeletionStart),

    mergeMap(({ taskId }) =>
      this.tasksService.deleteTask(taskId).pipe(
        map(task => taskDeletionSuccess({ taskId })),

        catchError((err: HttpErrorResponse) =>
          of(taskDeletionFailure({ taskId, deletionStatus: determineResponseType(err) }))
        )
      )
    )
  );
}
