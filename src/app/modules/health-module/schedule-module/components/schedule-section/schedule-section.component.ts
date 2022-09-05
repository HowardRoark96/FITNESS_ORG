import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ScheduleItem } from '../../../shared-molude/services/schedule.service';

@Component({
  selector: 'app-schedule-section',
  templateUrl: './schedule-section.component.html',
  styleUrls: ['./schedule-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleSectionComponent {
  @Input() section: ScheduleItem;
  @Input() name: string;

  @Output() select = new EventEmitter<any>();

  constructor() { }

  onSelect(type: string, assigned: any[] = []) {
    const data = this.section;

    this.select.emit({
      type,
      assigned,
      data
    });
  }
}
