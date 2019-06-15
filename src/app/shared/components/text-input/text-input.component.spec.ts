import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormGroup, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';

import { TextInputComponent } from './text-input.component';

@Component({
  selector: 'app-text-input-wrapper-component',
  template: `
    <ng-container [formGroup]="form">
      <app-text-input formControlName="name"></app-text-input>
    </ng-container>
  `
})
class TextInputWrapperComponent {
  public readonly form = new FormGroup({
    name: new FormControl()
  });
}

describe('TextInputComponent', () => {
  let component: TextInputComponent;
  let wrapperComponent: TextInputWrapperComponent;
  let fixture: ComponentFixture<TextInputWrapperComponent>;
  let formControl: FormControl;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TextInputComponent,
        TextInputWrapperComponent
      ],
      imports: [ReactiveFormsModule, FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextInputWrapperComponent);
    component = fixture.debugElement.query(By.css('app-text-input')).componentInstance;
    wrapperComponent = fixture.componentInstance;
    formControl = <FormControl> wrapperComponent.form.get('name');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render input of type text by default', () => {

    const inputElem: HTMLInputElement = fixture.debugElement
      .query(By.css('.field')).nativeElement;

    expect(inputElem.type).toBe('text');
  });

  it('should render input of provided type', () => {

    const inputType = 'email';

    component.type = inputType;

    fixture.detectChanges();

    const inputElem: HTMLInputElement = fixture.debugElement
      .query(By.css('.field')).nativeElement;

    expect(inputElem.type).toBe(inputType);
  });

  it('should render input with empty placeholder by default', () => {

    const inputElem: HTMLInputElement = fixture.debugElement
      .query(By.css('.field')).nativeElement;

    expect(inputElem.placeholder).toBe('');
  });

  it('should render input with provided placeholder', () => {

    const placeholder = 'some text';

    component.placeholder = placeholder;

    fixture.detectChanges();

    const inputElem: HTMLInputElement = fixture.debugElement
      .query(By.css('.field')).nativeElement;

    expect(inputElem.placeholder).toBe(placeholder);
  });

  it('should set input value of form control value', fakeAsync(() => {

    const inputValue = 'some text';

    formControl.setValue(inputValue);
    formControl.updateValueAndValidity();

    fixture.detectChanges();
    tick();

    const inputElem: HTMLInputElement = fixture.debugElement
      .query(By.css('.field')).nativeElement;

    expect(inputElem.value).toBe(inputValue);
  }));

  it('should call #handleTouch() on input blur', () => {

    const spy = spyOn(component, 'handleTouch');
    const inputElem = fixture.debugElement.query(By.css('.field'));

    inputElem.triggerEventHandler('blur', new FocusEvent('blur'));

    expect(spy).toHaveBeenCalled();
  });

  it('should update control value on typing', fakeAsync(() => {

    const typedText = 'some typed text';

    const inputElem: HTMLInputElement = fixture.debugElement
      .query(By.css('.field')).nativeElement;

    inputElem.value = typedText;
    inputElem.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    tick();

    expect(formControl.value).toBe(typedText);
  }));
});
