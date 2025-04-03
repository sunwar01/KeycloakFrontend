import { Component, inject } from '@angular/core';
import {JsonPipe, NgIf} from '@angular/common';
import { Router } from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [JsonPipe, NgIf],
  template: `
    <div *ngIf="!isLoggedIn">
      <h1>Welcome</h1>
      <button (click)="login()">Login with Keycloak</button>
    </div>
    <div *ngIf="isLoggedIn">
      <h1>Hello, {{ userName }}</h1>
      <p>Claims: {{ claims | json }}</p>
      <button (click)="logout()">Logout</button>
    </div>
  `,
})
export class HomeComponent {
  private router = inject(Router);
  private authService = inject(AuthService);

  login() {
    this.router.navigate(['/login']);
  }

  get isLoggedIn(): boolean {
    return !!this.authService.getAccessToken();
  }

  get userName(): string {
    return this.authService.getUserInfo()?.preferred_username || '';
  }

  get claims(): any {
    return this.authService.getUserInfo();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
