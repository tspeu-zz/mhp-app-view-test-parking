import {
  Component,
  AfterViewInit,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
// import { Geolocation } from '@ionic-native/geolocation/ngx';
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
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    console.log('enter ngOnInit');
    // this.getData();
    this.loadAllUsers();
    this.loadLocalUser;
  }

  loadAllUsers() {
    // return this.getUsers().subscribe((data: {}) => {
    return this.userService
      .loadAllData(this.apiURL + '/parking')
      .subscribe((data: {}) => {
        this._UsersData = data;
        console.log('---> data---> ' + data);
        console.log('data ads--> ', JSON.stringify(this._UsersData));
        console.dir(this._UsersData);
        console.log('_UsersData dsdasad--> ', this._UsersData);
      });
  }

  loadLocalUser(key: string) {
    this.localStorageService
      .get(key)
      .then(val => {
        console.log('<--------get --------> ' + key + ' ', val);
        this.data[key] = [];
        this.data[key] = val;
        console.log('<--- desde local get datos---> ' + this.data);
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
      console.log('-----------> get allData-->' + val);
      console.log('------------> get allData-->' + this._localUserData);
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
    console.log('enter ngAfterViewInit');
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
    console.log('-->isEnter -> ', isEnter);
    return (this.actionParkingColor = isEnter ? 'danger' : 'success');
  }
  togleeTextParking(isEnter: boolean) {
    // console.log('-->isEnter -> ', isEnter);
    return isEnter ? 'Entrance at: ' : 'It leaves at: ';
  }

  ionViewDidLeave() {
    this._UsersData = [];
  }
}
