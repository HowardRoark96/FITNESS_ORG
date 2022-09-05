import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { ScheduleItem, ScheduleList } from '../../../shared-molude/services/schedule.service';

@Component({
  selector: 'app-schedule-calendar',
  templateUrl: 'schedule-calendar.component.html',
  styleUrls: ['schedule-calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleCalendarComponent implements OnChanges {
  @Input()
  set date(date: Date | null) {
    if (date)
      this.selectedDay = new Date(date.getTime());
  }
  @Input() items: ScheduleList | null;
  @Output() change = new EventEmitter<Date>();
  @Output() select = new EventEmitter<any>();

  selectedDayIndex: number;
  selectedWeek: Date;
  selectedDay: Date;

 sections = [
   { key: 'morning', name: 'Morning' },
   { key: 'lunch', name: 'Lunch' },
   { key: 'evening', name: 'Evening' },
   { key: 'snacks', name: 'Snacks' }
 ];

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.selectedDayIndex = this.getToday(this.selectedDay);
    this.selectedWeek = this.getStartOfWeek(new Date(this.selectedDay));
  }

  getSection(name: string): ScheduleItem {
    return this.items && this.items[name] || {};
  }

  changeDate(offset: number) {
    const startOfWeek = this.getStartOfWeek(new Date());
    const startDate = new Date(startOfWeek.getFullYear(),startOfWeek.getMonth(), startOfWeek.getDate());

    startDate.setDate(startDate.getDate() + (offset * 7));

    this.change.emit(startDate);
  }

  changeDay(index: number) {
    const selectedDay = new Date(this.selectedWeek);

    selectedDay.setDate(selectedDay.getDate() + index);

    this.change.emit(selectedDay);
  }

  selectSection({type, assigned, data}: any, section: string) {
    const day = this.selectedDay;

    this.select.emit({
      type,
      assigned,
      section,
      day,
      data
    });
  }

  private getToday(date: Date) {
    let today = date.getDay() - 1;

    if (today < 0)
      today = 6;

    return today;
  }

  private getStartOfWeek(date: Date) {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);

    return new Date(date.setDate(diff));
  }
}
