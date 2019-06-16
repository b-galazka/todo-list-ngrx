import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError, first } from 'rxjs/operators';

import { TasksService } from './tasks.service';
import { TasksFacade } from './tasks.facade';
import { RequestStatus } from 'src/app/shared/models/server-request.model';

import {
  tasksFetchingStart,
  tasksFetchingSuccess,
  tasksFetchingFailure,
  taskCreationStart,
  taskCreationSuccess,
  taskCreationFailure
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
    catchError(() => of(tasksFetchingFailure({ fetchingStatus: RequestStatus.Error })))
  );

  @Effect()
  public readonly taskCreationStart = this.actions$.pipe(
    ofType(taskCreationStart),
    switchMap(({ task }) => this.tasksService.createTask(task)),
    map(task => taskCreationSuccess({ task })),
    catchError(() => of(taskCreationFailure({ creationStatus: RequestStatus.Error })))
  );
}
