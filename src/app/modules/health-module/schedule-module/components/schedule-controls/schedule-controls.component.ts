import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-schedule-controls',
  templateUrl: 'schedule-controls.component.html',
  styleUrls: ['schedule-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleControlsComponent {
  @Input() selectedDate: Date;
  @Output() moveDate = new EventEmitter<number>();

  offset = 0;

  constructor() { }

  onMoveDate(offset: number) {
    this.offset = offset;
    this.moveDate.emit(this.offset);
  }
}
