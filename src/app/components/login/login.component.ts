import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  template: '',
})
export class LoginComponent {
  constructor() {
    window.location.href = 'http://localhost:5267/api/auth/login'; // Changed to HTTP
  }
}
