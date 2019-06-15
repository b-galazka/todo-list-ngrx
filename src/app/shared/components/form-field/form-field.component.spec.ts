import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { FormFieldComponent } from './form-field.component';

@Component({
  selector: 'app-form-field-wrapper-component',
  template: `
    <ng-container [formGroup]="form">
      <app-form-field>
        <input formControlName="name">
      </app-form-field>
    </ng-container>
  `
})
class FormFieldWrapperComponent {
  public readonly form = new FormGroup({
    name: new FormControl()
  });
}

describe('FormFieldComponent', () => {
  let component: FormFieldComponent;
  let wrapperComponent: FormFieldWrapperComponent;
  let fixture: ComponentFixture<FormFieldWrapperComponent>;
  let formControl: FormControl;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormFieldComponent, FormFieldWrapperComponent],
      imports: [ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFieldWrapperComponent);
    component = fixture.debugElement.query(By.css('app-form-field')).componentInstance;
    wrapperComponent = fixture.componentInstance;
    formControl = <FormControl> wrapperComponent.form.get('name');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redner empty label by default', () => {

    const labelElem: HTMLLabelElement = fixture.debugElement
      .query(By.css('[data-test-id="label"]')).nativeElement;

    expect(labelElem.textContent).toBe('');
  });

  it('should render provided label', () => {

    const label = 'some text';

    component.label = label;

    fixture.detectChanges();

    const labelElem: HTMLLabelElement = fixture.debugElement
      .query(By.css('[data-test-id="label"]')).nativeElement;

    expect(labelElem.textContent).toBe(label);
  });

  it('should render required error', () => {

    formControl.setValue('');
    formControl.setValidators(Validators.required);
    formControl.updateValueAndValidity();
    formControl.markAsTouched();
    fixture.detectChanges();

    const requiredErrorElem = fixture.debugElement.query(By.css('[data-test-id="required-error"]'));

    expect(requiredErrorElem).toBeTruthy();
  });

  it('should render max length error', () => {

    formControl.setValue('X'.repeat(15));
    formControl.setValidators(Validators.maxLength(10));
    formControl.updateValueAndValidity();
    formControl.markAsTouched();
    fixture.detectChanges();

    const maxLengthErrorElem = fixture.debugElement.query(
      By.css('[data-test-id="max-length-error"]')
    );

    expect(maxLengthErrorElem).toBeTruthy();
  });

  it('should not render error if it does not exist', () => {

    formControl.setValidators([]);
    formControl.updateValueAndValidity();
    formControl.markAsTouched();
    fixture.detectChanges();

    const validationError = fixture.debugElement.query(By.css('.validation-error'));

    expect(validationError).toBeFalsy();
  });
});
