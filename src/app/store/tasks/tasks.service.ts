import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { ITask, ITaskCreationData } from 'src/app/shared/models/tasks/task.model';
import { IServerResponse } from 'src/app/shared/models/server-response.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class TasksService {

  public constructor(private readonly httpClient: HttpClient) { }

  public getTasks(offset: number, limit: number): Observable<IServerResponse<Array<ITask>>> {

    const paramsObj = {
      offset: String(offset),
      limit: String(limit)
    };

    const params = new HttpParams({ fromObject: paramsObj });

    return this.httpClient
      .get<IServerResponse<Array<ITask>>>(`${environment.apiUrl}/tasks`, { params });
  }

  public deleteTask(taskId: number): Observable<ITask> {

    return this.httpClient
      .delete<IServerResponse<ITask>>(`${environment.apiUrl}/tasks/${taskId}`)
      .pipe(pluck('data'));
  }

  public createTask(data: ITaskCreationData): Observable<ITask> {

    return this.httpClient
      .post<IServerResponse<ITask>>(`${environment.apiUrl}/tasks`, { task: data })
      .pipe(pluck('data'));
  }
}
