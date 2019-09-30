import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserOptions } from '../Models/user-options';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginPage implements OnInit {
  login: UserOptions = {
    id: null,
    name: '',
    surname: '',
    email: '',
    telephone: '',
    idCar: null,
    model: '',
    licencePlate: ''
  };
  submitted = false;

  _user: any;

  constructor(
    public router: Router,
    private http: HttpClient,
    public _userService: UserService
  ) {}

  ngOnInit() {}

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      //this.userData.login(this.login.name);
      // this.http.get('https://someapi.com/posts').subscribe((response) => {
      //     console.log(response);
      // });
      //  TODO:
      console.log('forms es -> ' + form);
      this._userService.postData(
        this._userService._URL_USER_EMAIL,
        'pepe@mail.com'
      );
      //  FIXME:
      this.router.navigateByUrl('/app/tabs/tab1');
    }
  }

  onSignup() {
    // this.router.navigateByUrl('/signup');
    console.log('signup');
  }
}
