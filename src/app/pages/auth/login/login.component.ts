import { Component, inject } from '@angular/core';
import { AuthLoginComponent } from "../../../components/auth/auth-login/auth-login.component";
import { Authentication } from '../../../core/interfaces/authentication';
import { AuthService } from '../../../core/services/auth.service';
import { Respuestas } from '../../../core/interfaces/respuestas';
import { ToastService } from '../../../core/services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [AuthLoginComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  authServices = inject(AuthService)
  toast = inject(ToastService)
  router = inject(Router)

  authentication(datos: Authentication) {
    this.authServices.login(datos).subscribe((event: Respuestas) => {
      if (event.exito) {
        //        localStorage.setItem('token', event._token as string)
        this.authServices.setStorage("token", event._token)
        this.router.navigate(['/user'])
      }
    })

  }

}
