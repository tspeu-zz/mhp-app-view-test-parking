import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserOptions } from '../Models/user-options';

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

  constructor(public router: Router, private http: HttpClient) {}

  ngOnInit() {}

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      //this.userData.login(this.login.name);
      // this.http.get('https://someapi.com/posts').subscribe((response) => {
      //     console.log(response);
      // });
      this.router.navigateByUrl('/app/tabs/tab1');
    }
  }

  onSignup() {
    // this.router.navigateByUrl('/signup');
    console.log('signup');
  }
}
