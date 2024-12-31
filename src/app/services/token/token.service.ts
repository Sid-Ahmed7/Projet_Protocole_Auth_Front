import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";
type Token = {
  uuid: string;
  sub: string;
  iat: number;
  exp: number;
  slug: string;
}

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  getToken(): string | undefined {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('token') || undefined;
    }
    return undefined;
  }
  deleteToken(): void {
    localStorage.removeItem('token');
  }
  getIdInToken(): string | undefined {
    if (typeof localStorage !== 'undefined') {
      const storedToken = localStorage?.getItem('token');
      if (storedToken) {
        const decoded = jwtDecode<Token>(storedToken);
        return decoded.uuid;
      } else {
        return undefined;
      }
    } else {
    return undefined;
    }
  }

  getSlugInToken(): string | undefined {
    if (typeof localStorage !== 'undefined') {
      const storedToken = localStorage?.getItem('token');
      if (storedToken) {
        const decoded = jwtDecode<Token>(storedToken);
        return decoded.uuid;
      } else {
        return undefined;
      }
    } else {
    return undefined;
    }
  }

}
