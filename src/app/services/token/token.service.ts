import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";
type Token = {
  id: number;
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
  getIdInToken(): number | undefined {
    if (typeof localStorage !== 'undefined') {
      const storedToken = localStorage?.getItem('token');
      if (storedToken) {
        const decoded = jwtDecode<Token>(storedToken);
        return decoded.id;
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
        return decoded.slug;
      } else {
        return undefined;
      }
    } else {
    return undefined;
    }
  }

}
