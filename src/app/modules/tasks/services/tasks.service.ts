import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CONFIG } from 'src/app/core/injection-tokens/config.token';
import { ITask, ITaskCreationData } from 'src/app/modules/tasks/interfaces/task.interface';
import { IServerPaginationResponse } from 'src/app/shared/interfaces/server-pagination-response.interface';
import { convertObjectToHttpParams } from 'src/app/shared/utils/http-client.utils';
import { config } from 'src/config';

@Injectable()
export class TasksService {
  public constructor(
    @Inject(CONFIG) private readonly appConfig: typeof config,
    private readonly httpClient: HttpClient
  ) {}

  public getTasks(page: number): Observable<IServerPaginationResponse<Array<ITask>>> {
    const params = convertObjectToHttpParams({
      limit: this.appConfig.recordsPerPage,
      page,
      sort: 'updatedAt,DESC'
    });

    return this.httpClient.get<IServerPaginationResponse<Array<ITask>>>(
      `${this.appConfig.env.apiUrl}/tasks`,
      { params }
    );
  }

  public getNextPageNumber(tasksAmount: number): number {
    return Math.ceil(tasksAmount / this.appConfig.recordsPerPage) + 1;
  }

  public createTask(data: ITaskCreationData): Observable<ITask> {
    return this.httpClient.post<ITask>(`${this.appConfig.env.apiUrl}/tasks`, data);
  }

  public deleteTask(taskId: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.appConfig.env.apiUrl}/tasks/${taskId}`);
  }
}
