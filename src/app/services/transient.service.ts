import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransientService {

  constructor() { }

  dataInComponent: any;
  dataOutComponent: any;

  setDataIn(data: any) {
    this.dataInComponent = data;
  }

  getDataIn() {
    return this.dataInComponent;
  }

  setDataOut(data: any) {
    this.dataOutComponent = data;
  }

  getDataOut() {
    return this.dataOutComponent;
  }
}
