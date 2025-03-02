import { Component, inject, output } from '@angular/core';
import { Register } from '../../../core/interfaces/authentication';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastService } from '../../../core/services/toast.service';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from "../../../shared/components/button/button.component";
import { CardComponent } from "../../../shared/components/card/card.component";

@Component({
  selector: 'app-auth-register',
  imports: [ReactiveFormsModule, RouterLink, ButtonComponent, CardComponent],
  templateUrl: './auth-register.component.html',
  styleUrl: './auth-register.component.scss'
})
export class AuthRegisterComponent {
  register = output<Register>()
  formulario!: FormGroup
  form = inject(FormBuilder)
  toast = inject(ToastService)

  constructor() {
    this.formulario = this.form.group({
      nombre: this.form.control('', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]),
      apellido: this.form.control('', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]),
      email: this.form.control('', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
      password: this.form.control('', [Validators.required])
    })
  }

  sendRegister() {
    if (this.formulario.valid) {
      let registro: Register = {
        nombre: this.formulario.controls['nombre'].value,
        apellido: this.formulario.controls['apellido'].value,
        email: this.formulario.controls['email'].value,
        password: this.formulario.controls['password'].value
      }

      this.register.emit(registro)
    } else {
      this.toast.showError('Debes completar el formulario.', 'Error')
    }
  }

}
