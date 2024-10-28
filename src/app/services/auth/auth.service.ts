import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = "http://localhost:8080/users";
  isLogin: boolean = false;
  isUserOnline = new BehaviorSubject<boolean>(this.isLogin);
  currentStatut = this.isUserOnline.asObservable();
  constructor(private http: HttpClient, private token: TokenService) {


  }

  login(email: string, password: string): Observable<any> {
    const body = JSON.stringify({ email, password })
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.baseUrl}/login`, body, { headers }).pipe(
      map(response => {
        if (response) {
          localStorage.setItem('token', response.token);
          this.isUserOnline.next(true);
          return response;
        }
      }))
  }

  register(username: string, email: string, password: string, confirmPassword: string): Observable<any> {
    const body = JSON.stringify({ username, email, password });
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.baseUrl}/register`, body, { headers });
  }

  logout() {
    this.isUserOnline.next(false);
    localStorage.clear();
  }

  isLoggedIn(): Observable<boolean> {
    return this.currentStatut;
  }

}
