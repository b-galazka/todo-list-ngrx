import { Component, Input, ContentChild } from '@angular/core';
import { NgControl } from '@angular/forms';

// TODO: OnPush?

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss']
})
export class FormFieldComponent {

  @Input() public label = '';
  @ContentChild(NgControl, { static: true }) public ngControl: NgControl;

  public get errorType(): string {
    return Object.keys(this.ngControl.errors)[0];
  }

  public get errorDetails(): any {
    return this.ngControl.errors[this.errorType];
  }
}
