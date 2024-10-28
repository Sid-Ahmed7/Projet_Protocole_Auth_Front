import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private gameApi = '';

  constructor(private http: HttpClient) { }

  getComments(gameId: string): Observable<any>{
    return this.http.get(`${this.gameApi}/comments/${gameId}`)
  }

  addComment(gameId: string, comment: string): Observable<any>{
    return this.http.post(`${this.gameApi}/comments/${gameId}`, {comment})
  }

  deleteComment(gameId: string, commentId: string): Observable<any>{
    return this.http.delete(`${this.gameApi}/comments/${gameId}/${commentId}`)
  }
}
