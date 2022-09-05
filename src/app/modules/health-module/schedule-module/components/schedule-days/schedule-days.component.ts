import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-schedule-days',
  templateUrl: 'schedule-days.component.html',
  styleUrls: ['schedule-days.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleDaysComponent {
  @Input() selectedDay: number;
  @Output() onChangeDay = new EventEmitter<number>();

  days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  constructor() {
  }

  selectDay(index: number) {
    this.onChangeDay.emit(index);
  }
}
