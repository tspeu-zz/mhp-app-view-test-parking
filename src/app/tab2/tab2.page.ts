import {
  Component,
  AfterViewInit,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { environment } from 'src/environments/environment';
import { ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { UserParking } from '../Models/parkins-list-models';

declare var google;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit, AfterViewInit {
  latitude: any;
  longitude: any;

  enterParking: boolean;
  actionParkingColor = 'light';
  showloadingMap = false;

  _userParking: UserParking;

  @ViewChild('mapElement') mapNativeElement: ElementRef;

  constructor(
    private geolocation: Geolocation,
    private toastController: ToastController,
    private http: HttpClient
  ) {}

  ngOnInit() {
    console.log('ngOnInit');
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');

    this.showloadingMap = true;
    /* */
    this.geolocation
      .getCurrentPosition()
      .then(resp => {
        this.latitude = resp.coords.latitude;
        this.longitude = resp.coords.longitude;
        const map = new google.maps.Map(this.mapNativeElement.nativeElement, {
          center: { lat: this.latitude, lng: this.longitude },
          zoom: 16
        });
        const infoWindow = new google.maps.InfoWindow();
        const pos = {
          lat: this.latitude,
          lng: this.longitude
        };
        infoWindow.setPosition(pos);
        infoWindow.setContent('Test Parking found here!');
        infoWindow.open(map);
        map.setCenter(pos);
        this.showloadingMap = false;
      })
      .catch(error => {
        this.showloadingMap = false;
        console.log('Error getting location', error);
      });
  }

  onParkingAction() {
    this.enterParking = !this.enterParking;
    console.log('entra al parking ' + !this.enterParking);
    this.actionParkingColor = this.enterParking ? 'danger' : 'success';
    this._userParking = {
      idUser: 1,
      text: 'test from app',
      idParking: 1,
      location: {
        coordinates: { lat: this.latitude, lon: this.longitude }
      },
      isEnterParking: this.enterParking
    };
    // TODO:
    console.log('TODO GRABAR en DB ');
    this.http.post('https://localhost:3000/api/parking/', this._userParking);
    console.log('datos enviados ->' + this._userParking);
    this.presentToast(this.enterParking);
  }

  async presentToast(enter: boolean) {
    let message = ``;
    let mensaje = enter
      ? `-> Enter to the parking lot. On location lat|long: ${this.latitude} | ${this.longitude} ->`
      : `<- Leaving the parking lot. On location lat|long: ${this.latitude} | ${this.longitude} <-`;
    const toast = await this.toastController.create({
      message: `${mensaje}, Have a nice day!  =)`,
      duration: 2000
    });
    toast.present();
  }

  /*{ 
	"idUser": 1,
    "text": "test2",
    "idParking": 1,
    "location": {
  "type": "Point",
    "coordinates": {"lat":36.098948, "lon":-10}
  },
    "isEnterParking": false */

  /* 
  private getGoogleMaps(): Promise<any> {
    const win = window as any;
    const googleModule = win.google;
    if (googleModule && googleModule.maps) {
      return Promise.resolve(googleModule.maps);
    }
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src =
        'https://maps.googleapis.com/maps/api/js?key=' +
        environment.googleMapsAPIKey;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.onload = () => {
        const loadedGoogleModule = win.google;
        if (loadedGoogleModule && loadedGoogleModule.maps) {
          resolve(loadedGoogleModule.maps);
        } else {
          reject('Google maps SDK not available.');
        }
      };
    });
  }
  */
}
