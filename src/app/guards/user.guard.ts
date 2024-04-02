import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { ApiService } from '../service/api.service';
import { map } from 'rxjs';

export const userGuard: CanActivateFn = (route, state) => {
  const loginService = inject(ApiService);

  return loginService.role$.pipe(map(role => role === 'User'));
};
