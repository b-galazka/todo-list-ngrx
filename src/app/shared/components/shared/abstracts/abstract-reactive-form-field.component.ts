import { ControlValueAccessor, NgControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

export type IReactiveFormFieldChangeHandler = (newValue: string) => void;
export type IReactiveFormFieldTouchHandler = () => void;

export abstract class AbstractReactiveFormFieldComponent implements ControlValueAccessor {
  public value$ = new BehaviorSubject<string>(null);
  public handleTouch: IReactiveFormFieldTouchHandler;
  private handleChange: IReactiveFormFieldChangeHandler;

  public constructor(public ngControl: NgControl) {
    if (ngControl) {
      ngControl.valueAccessor = this;
    }
  }

  public writeValue(newValue: string): void {
    this.value$.next(newValue);
  }

  public registerOnChange(fn: IReactiveFormFieldChangeHandler): void {
    this.handleChange = fn;
  }

  public registerOnTouched(fn: IReactiveFormFieldTouchHandler): void {
    this.handleTouch = fn;
  }

  public handleFieldValueChange(newValue: string): void {
    this.writeValue(newValue);
    this.handleChange(newValue);
  }
}
