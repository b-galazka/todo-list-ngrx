import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of, Observable } from 'rxjs';
import { switchMap, map, catchError, first, mergeMap } from 'rxjs/operators';

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
import { HttpErrorResponse } from '@angular/common/http';
import { TypedAction } from '@ngrx/store/src/models';

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
    catchError(() => of(tasksFetchingFailure({ fetchingStatus: RequestStatus.Error })))
  );

  @Effect()
  public readonly taskCreationStart = this.actions$.pipe(
    ofType(taskCreationStart),
    switchMap(({ task }) => this.tasksService.createTask(task)),
    map(task => taskCreationSuccess({ task })),
    catchError(() => of(taskCreationFailure({ creationStatus: RequestStatus.Error })))
  );

  @Effect()
  public readonly taskDeletionStart = this.actions$.pipe(
    ofType(taskDeletionStart),
    mergeMap(
      ({ taskId }) => this.tasksService.deleteTask(taskId).pipe(
        map(task => taskDeletionSuccess({ taskId: task.id })),
        catchError((err: HttpErrorResponse) => this.handleTaskDeletionFailure(err, taskId)
      ))
    )
  );

  private handleTaskDeletionFailure(
    res: HttpErrorResponse,
    taskId: number
  ): Observable<TypedAction<any>> {

    const deletionStatus = res.status === 404 ? RequestStatus.NotFound : RequestStatus.Error;

    return of(taskDeletionFailure({ taskId, deletionStatus }));
  }
}
