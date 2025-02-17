import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const notAuthenticationGuard: CanActivateFn = (route, state) => {
  if (!inject(AuthService).isLoggeIn()) {
    return true
  }
  inject(Router).navigate(['/user'])
  return false
};
