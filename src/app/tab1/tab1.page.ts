import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  constructor(private _router: Router) {}

  save() {
    console.log('save');
  }
  /* this.http.get('https://someapi.com/posts').subscribe((response) => {
    console.log(response);
});*/
  onLogout() {
    this._router.navigateByUrl('/login');
    console.log('logout');
  }
}
