import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { TasksFacade } from 'src/app/store/tasks/tasks.facade';
import { ITask } from 'src/app/shared/models/tasks/task.model';
import { RequestStatus } from 'src/app/shared/models/server-request.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksComponent implements OnInit {
  public readonly RequestStatus = RequestStatus;

  public constructor(public readonly tasksFacade: TasksFacade) { }

  public ngOnInit(): void {
    this.tasksFacade.fetchTasks();
  }

  public trackTasks(task: ITask): number {
    return task.id;
  }
}
