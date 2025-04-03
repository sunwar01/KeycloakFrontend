import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private accessTokenSubject = new BehaviorSubject<string | null>(null);
  private userInfoSubject = new BehaviorSubject<any>(null);



  setTokens(tokens: any) {
    this.accessTokenSubject.next(tokens.access_token);
    this.fetchUserInfo(tokens.access_token);
  }

  getAccessToken(): string | null {
    return this.accessTokenSubject.value;
  }

  getUserInfo(): any {
    return this.userInfoSubject.value;
  }

  private fetchUserInfo(accessToken: string) {
    this.http
      .get('http://localhost:5267/api/auth/userinfo', { // Changed to HTTP
        params: { accessToken },
        responseType: 'json',
      })
      .subscribe({
        next: (info) => this.userInfoSubject.next(info),
        error: (err) => console.error('User info fetch failed', err),
      });
  }

  logout() {
    this.accessTokenSubject.next(null);
    this.userInfoSubject.next(null);
  }
}
