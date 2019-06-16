import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError, first, mergeMap } from 'rxjs/operators';
import { HttpErrorResponse, HttpResponseBase } from '@angular/common/http';

import { TasksService } from './tasks.service';
import { TasksFacade } from './tasks.facade';
import { RequestStatus } from 'src/app/shared/models/server-request.model';

import {
  tasksFetchingStart,
  tasksFetchingSuccess,
  tasksFetchingFailure,
  taskCreationStart,
  taskCreationSuccess,
  taskCreationFailure,
  taskDeletionStart,
  taskDeletionSuccess,
  taskDeletionFailure
} from './tasks.actions';

@Injectable()
export class TasksEffects {

  public constructor(
    private readonly actions$: Actions,
    private readonly tasksService: TasksService,
    private readonly tasksFacade: TasksFacade
  ) { }

  @Effect()
  public readonly tasksFetchingStart = this.actions$.pipe(
    ofType(tasksFetchingStart),
    switchMap(() => this.tasksFacade.tasksAmount$),
    first(),
    switchMap(tasksAmount => this.tasksService.getTasks(tasksAmount, 50)),

    map(res => tasksFetchingSuccess({
      tasks: res.data,
      allTasksFetched: !res.pagination || !res.pagination.next
    })),

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

    mergeMap(({ taskId }) => this.tasksService.deleteTask(taskId).pipe(
      map(task => taskDeletionSuccess({ taskId: task.id })),

      catchError((err: HttpErrorResponse) =>
        of(taskDeletionFailure({ taskId, deletionStatus: this.determineRequestStatus(err) }))
      )
    ))
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
