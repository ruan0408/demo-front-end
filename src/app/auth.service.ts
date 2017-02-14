import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";

@Injectable()
export class AuthService {

  constructor(private http: Http) { }

  isLoggedIn() {
    let token = localStorage.getItem('access-token');

    this.queryBackend(token).subscribe(
      isLoggedIn => {return isLoggedIn} ,
      error => console.log(error)
    );
    return false;
  }

  queryBackend(token: string) : Observable<any> {
    return this.http.get(`http://localhost:3000/auth?token=${token}`)
      .map((res : Response) => res.status == 200)
      .catch((err: Response) => Observable.throw(err));
  }
}
