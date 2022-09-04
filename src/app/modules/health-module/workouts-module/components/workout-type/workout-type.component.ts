import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const CONTROL_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => WorkoutTypeComponent),
  multi: true
};

@Component({
  selector: 'app-workout-type',
  templateUrl: './workout-type.component.html',
  styleUrls: ['./workout-type.component.scss'],
  providers: [CONTROL_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkoutTypeComponent implements ControlValueAccessor {
  private OnChange: Function;
  private onTouch: Function;

  selectors = [
    'strength',
    'endurance'
  ];

  value: string;

  registerOnChange(fn: any): void {
    this.OnChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(value: string): void {
    if (!value)
      this.value = this.selectors[0];
    else
      this.value = value;

  }

  constructor() {
  }

  setSelector(item: string) {
    this.value = item;

    this.onTouch();
    this.OnChange(this.value);
  }
}
