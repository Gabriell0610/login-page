import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { LoginResponse } from '../types/login-response.type';
import { loginData } from '../types/loginData.type';
import { registerData } from '../types/registerData.type';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  baseUrl = 'http://localhost:8080/auth/';

  constructor(private http: HttpClient) {}

  login(data: loginData) {
    return this.http.post<LoginResponse>(this.baseUrl + 'login', data).pipe(
      tap((value) => {
        sessionStorage.setItem('token', value.token);
        sessionStorage.setItem('name', value.name);
      })
    );
  }

  register(data: registerData) {
    return this.http.post<LoginResponse>(this.baseUrl + 'register', data).pipe(
      tap((value) => {
        sessionStorage.setItem('token', value.token);
        sessionStorage.setItem('name', value.name);
      })
    )
  }
  
}
