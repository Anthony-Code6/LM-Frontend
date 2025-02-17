import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const rolesGuard: CanActivateFn = (route, state) => {
  const rol = route.data['roles'] as string[]
  const authService = inject(AuthService)
  // const rolService = inject(RolesService)
  const router = inject(Router)

  // Rol del usuario autenticado
  const userRol = authService.getRol()
  
  // Todos los roles llamados de la api
  //const roles = rolService.getRoles()

  if (!authService.isLoggeIn()) {
    router.navigate(['/'])
    return false
  }

  if (rol.some((rols) => userRol?.includes(rols))) {
    return true
  }

  return false;
};
