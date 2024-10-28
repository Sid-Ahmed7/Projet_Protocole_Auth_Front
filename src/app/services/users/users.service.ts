import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { UpdateUser } from '../../models/updateUser/update-user.model';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl: string = "http://localhost:8080";

  private http:HttpClient = inject(HttpClient);

  constructor() { }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users`)
  }

  getOneBySlug(slug: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${slug}`)
  }

  createUser(user:User): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, user)
  }

  updateUser(id:number, user:UpdateUser): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${id}`, user)
  }

  updateImage(id: number, user: User, type: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${id}?picture=${type}`, user)
  }

  deleteUser(id:number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${id}`)
  }

}
