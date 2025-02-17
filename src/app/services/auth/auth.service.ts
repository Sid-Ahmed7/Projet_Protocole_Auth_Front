import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { TokenService } from '../token/token.service';
// import { CookieService } from '../cookies/cookie.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = "http://localhost:8080/users";
  isLogin: boolean = false;
  isUserOnline = new BehaviorSubject<boolean>(this.isLogin);
  currentStatut = this.isUserOnline.asObservable();
  constructor(private http: HttpClient, private token: TokenService, private cookieService: CookieService) {


  }

  login(email: string, password: string): Observable<any> {
    const body = JSON.stringify({ email, password });
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
    return this.http.post<any>(`${this.baseUrl}/login`, body, { headers, withCredentials: true }).pipe(
      map(response => {
        console.log("Utilisateur connecté avec succès, le cookie JWT est configuré.");
        
        this.isUserOnline.next(true);
        return response;
      }),
      
    );
  }
  
  
  register(username: string, email: string, password: string, confirmPassword: string): Observable<any> {
    const body = JSON.stringify({ username, email, password });
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.baseUrl}/register`, body, { headers });
  }

  logout(): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/logout`, {}, { withCredentials: true }).pipe(
      map(response => {
        this.isUserOnline.next(false);
        this.cookieService.delete('jwt');
        return response;
      })
    );
  }

  isLoggedIn(): Observable<boolean> {
    return this.currentStatut;
  }

}
