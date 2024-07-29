import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { LoginService } from '../../service/login.service';
import { registerData } from '../../types/registerData.type';

interface RegisterForm {
  name: string,
  email:string,
  password:string,
  passwordConfirm: string
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent,
  ],
  providers: [LoginService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})

export class RegisterComponent {
  registerForm!: FormGroup;

  constructor(
    private router: Router,
    private serviceLogin: LoginService,
    private toastr: ToastrService
  ) {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.min(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      passwordConfirm: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  submit() {
    const data: registerData = this.registerForm.value;
    this.serviceLogin.register(data).subscribe({
      next: () => {
        this.toastr.success('cadastro feito com sucesso')
        this.router.navigate(["/login"])
      },
      error: () => this.toastr.error('Error inesperado'),
    });
  }

  navigate() {
    this.router.navigate(['/login']);
  }
}
