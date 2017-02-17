import { Injectable } from '@angular/core';
import { Http } from "@angular/http";

@Injectable()
export class AuthService {

  private static attemptedURL: string = '/protected';

  constructor(private http: Http) { }

  static getAttemptedURL() {
    return AuthService.attemptedURL;
  }

  static setAttemptedURL(url: string) {
    AuthService.attemptedURL = url;
  }

  isLoggedIn(): Promise<boolean> {
    let token = localStorage.getItem('access-token');

    return this.http.get(`http://localhost:3000/auth?token=${token}`)
      .toPromise()
      .then(response => response.json().isLoggedIn);
  }
}
