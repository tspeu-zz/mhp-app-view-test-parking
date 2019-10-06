import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor(public storage: Storage) { }

  //* new*/

  async setData(key, value) {
    const res = await this.storage.set(key, value);
    console.log(res);
  }

  async getData(key) {
    const keyVal = await this.storage.get(key);
    console.log('Key is', keyVal);
    return keyVal;
  }

  public set(settingName, value) {
    console.log('-->set storage value  ' + value);
    return this.storage.set(`setting:${settingName}`, value);
  }
  public async get(settingName) {
    console.log('get storage value --------------> ' + settingName);
    return await this.storage.get(`setting:${settingName}`);
  }

  public getAll(key) {
    console.log('------>get storage value getAll--------------> ' + key);
    return this.storage.get(key).then(val => {
      console.log('-------> get allData', val);
    });
  }

  public async remove(settingName) {
    console.log('remove storage value -> ' + settingName);
    return await this.storage.remove(`setting:${settingName}`);
  }
  public clear() {
    console.log('clear storage value -> ');
    this.storage.clear().then(() => {
      console.log('all keys cleared');
    });
  }

  driverUsed() {
    console.log('Driver Used: ' + this.storage.driver);
  }

  getKeyLength() {
    this.storage.length().then((keysLength: Number) => {
      console.log('Total Keys ' + keysLength);
    });
  }

  // Traverse key/value pairs
  listKeys() {
    this.storage.keys().then(k => {
      console.table(k);
    });
  }

  traverseKeys() {
    this.storage.forEach((value: any, key: string, iterationNumber: Number) => {
      console.log('key ' + key);
      console.log('iterationNumber ' + iterationNumber);
      console.log('value ' + value);
    });
  }
}
