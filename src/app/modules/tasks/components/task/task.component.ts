import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { ITask } from 'src/app/shared/models/tasks/task.model';
import { RequestStatus } from 'src/app/shared/models/server-request.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskComponent {
  public readonly RequestStatus = RequestStatus;

  @Input() public task: ITask;
  @Input() public deletionStatus: RequestStatus;
  @Output() public delete = new EventEmitter<number>();
}
