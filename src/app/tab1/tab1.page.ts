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
  _UsersData: any;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _userService: UserService
  ) {}
  /*
  {
	  "IdUserCar": 477,
	  "car": {
	  	"IdCar": 48,
	    "Model": "AUDI 2",
	    "LicencePlate": "AAAAA"
	  },
	  "user": {
	    "id": 48,
	    "Name": "Pepe",
	    "Surname": "Loco",
	    "Email": "pepe@mail.com",
	    "Telephone": "555222"
	  }
  }
  */
  ngOnInit(): void {
    // get email form Logn component
    let emailUser = this._activatedRoute.snapshot.paramMap.get('email');
    // https://localhost:5001/api/User/email
    console.log('---> login por email- ->' + emailUser);
    this.loadData(emailUser);
    this.loadAllUsers();
  }

  loadData(email: string) {
    console.log(
      '--> environment._URL_USER_EMAIL' + environment._URL_USER_EMAIL
    );
    console.log('--> EMAIL --> ' + email);

    this._userService
      .postData(environment._URL_USER_EMAIL, JSON.stringify(email))
      .subscribe(res => {
        console.log('---> data---> ' + res);
      });
  }

  loadAllUsers() {
    // return this.getUsers().subscribe((data: {}) => {
    return this._userService
      .loadAllData('https://localhost:5001/api/User')
      .subscribe((data: {}) => {
        this._UsersData = data;
        console.log('---> data---> ' + data);
        console.log('data ads--> ', JSON.stringify(this._UsersData));
        console.dir(this._UsersData);
        console.log('_UsersData dsdasad--> ', this._UsersData);
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
