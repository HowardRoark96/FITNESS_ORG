import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  styleUrls: ['nav.component.scss'],
  templateUrl: 'nav.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavComponent {

  constructor() { }
}
