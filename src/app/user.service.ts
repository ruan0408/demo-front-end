import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {Observable} from "rxjs";
import {LocalStorageService} from "angular-2-local-storage";

@Injectable()
export class UserService {

  constructor(private localStorage : LocalStorageService, private http: Http) { }

  private url = 'http://localhost:3000/api/users';

  addUser(user) : Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.url, JSON.stringify(user), options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  login(user) : any {
    let jsonUser = JSON.stringify(user);

    let headers = new Headers({ 'Content-Type': 'application/json', 'X-Access-Token': 'text/plain' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post('http://localhost:3000/auth', jsonUser, options)
      .map(res => console.log(res.headers.get('X-Access-Token')))
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();

    let token = res.headers.get('X-Access-Token');

    if (token)
      localStorage.setItem('access-token', token);

    console.log("PASSOUUUU");
    console.log(body.data);
    return body || { };
  }

  private handleError (error: Response | any) {
    console.log("ERROOOOOOOOOUUU");
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
