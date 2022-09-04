import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-list-item',
  templateUrl: 'list-item.component.html',
  styleUrls: ['list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListItemComponent {
  @Input() item: any;
  @Output() removed = new EventEmitter<any>();

  toggled = false;


  constructor() {}

  getRoute(item: any) {
    return [`../${item.ingredients ? 'meals' : 'workouts'}/`, item.$key];
  }

  removeItem() {
    this.removed.emit(this.item);
  }

  toggle() {
    this.toggled = !this.toggled;
  }
}
