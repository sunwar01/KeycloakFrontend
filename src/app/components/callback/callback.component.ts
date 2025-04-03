import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';


@Component({
  selector: 'app-callback',
  standalone: true,
  template: '',
})
export class CallbackComponent {
  private router = inject(Router);
  private authService = inject(AuthService);

  constructor() {
    this.handleCallback();
  }

  private handleCallback() {
    const urlParams = new URLSearchParams(window.location.search);
    const tokens = urlParams.get('tokens');
    if (tokens) {
      const parsedTokens = JSON.parse(decodeURIComponent(tokens));
      this.authService.setTokens(parsedTokens);
      this.router.navigate(['/']);
    } else {
      console.error('No tokens received');
      this.router.navigate(['/']);
    }
  }
}
