import {
  Component,
  AfterViewInit,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { environment } from 'src/environments/environment';
import { ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { UserParking } from '../Models/parkins-list-models';

// services
import { UserService } from '../services/user.service';
import { LocalStorageService } from '../services/local-storage.service';
import { TransientService } from '../services/transient.service';

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
  _localTempData: any;
  _dataOudTemp: any;

  @ViewChild('mapElement') mapNativeElement: ElementRef;

  constructor(
    private geolocation: Geolocation,
    private toastController: ToastController,
    private http: HttpClient,
    public router: Router,
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private transientService: TransientService
  ) { }

  ngOnInit() {
    // this.getLocaldata('tempUserdata');
    this.getAllLocalData('tempUserdata');
    this._dataOudTemp = this.transientService.getDataOut();
  }

  ngAfterViewInit(): void {
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
        infoWindow.setContent('Hi you have parked Here!');
        infoWindow.open(map);
        map.setCenter(pos);
        this.showloadingMap = false;
      })
      .catch(error => {
        this.showloadingMap = false;
        console.log('Error getting location', error);
      });
  }
  // 
  onParkingAction() {
    this.enterParking = !this.enterParking;
    this.actionParkingColor = this.enterParking ? 'danger' : 'success';

    this._userParking = {
      idUser: this._dataOudTemp.user.id,
      text: 'test from app',
      idParking: 1,
      location: {
        type: 'Point',
        coordinates: [this.latitude, this.longitude]
      },
      isEnterParking: this.enterParking
    };

    let dataTest = {
      idUser: 4,
      text: 'AAPPPPP sss',
      idParking: 4,
      location: {
        type: 'Point',
        coordinates: [this.latitude, this.longitude]
      },
      isEnterParking: true
    };

    // save data 
    this.saveToDb(this._userParking);
    this.saveToLocal(this._userParking);
    this.presentToast(this.enterParking);
  }

  saveToDb(data: any) {
    //'https://localhost:3000/api/parking/'
    this.userService.postData(environment.apiParking, data);
  }

  saveToLocal(data: any) {
    this.localStorageService.set('userdata', data);
  }

  getLocaldata(key: any) {
    this._localTempData = this.localStorageService.get(key);

  }

  getAllLocalData(key: string) {
    this._localTempData = this.localStorageService.getAll(key)
  }
  saveTemptoLocalNew(key, temp) {
    this.localStorageService.setData(key, temp);
  }

  async presentToast(enter: boolean) {
    let message = ``;
    let mensaje = enter
      ? `Hi ${this._dataOudTemp.user.name} you're enter to the parking lot. On location lat|long: ${this.latitude} | ${this.longitude} !`
      : `Hi ${this._dataOudTemp.user.name} you're leaving the parking lot. On location lat|long: ${this.latitude} | ${this.longitude} !`;
    const toast = await this.toastController.create({
      message: `${mensaje}, Have a nice day!  =)`,
      duration: 3200
    });
    toast.present();
  }

  // gotoDetailPage() {
  //   // this.router.navigate(['/details', { data: this._userParking }]);
  //   this.router.navigateByUrl('/details');
  // }

  ionViewDidLeave() {
    this.saveTemptoLocalNew('tempUserdata', this._localTempData);
    this.transientService.setDataIn(this._dataOudTemp);
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
