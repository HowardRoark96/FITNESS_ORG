import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../auth/shared/services/auth.service';

@Component({
  selector: 'app-header',
  styleUrls: ['header.component.scss'],
  templateUrl: 'header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Input() user: User | null;
  @Output() logout = new EventEmitter<any>();

  constructor() { }

  onLogoutUser() {
    this.logout.emit();
  }
}
