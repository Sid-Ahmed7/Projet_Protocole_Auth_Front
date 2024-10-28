import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  private storageSub= new Subject<String>();

  watchStorage(): Observable<any> {
    return this.storageSub.asObservable();
  }

  // Set a value in local storage
  setValue(key: string, value: string): void {
    localStorage.setItem(key, value);
    this.storageSub.next(value);
  }

  // Get a value from local storage
  getValue(key: string): string | null {
    return localStorage.getItem(key);
  }

  // Remove a value from local storage
  removeValue(key: string): void {
    localStorage.removeItem(key);
    this.storageSub.next('removed');
  }

  // Clear all items from local storage
  clear(): void {
    localStorage.clear();
  }
}
