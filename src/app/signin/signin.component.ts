import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation
} from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { AlertController } from '@ionic/angular';
import { UserOptions } from 'src/models/user-options';

//import { UserData } from '../../providers/user-data';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninPage implements OnInit {
  signup: UserOptions = {
    Name: '',
    Surname: '',
    Email: '',
    Telephone: '',
    Model: '',
    LicencePlate: ''
  };
  submitted = false;
  constructor(public alertCtrl: AlertController, public router: Router) {}

  ngOnInit() {}

  getUsername() {
    // this.userData.getUsername().then(username => {
    //   this.username = username;
    // });
    // TODO:
    console.log('getUserName');
  }

  onSignup(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      // this.userData.signup(this.signup.username);
      // TODO:
      console.log('signin OK');
      this.router.navigateByUrl('/app/tabs/tab1');
    }
  }

  logout() {
    // this.userData.logout();
    // this.router.navigateByUrl('/login');
    console.log('log out');
  }
}
