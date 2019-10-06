import {
  Component,
  AfterViewInit,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
// import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AlertController } from '@ionic/angular';
import { Map, tileLayer, marker } from 'leaflet';
// import { HTTP } from '@ionic-native/http/ngx';
import { UserParking } from '../Models/parkins-list-models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';


// services
import { UserService } from '../services/user.service';
import { LocalStorageService } from '../services/local-storage.service';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit, AfterViewInit {
  map: Map;
  propertyList = [];
  data: any = [];
  _UsersData: any;
  _UserData: any;
  _localUserData: any;
  actionParkingColor = 'success';
  // latitude: any;
  // longitude: any;
  // enterParking = false;
  // @ViewChild('mapElement', { static: true }) mapNativeElement: ElementRef;

  // Define API
  apiURL = environment.apiURL;
  // 'http://localhost:3000/api'
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private _http: HttpClient,
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private alertController: AlertController
  ) { }

  ngOnInit(): void {
    // this.getData();
    this.presentAlertConfirm();
    this.loadAllUsers();
    this.loadLocalUser;
  }

  loadAllUsers() {
    // return this.getUsers().subscribe((data: {}) => {
    return this.userService
      .loadAllData(this.apiURL + '/parking')
      .subscribe((data: {}) => {
        this._UsersData = data;
      });
  }

  loadLocalUser(key: string) {
    this.localStorageService
      .get(key)
      .then(val => {
        this.data[key] = [];
        this.data[key] = val;
        this._localUserData = this.data;
        if (val === null) {
          this._localUserData = [];
        }
      })
      .catch(error => {
        console.log('get error for ' + key + '', error);
      });
  }

  loadAllLocalUser(key: string) {
    this.localStorageService.getAll(key).then(val => {
      this._localUserData = val;
    });
  }

  // Error handling
  // handleError(error) {
  //   let errorMessage = '';
  //   if (error.error instanceof ErrorEvent) {
  //     // Get client-side error
  //     errorMessage = error.error.message;
  //   } else {
  //     // Get server-side error
  //     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //   }
  //   // FIXME: window.alert(errorMessage);
  //   return throwError(errorMessage);
  // }

  ngAfterViewInit(): void {
    this.loadLocalUser('userdata');
    // this.map = new Map('mapId3').setView([42.35663, -71.1109], 16);

    // //tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    // tileLayer(
    //   'http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
    //   {
    //     attribution: 'edupala.com'
    //   }
    // ).addTo(this.map);

    // fetch('./assets/data.json')
    //   .then(res => res.json())
    //   .then(json => {
    //     this.propertyList = json.properties;
    //     // this.leafletMap();
    //   });
  }

  leafletMap() {
    for (const property of this.propertyList) {
      marker([property.lat, property.long])
        .addTo(this.map)
        .bindPopup(property.city)
        .openPopup();
    }
  }

  togleeColorParking(isEnter: boolean) {
    return (this.actionParkingColor = isEnter ? 'danger' : 'success');
  }
  togleeTextParking(isEnter: boolean) {
    return isEnter ? 'Entrance at: ' : 'It leaves at: ';
  }

  ionViewDidLeave() {
    this._UsersData = [];
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Message <strong>Not available in this build</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel:');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }
}
