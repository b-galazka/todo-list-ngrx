import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { TasksFacade } from 'src/app/store/tasks/tasks.facade';
import { RequestStatus } from 'src/app/shared/models/server-request.model';
import { listSlideInOut } from './tasks.animations';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [listSlideInOut]
})
export class TasksComponent implements OnInit {
  public readonly RequestStatus = RequestStatus;

  public constructor(public readonly tasksFacade: TasksFacade) { }

  public ngOnInit(): void {
    this.tasksFacade.fetchTasks();
  }
}
