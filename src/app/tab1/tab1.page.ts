import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { ToastController } from '@ionic/angular';
//services
import { UserService } from '../services/user.service';
import { LocalStorageService } from '../services/local-storage.service';

//
import { environment } from 'src/environments/environment';
import { TransientService } from '../services/transient.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, AfterViewInit {
  _UsersData: any;
  userdata: FormGroup;
  _tempUserData: any;
  _tempUserDataOut: any;
  datain: any;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _userService: UserService,
    private fb: FormBuilder,
    private toastController: ToastController,
    private localStorageService: LocalStorageService,
    private transientService: TransientService
  ) { }

  ngOnInit(): void {
    // get email form Logn component
    this.formUser();
    // this.loadAllUsers();
    let emailUser = this._activatedRoute.snapshot.paramMap.get('email');
    console.log('---> login por email- ->' + emailUser);
    if (emailUser === null) {
      this.getAllLocalData('tempUserdata');
      console.log('----> get from component---> ', this._tempUserData);
      this.datain = this.transientService.getDataOut();
      console.log('transientService--> data in' + JSON.stringify(this.datain));
      this.loadData(this.datain.user.email);
    } else {
      this.loadData(emailUser);

    }
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');


  }

  // https://localhost:5001/api/User/email
  loadData(email: string) {
    console.log('--> environment._URL_USER_EMAIL'
      + environment._URL_USER_EMAIL);
    console.log('--> EMAIL --> ' + email);

    this._userService
      .postData(environment._URL_USER_EMAIL, JSON.stringify(email))
      .subscribe(res => {
        console.log('---> get user email---> ', res);
        console.log('---> get user vy email ---> ', JSON.stringify(res));
        console.dir(res);
        this._tempUserDataOut = res;
        this.transientService.setDataOut(res);
        console.log('---> transientService OUT->', res);
        this.saveTemptoLocalNew('tempUserdata', JSON.stringify(res));
        // this.saveTemptoLocalNew('tempUserdata  this._tempUserDataOut --> ', this._tempUserDataOut);

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
        Model: ['', [Validators.required]],
        LicencePlate: ['', [Validators.required, Validators.minLength(6)]]
      }),
      user: this.fb.group({
        id: [],
        Name: ['', [Validators.required]],
        Surname: ['', [Validators.required]],
        Email: ['', Validators.required],
        Telephone: ['', [Validators.required]]
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
      .subscribe(res => {
        console.log('DATA SEND ', res);
        // this.saveTemptoLocal(res);
        this.saveTemptoLocalNew('tempUserdata', res);
        this.presentToast('Save to te DB OK >' + JSON.stringify(data));
      },
        err => {
          console.log('****ERROR AL SEND DATA TO https://localhost:5001/api/User ', data);
          console.log('****ERROR AL SEND DAATA ---> ', err);
          this.presentToast('Save to te DB KO ' + err);
        });
  }

  onLogout() {
    this._router.navigateByUrl('/login');
    console.log('logout');
  }

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: `${mensaje}, Have a nice day!  =)`,
      duration: 2500
    });
    toast.present();
  }

  // saveTemptoLocal(temp: any) {
  //   this.localStorageService.set('tempUserdata', JSON.stringify(temp));
  // }
  saveTemptoLocalNew(key, temp) {
    this.localStorageService.setData(key, temp);
  }

  getTempDataNew(key) {
    //TODO IFemail is null this tempdata
    this.localStorageService.getData(key);
  }

  getAllLocalData(key: string) {
    this._tempUserData = this.localStorageService.getAll(key)
    console.log('--recibe --> -----> get allData ----->', key);
  }

  ionViewDidLeave() {
    this.saveTemptoLocalNew('tempUserdata', this._tempUserDataOut);
    console.log('saliendo de USER - salva data temp', this._tempUserDataOut);
    this.transientService.setDataOut(this._tempUserDataOut);
    console.log('---> transientService OUT->', this._tempUserDataOut);
  }

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
}
