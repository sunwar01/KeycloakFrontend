import { TestBed } from '@angular/core/testing';

import { OauthConfigService } from './oauth-config.service';

describe('OauthConfigService', () => {
  let service: OauthConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OauthConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
