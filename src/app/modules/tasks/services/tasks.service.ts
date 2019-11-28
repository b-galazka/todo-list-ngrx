import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { ITask, ITaskCreationData } from 'src/app/modules/tasks/interfaces/task.interface';
import { IServerResponse } from 'src/app/shared/interfaces/server-response.interface';
import { environment } from 'src/environments/environment';

@Injectable()
export class TasksService {
  public constructor(private readonly httpClient: HttpClient) {}

  public getTasks(offset: number, limit: number): Observable<IServerResponse<Array<ITask>>> {
    const paramsObj = {
      offset: String(offset),
      limit: String(limit)
    };

    const params = new HttpParams({ fromObject: paramsObj });

    return this.httpClient.get<IServerResponse<Array<ITask>>>(`${environment.apiUrl}/tasks`, {
      params
    });
  }

  public createTask(data: ITaskCreationData): Observable<ITask> {
    return this.httpClient
      .post<IServerResponse<ITask>>(`${environment.apiUrl}/tasks`, { task: data })
      .pipe(pluck('data'));
  }

  public deleteTask(taskId: number): Observable<ITask> {
    return this.httpClient
      .delete<IServerResponse<ITask>>(`${environment.apiUrl}/tasks/${taskId}`)
      .pipe(pluck('data'));
  }
}
