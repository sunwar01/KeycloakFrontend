import { Injectable, inject } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root',
})
export class OAuthConfigService {
  private oauthService = inject(OAuthService);
  private isConfigured = false;

  constructor() {
    this.configureOAuth();
  }

  private configureOAuth() {
    if (!this.isConfigured) {
      this.oauthService.configure({
        issuer: 'http://localhost:8080/realms/master',
        redirectUri: 'http://localhost:4200/callback',
        clientId: 'TestClient',
        responseType: 'code',
        scope: 'openid profile email',
        showDebugInformation: true,
        strictDiscoveryDocumentValidation: false,
      });
      this.oauthService
        .loadDiscoveryDocumentAndTryLogin()
        .then(() => {
          console.log('OAuth configured and initialized');
          this.isConfigured = true;
        })
        .catch((err) => console.error('OAuth initialization failed', err));
    }
  }

  getOAuthService(): OAuthService {
    return this.oauthService;
  }
}
