import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  error: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  async onLogin(event: FormGroup) {
    const {email, password} = event.value;

    try {
      await this.authService.loginUser(email, password);
      this.router.navigate(['/']);
    } catch (error) {
      // @ts-ignore
      this.error = error.message;
    }
  }
}
