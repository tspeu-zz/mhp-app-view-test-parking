import { Injectable } from '@angular/core';
import { Events } from '@ionic/angular';
// import { Storage } from '@ionic/storage';ç
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  HAS_LOGGED_IN = 'hasLoggedIn';
  _data: any;

  constructor(public events: Events, public http: HttpClient) {}

  load(): any {
    if (this._data) {
      return of(this._data);
    } else {
      return this.http.get('assets/data/user.json');
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
