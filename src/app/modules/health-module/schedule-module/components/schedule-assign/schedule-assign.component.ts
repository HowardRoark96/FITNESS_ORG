import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-schedule-assign',
  templateUrl: './schedule-assign.component.html',
  styleUrls: ['./schedule-assign.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleAssignComponent implements OnInit {
  @Input() section: any;
  @Input() list: any;
  @Output() update = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();

  private selected: string[] = [];

  constructor() { }

  ngOnInit() {
    this.selected = [...this.section.assigned];
  }

  getRoute(name: string) {
    return [`../${name}/new`];
  }

  exists(name: string) {
    return !!~this.selected.indexOf(name);
  }

  toggleItem(name: string) {
    if (this.exists(name))
      this.selected = this.selected.filter(item => item !== name);
    else
      this.selected = [...this.selected, name];
  }

  updateAssign() {
    this.update.emit({
      [this.section.type]: this.selected
    })
  }

  cancelAssign() {
    this.cancel.emit();
  }
}
