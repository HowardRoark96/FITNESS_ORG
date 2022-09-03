import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html'
})
export class RegisterComponent {
  error: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  async onRegister(event: FormGroup) {
    const {email, password} = event.value;

    try {
      await this.authService.createUser(email, password);
      this.router.navigate(['/']);
    } catch (error) {
      // @ts-ignore
      this.error = error.message;
    }
  }
}
