import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserOptions } from '../Models/user-options';
import { UserService } from '../services/user.service';

// services

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
  ) { }

  ngOnInit() { }

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      console.log('forms es -> ', form);
      console.log('forms es username-> ', form.value.username);
      console.dir(form);
      this._userService.postData(
        this._userService._URL_USER_EMAIL,
        form.value.username
      );
      let navigationExtras: NavigationExtras = {
        queryParams: {
          email: form.value.username
        }
      };

      this.router.navigate(['/app/tabs/tab1', { email: form.value.username }]);
    }
  }

  onSignup() {
    console.log('signup');
  }
}
