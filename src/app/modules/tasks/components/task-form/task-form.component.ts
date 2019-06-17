import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input
} from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Watch } from 'watch-property-decorator';

import { ITaskCreationData } from 'src/app/shared/models/tasks/task.model';
import { RequestStatus } from 'src/app/shared/models/server-request.model';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskFormComponent implements OnInit {
  public readonly RequestStatus = RequestStatus;

  @Input() public requestStatus: RequestStatus;
  @Output() public submitted = new EventEmitter<ITaskCreationData>();

  public form: FormGroup;

  public constructor(private readonly formBuilder: FormBuilder) { }

  public ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required, Validators.maxLength(120)]],
      description: [null, [Validators.required]]
    });
  }

  public submitForm(): void {
    if (this.requestStatus !== RequestStatus.Pending && this.validateForm()) {
      this.submitted.emit(this.form.value);
    }
  }

  private validateForm(): boolean {
    Object.values(this.form.controls).forEach((formControl) => {
      formControl.updateValueAndValidity();
      formControl.markAsTouched();
    });

    return this.form.valid;
  }

  @Watch<TaskFormComponent>('requestStatus', { immediate: false })
  public handleRequestStatusChange(): void {
    if (this.requestStatus === RequestStatus.Success) {
      // TODO: doesn't cause values in inputs disapper
      this.form.reset();
    }
  }
}
