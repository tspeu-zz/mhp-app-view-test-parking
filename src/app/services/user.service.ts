import { Injectable } from '@angular/core';
import { Events } from '@ionic/angular';
// import { Storage } from '@ionic/storage';ç
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable, throwError } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class UserService {
  HAS_LOGGED_IN = 'hasLoggedIn';

  _URL_ALL_USERS = environment._URL_ALL_USERS;
  _URL_USER_EMAIL = environment._URL_USER_EMAIL;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(public events: Events, public _http: HttpClient) {}

  loadAllData(url: string): Observable<any> {
    return this._http.get<any>(url).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }
  loadDataById(url: string, id: any): Observable<any> {
    return this._http.get<any>(url + id).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  postData(url: string, data: any): Observable<any> {
    return this._http.post<any>(url, data, this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  // : Promise<any>
  signup(username: string) {
    // return this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
    //   this.setUsername(username);
    // });
    console.log('signin');
    return this.events.publish('user:signup');
  }

  // Error handling
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // FIXME: TODO: window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
