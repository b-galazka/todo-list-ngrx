import { Component, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

import {
  AbstractReactiveFormFieldComponent
} from '../shared/abstracts/abstract-reactive-form-field.component';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['../shared/styles/form-field.scss', './textarea.component.scss']
})
export class TextareaComponent extends AbstractReactiveFormFieldComponent {
  @Input() public rows = 10;
  @Input() public placeholder = '';

  public constructor(public ngControl: NgControl) {
    super(ngControl);
  }
}
