import { Component } from '@angular/core';
import { AuthRegisterComponent } from "../../../components/auth/auth-register/auth-register.component";

@Component({
  selector: 'app-register',
  imports: [AuthRegisterComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

}
