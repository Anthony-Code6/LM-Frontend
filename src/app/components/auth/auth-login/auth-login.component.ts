import { Component, Inject, inject, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Authentication } from '../../../core/interfaces/authentication';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastService } from '../../../core/services/toast.service';
import { ButtonComponent } from "../../../shared/components/button/button.component";
import { CardComponent } from "../../../shared/components/card/card.component";

@Component({
  selector: 'app-auth-login',
  imports: [RouterLink, ReactiveFormsModule, ButtonComponent, CardComponent],
  templateUrl: './auth-login.component.html',
  styleUrl: './auth-login.component.scss'
})
export class AuthLoginComponent {
  login = output<Authentication>()

  formulario!: FormGroup
  form = inject(FormBuilder)

  toast = inject(ToastService)

  constructor() {
    this.formulario = this.form.group({
      email: this.form.control('', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
      password: this.form.control('', [Validators.required])
    })
  }

  sendLogin() {
    if (this.formulario.valid) {
      const login: Authentication = {
        email: this.formulario.controls['email'].value,
        password: this.formulario.controls['password'].value
      }
      this.login.emit(login)
    }else{
      this.toast.showError('Debes completar el formulario.','Error')
    }
  }
}
