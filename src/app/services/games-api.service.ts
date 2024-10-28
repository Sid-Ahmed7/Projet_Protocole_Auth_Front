import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../models/games-mock';

@Injectable({
  providedIn: 'root'
})
export class GamesApiService {


  constructor(private http: HttpClient) { }

  getGamesInfos(): Observable<Game> {
    return this.http.get<Game>('../../assets/gameModel.json')
  }
}
