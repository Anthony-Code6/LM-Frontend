import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { ToastService } from '../services/toast.service';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastService)
  let mensaje = ''
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.error instanceof ErrorEvent) {
        // Error del lado del cliente
        //console.error('Error del lado del cliente:', error.error.message);
        return throwError(() => new Error('Error en la solicitud: ' + error.error.message));
      } else {
        // Errores del servidor
        if (error.status === 0) {
          mensaje = 'Problemas en el servidor'
        } else if (error.status === 403) {
          mensaje = 'No cuentas con la autorizacion a estos servicios'
        } else {
          // toast.danger(error.error?.mensajeError || 'Error desconocido en el servidor')
          mensaje = error.error?.mensajeError || 'Error desconocido en el servidor'
        }
      }

      toast.showError(mensaje, 'Errores del Servidor')
      return throwError(() => new Error(mensaje))
    })
  );
};
