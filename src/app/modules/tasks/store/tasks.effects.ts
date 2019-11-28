import { HttpErrorResponse, HttpResponseBase } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, first, map, mergeMap, switchMap } from 'rxjs/operators';

import { RequestStatus } from 'src/app/shared/enums/server-request.enum';
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
    switchMap(tasksAmount => this.tasksService.getTasks(tasksAmount, 25)),

    map(res =>
      tasksFetchingSuccess({
        tasks: res.data,
        allTasksFetched: !res.pagination || !res.pagination.next
      })
    ),

    catchError((err: HttpErrorResponse) =>
      of(tasksFetchingFailure({ fetchingStatus: this.determineRequestStatus(err) }))
    )
  );

  @Effect()
  public readonly taskCreationStart = this.actions$.pipe(
    ofType(taskCreationStart),
    switchMap(({ task }) => this.tasksService.createTask(task)),
    map(task => taskCreationSuccess({ task })),

    catchError((err: HttpErrorResponse) =>
      of(taskCreationFailure({ creationStatus: this.determineRequestStatus(err) }))
    )
  );

  @Effect()
  public readonly taskDeletionStart = this.actions$.pipe(
    ofType(taskDeletionStart),

    mergeMap(({ taskId }) =>
      this.tasksService.deleteTask(taskId).pipe(
        map(task => taskDeletionSuccess({ taskId: task.id })),

        catchError((err: HttpErrorResponse) =>
          of(taskDeletionFailure({ taskId, deletionStatus: this.determineRequestStatus(err) }))
        )
      )
    )
  );

  private determineRequestStatus(res: HttpResponseBase): RequestStatus {
    switch (res.status) {
      case 404:
        return RequestStatus.NotFound;

      default:
        return RequestStatus.Error;
    }
  }
}
