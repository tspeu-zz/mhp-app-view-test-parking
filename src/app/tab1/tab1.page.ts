import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';

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
  userdata: FormGroup;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _userService: UserService,
    private fb: FormBuilder
  ) { }

  /*
car:
idCar: 1
licencePlate: ""
model: ""
idUserCar: 1
user:
email: "sdsdssd"
id: 1
name: ""
surname: ""
telephone: ""
  */

  ngOnInit(): void {
    // get email form Logn component
    let emailUser = this._activatedRoute.snapshot.paramMap.get('email');
    // https://localhost:5001/api/User/email
    console.log('---> login por email- ->' + emailUser);
    this.formUser();
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
        console.log('---> get user email---> ', res);
        console.log('---> get user vy email ---> ', JSON.stringify(res));
        console.dir(res);
        this.getDatatoForm(res);
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
  formUser() {
    this.userdata = this.fb.group({
      IdUserCar: ['', [Validators.required]],
      car: this.fb.group({
        IdCar: [''],
        Model: ['', Validators.required],
        LicencePlate: ['', Validators.required]
      }),
      user: this.fb.group({
        id: [],
        Name: ['', Validators.required],
        Surname: ['', Validators.required],
        Email: ['', Validators.required],
        Telephone: ['', Validators.required]
      })
    });
  }

  getDatatoForm(data) {
    this.userdata.get('car.IdCar').setValue(data.car.idCar);
    this.userdata.get('car.Model').setValue(data.car.model);
    this.userdata.get('car.LicencePlate').setValue(data.car.licencePlate);
    this.userdata.get('user.id').setValue(data.user.id);
    this.userdata.get('user.Name').setValue(data.user.name);
    this.userdata.get('user.Surname').setValue(data.user.surname);
    this.userdata.get('user.Email').setValue(data.user.email);
    this.userdata.get('user.Telephone').setValue(data.user.telephone);
    this.userdata.get('IdUserCar').setValue(data.idUserCar);
    this

  }

  onSubmit() {
    console.log(this.userdata.value, this.userdata.valid);

    console.log('< -- enviado este valore --> ', this.userdata.value);
    console.log('y es valido ', this.userdata.valid);
    // TODO:
    this.save(JSON.stringify(this.userdata.value));
  }

  save(data: any) {
    console.log('salvabdio la data to db -->' + data);
    return this._userService.postData('https://localhost:5001/api/User', data)
      .subscribe(res => console.log('DATA SEND ', res),
        err => {
          console.log('****ERROR AL SEND DATA TO https://localhost:5001/api/User ', data);
          console.log('****ERROR AL SEND DAATA ---> ', err);
        });
  }

  onLogout() {
    this._router.navigateByUrl('/login');
    console.log('logout');
  }
}
