import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedIn = true;

  constructor() { }

  isAuthenticated() {
    return this.isLoggedIn;
  }

}
