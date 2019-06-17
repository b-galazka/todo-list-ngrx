import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormGroup, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';

import { TextareaComponent } from './textarea.component';

@Component({
  selector: 'app-textarea-wrapper-component',
  template: `
    <ng-container [formGroup]="form">
      <app-textarea formControlName="description"></app-textarea>
    </ng-container>
  `
})
class TextareaWrapperComponent {
  public readonly form = new FormGroup({
    description: new FormControl()
  });
}

describe('TextareaComponent', () => {
  let component: TextareaComponent;
  let wrapperComponent: TextareaWrapperComponent;
  let fixture: ComponentFixture<TextareaWrapperComponent>;
  let formControl: FormControl;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TextareaComponent,
        TextareaWrapperComponent
      ],
      imports: [ReactiveFormsModule, FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextareaWrapperComponent);
    component = fixture.debugElement.query(By.css('app-textarea')).componentInstance;
    wrapperComponent = fixture.componentInstance;
    formControl = <FormControl> wrapperComponent.form.get('description');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render textarea', () => {

    const textAreaElem: HTMLTextAreaElement = fixture.debugElement
      .query(By.css('.field')).nativeElement;

    expect(textAreaElem.type).toBe('textarea');
  });

  it('should render input with empty placeholder by default', () => {

    const textAreaElem: HTMLTextAreaElement = fixture.debugElement
      .query(By.css('.field')).nativeElement;

    expect(textAreaElem.placeholder).toBe('');
  });

  it('should render textarea with provided placeholder', () => {

    const placeholder = 'some text';

    component.placeholder = placeholder;

    fixture.detectChanges();

    const textAreaElem: HTMLTextAreaElement = fixture.debugElement
      .query(By.css('.field')).nativeElement;

    expect(textAreaElem.placeholder).toBe(placeholder);
  });

  it('should render input with 10 rows by default', () => {

    const textAreaElem: HTMLTextAreaElement = fixture.debugElement
      .query(By.css('.field')).nativeElement;

    expect(textAreaElem.rows).toBe(10);
  });

  it('should render textarea with provided amount of rows', () => {

    const rowsAmount = 30;

    component.rows = rowsAmount;

    fixture.detectChanges();

    const textAreaElem: HTMLTextAreaElement = fixture.debugElement
      .query(By.css('.field')).nativeElement;

    expect(textAreaElem.rows).toBe(rowsAmount);
  });

  it('should set textarea value of form control value', fakeAsync(() => {

    const textareaValue = 'some text';

    formControl.setValue(textareaValue);
    formControl.updateValueAndValidity();

    fixture.detectChanges();
    tick();

    const inputElem: HTMLInputElement = fixture.debugElement
      .query(By.css('.field')).nativeElement;

    expect(inputElem.value).toBe(textareaValue);
  }));

  it('should call #handleTouch() on textarea blur', () => {

    const spy = spyOn(component, 'handleTouch');
    const textareaElem = fixture.debugElement.query(By.css('.field'));

    textareaElem.triggerEventHandler('blur', new FocusEvent('blur'));

    expect(spy).toHaveBeenCalled();
  });

  it('should update control value on typing', fakeAsync(() => {

    const typedText = 'some typed text';

    const textareaElem: HTMLTextAreaElement = fixture.debugElement
      .query(By.css('.field')).nativeElement;

    textareaElem.value = typedText;
    textareaElem.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    tick();

    expect(formControl.value).toBe(typedText);
  }));
});
