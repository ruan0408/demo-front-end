import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {Observable} from "rxjs";

@Injectable()
export class UserService {

  constructor(private http: Http) { }

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
    console.log(`service login received user ${jsonUser}`);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post('http://localhost:3000/login', jsonUser, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    //TODO change the server to send the data field
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
