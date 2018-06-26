import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable()
export class LocalStorageService {

  public static readonly currentUserToken: string = LocalStorageService.getLocalStorageItem('currentUserToken');
  public static readonly email: string = LocalStorageService.getLocalStorageItem('email');

  private storageSubject= new Subject<string>();

  watchStorage(): Observable<any> {
    return this.storageSubject.asObservable();
  }

  setLocalStorageItem(key: string, value: string) {
    if(localStorage.getItem(key)==undefined || localStorage.getItem(key)!=value) {
      localStorage.setItem(key, value);
      this.storageSubject.next(key);
    }
  }

  static getAuthorizationToken() {
    return localStorage.getItem(this.currentUserToken);
  }

  static getLocalStorageItem(key: string): string {
    return localStorage.getItem(key);
  }

  clearLocalStorage() {
    localStorage.clear();
    this.storageSubject.next('deleted');
  }
}
