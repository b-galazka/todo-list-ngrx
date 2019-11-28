import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { ITask } from 'src/app/modules/tasks/interfaces/task.interface';
import { RequestStatus } from 'src/app/shared/enums/server-request.enum';

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
