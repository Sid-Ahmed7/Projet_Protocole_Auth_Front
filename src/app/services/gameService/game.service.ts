import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../../models/game';
import { environment } from '../../../environments/environment.development';
import { TokenService } from '../token/token.service';
@Injectable({
  providedIn: 'root'
})
export class GameService {
  private baseUrl: string = '/games';
  private serveurBaseUrl = "http://localhost:8080/games"
  private genreUrl: string = 'genres'
  private LIMIT: number = 500;


  private headersIGDB: HttpHeaders = new HttpHeaders({
    'Client-ID': environment.apiKey,
    'Authorization': environment.apiToken,
    'Accept': 'application/json',
  });
  constructor(
    private http: HttpClient,
    private token: TokenService
  ) { }

  gameDefaultCover = '../../../assets/pictures/default_cover.png'

  getGames(): Observable<Game[]> {
    const body = `fields name,first_release_date,cover.image_id,platforms.name, genres.name; where themes != (42) & category = 0 & (platforms = (48,167)); limit ${this.LIMIT};`;
    return this.http.post<Game[]>(this.baseUrl, body, { headers: this.headersIGDB });
  }

  getGenres(): Observable<any> {
    const body = `fields name; limit ${this.LIMIT};`;
    return this.http.post<any>('/genres', body, { headers: this.headersIGDB });
  }

  getPlatforms(): Observable<any> {
    const body = `fields name; where id = (48, 167,6,169,49,130);`;
    return this.http.post<any>('/platforms', body, { headers: this.headersIGDB });
  }


  getGameByName(name: string): Observable<Game[]> {
    const body = `fields name, summary, cover.image_id, platforms.name, genres.name, artworks.image_id, screenshots.image_id, first_release_date, involved_companies.company.name; where name = "${name}"; limit 1;`;
    return this.http.post<Game[]>(this.baseUrl, body, { headers: this.headersIGDB });
  }

  getUpcomingGames(): Observable<any> {
    const currentTime = Math.floor(Date.now() / 1000);
    const body = `fields game.name,game.cover.image_id, game.genres.name, date; where region = 1  & date > ${currentTime}; sort date asc; limit 9;`;
    return this.http.post<any>('/release_dates', body, { headers: this.headersIGDB });
  }

  addGameToList(storedToken: string, gameID: any): Observable<any> {
    const params = new HttpParams()
      .set('gameId', gameID)
    const headers: HttpHeaders = new HttpHeaders({
      'Authorization': `${this.token.getToken()}`
    });;
    return this.http.post<any>(`${this.serveurBaseUrl}/add`, params, { headers: headers });

  }
  deleteGameInList(storedToken: string, gameId: number): Observable<Game[]> {
    const headers: HttpHeaders = new HttpHeaders({
      'Authorization': `${this.token.getToken()}`
    });;
    if (!gameId) {
      throw new Error('Game ID is required');
    }
    const params = new HttpParams().set('gameId', gameId);
    return this.http.delete<Game[]>(`${this.serveurBaseUrl}`, { headers: headers, params });
  }

  getListGames(): Observable<any[]> | undefined {
    const headers: HttpHeaders = new HttpHeaders({
      'Authorization': `${this.token.getToken()}`
    });;
    const tokenId = this.token.getIdInToken();
    if (tokenId) {
      const params = new HttpParams().set('user_id', tokenId);
      return this.http.get<any[]>(`${this.serveurBaseUrl}`, { headers: headers, params });
    } else {
      return undefined;
    }
  }

  getGameById(id: number): Observable<Game[]> {
    const body = `fields name, cover.image_id, genres.name, first_release_date; where id = ${id};`;
    return this.http.post<Game[]>('/games', body, { headers: this.headersIGDB });
  }

  getCoverUrl(cover: string | undefined): string {
    return cover ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${cover}.jpg` : this.gameDefaultCover;
  }

  getGenreNames(genres: string | string[]): string {
    if (!genres || !Array.isArray(genres) || genres.length === 0) {
      return '';
    } else if (genres.length === 1) {
      return genres[0];
    } else {
      return genres.join(', ');
    }
  }

  formatReleaseDate(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString();
  }

  getYear(timestamp: number): number {
    const date = new Date(timestamp * 1000);
    return date.getFullYear();
  }

}
