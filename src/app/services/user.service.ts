import { Injectable } from '@angular/core';
import { Events } from '@ionic/angular';
// import { Storage } from '@ionic/storage';ç
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  HAS_LOGGED_IN = 'hasLoggedIn';
  _data: any;
  _URL_ALL_USERS = environment._URL_ALL_USERS;
  _URL_USER_EMAIL = environment._URL_USER_EMAIL;

  constructor(public events: Events, public http: HttpClient) {}

  load(url: string): any {
    if (this._data) {
      return of(this._data);
    } else {
      return this.http.get(url);
      // .pipe(map(this.processData, this));
    }
  }

  postData(url: string, data: any): any {
    if (this._data) {
      return of(this._data);
    } else {
      return this.http.post(url, data).subscribe(res => {
        this._data = res;
        console.log(' post ' + res);
        console.log(' post ' + this._data);
        return this._data;
      });
      // .pipe(map(this.processData, this));
    }
  }

  // : Promise<any>
  signup(username: string) {
    // return this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
    //   this.setUsername(username);
    //   return this.events.publish('user:signup');
    // });
    console.log('signin');
  }
}
