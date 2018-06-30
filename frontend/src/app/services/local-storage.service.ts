import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable()
export class LocalStorageService {

  public static readonly email: string = LocalStorageService.getLocalStorageItem('email');

  private storageSubject= new Subject<string>();

  watchStorage(): Observable<any> {
    return this.storageSubject.asObservable();
  }

  setLocalStorageItem(key: string, value: string) {
    if(localStorage.getItem(key)==undefined || localStorage.getItem(key)!=value) {
      localStorage.removeItem(key);
      localStorage.setItem(key, value);
      this.storageSubject.next('changed');
    }
  }

  static getAuthorizationToken() {
    return localStorage.getItem('authToken');
  }

  static getEmail(){
    return localStorage.getItem('email')
  }

  static getLocalStorageItem(key: string): string {
    return localStorage.getItem(key);
  }

  clearLocalStorage() {
    localStorage.clear();
    this.storageSubject.next('deleted');
  }
}
