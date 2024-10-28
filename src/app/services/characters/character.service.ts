import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Character } from '../../models/character';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private http: HttpClient) { }

  getCharacterInfos(): Observable<Character[]> {
    return this.http.get<Character[]>('../../../assets/gameModel.json')
  }
}
