import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { UpdateUser } from '../../models/updateUser/update-user.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl: string = "http://localhost:8080";

  private http:HttpClient = inject(HttpClient);

  constructor(private cookieService: CookieService) { }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users`)
  }

  getOneBySlug(uuid: string): Observable<any> {
    console.log("UUID envoyé à l'API:", uuid); 
    return this.http.get(`${this.apiUrl}/users/profile/${uuid}`, { withCredentials: true });
  }
  

  createUser(user:User): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, user)
  }

  updateUser(uuid:string, user:UpdateUser): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/edit/${uuid}`, user, { withCredentials: true })
  }

  updateImage(uuid: string, user: User, type: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${uuid}?picture=${type}`, user, { withCredentials: true })
  }

  deleteUser(uuid:string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${uuid}`, { withCredentials: true })
  }

}
