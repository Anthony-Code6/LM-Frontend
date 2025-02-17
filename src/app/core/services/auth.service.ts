import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode'
import { Authentication } from '../interfaces/authentication';
import { Observable } from 'rxjs';
import { Respuestas } from '../interfaces/respuestas';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private endPoint: string = environment.urlLegionMastes + 'auth/'
  private  http = inject(HttpClient)

  login(datos: Authentication): Observable<Respuestas> {
    return this.http.post<Respuestas>(this.endPoint + 'auth-login', datos)
  }



  isLoggeIn() {
    const token = this.getToken()
    if (!token) return false

    return !this.isTokenExpired()
  }

  private isTokenExpired() {
    const token = this.getToken()
    if (!token) return true

    const decode = jwtDecode(token)
    const isTokenExpired = Date.now() >= decode['exp']! * 1000
    if (isTokenExpired) this.logout()

    return isTokenExpired
  }

  getUserDetail() {
    const token = this.getToken()
    if (!token) return null

    const decodeToken: any = jwtDecode(token)
    const userDetail = {
      id: decodeToken.sub,
      name: decodeToken.nombre,
      fullname: decodeToken.nombre + ' ' + decodeToken.apellido,
      email: decodeToken.email,
      rol: decodeToken.role
    }
    return userDetail
  }
  getRol() {
    const token = this.getToken()
    if (!token) return null

    const decodeToken: any = jwtDecode(token)
    return decodeToken.role as string
  }

  logout() {
    localStorage.removeItem('token')
  }

  private getToken() {
    return localStorage.getItem('token')
  }

}

