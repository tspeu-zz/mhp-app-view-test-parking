import {
  Component,
  AfterViewInit,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
// import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Map, tileLayer, marker } from 'leaflet';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit, AfterViewInit {
  map: Map;
  propertyList = [];
  // latitude: any;
  // longitude: any;
  // enterParking = false;
  // @ViewChild('mapElement', { static: true }) mapNativeElement: ElementRef;

  constructor() {}

  ngOnInit(): void {
    console.log('enter ngOnInit');
  }

  ngAfterViewInit(): void {
    console.log('enter ngAfterViewInit');
    this.map = new Map('mapId3').setView([42.35663, -71.1109], 16);

    //tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    tileLayer(
      'http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
      {
        attribution: 'edupala.com'
      }
    ).addTo(this.map);

    fetch('./assets/data.json')
      .then(res => res.json())
      .then(json => {
        this.propertyList = json.properties;
        this.leafletMap();
      });
  }

  leafletMap() {
    for (const property of this.propertyList) {
      marker([property.lat, property.long])
        .addTo(this.map)
        .bindPopup(property.city)
        .openPopup();
    }
  }

  // togleeParking() {
  //   console.log('entra parking ' + !this.enterParking);
  //   return !this.enterParking;
  // }
}
