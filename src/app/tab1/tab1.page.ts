import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
//services
import { UserService } from '../services/user.service';
//
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _userService: UserService
  ) {}

  ngOnInit(): void {
    // this.sub = this._router.data
    // .subscribe(v => console.log(v));
    let emailUser = this._activatedRoute.snapshot.paramMap.get('email');
    // https://localhost:5001/api/User/email
    console.log('---> login por email- ->' + emailUser);
    this.loadData(emailUser);
  }

  loadData(email: string) {
    console.log(
      '--> environment._URL_USER_EMAIL' + environment._URL_USER_EMAIL
    );
    console.log('--> EMAIL --> ' + email);

    this._userService
      .postData(environment._URL_USER_EMAIL, JSON.stringify(email))
      .subscribe((data: {}) => {
        console.log('---> data---> ' + data);
      });
  }

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
