import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../types/login-response.type';
import { tap } from 'rxjs';
import { loginData } from '../types/loginData.type';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  baseUrl = 'https://localhost:8080/';
  constructor(private http: HttpClient) {}

  login(data: loginData) {
    return this.http.post<LoginResponse>(this.baseUrl + 'login', data).pipe(
      tap((value) => {
        sessionStorage.setItem('token', value.token);
        sessionStorage.setItem('token', value.name);
      })
    );
  }
}
