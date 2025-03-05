import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const service = inject(AuthService)
  const token = service.getStorage('token')

  const cloneRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  })

  return next(cloneRequest);
};
