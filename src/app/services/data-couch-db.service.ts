import { Injectable } from '@angular/core';
import { CouchbaseLite } from '@ionic-native/couchbase-lite/ngx';
import { Http } from '@angular/http';
import { Observable } from 'rxjs'



@Injectable({
  providedIn: 'root'
})
export class DataCouchDBService {
  
  
  constructor(private couchbase: CouchbaseLite, 
      //private platform:Platform,
      private _http:Http) {
      this.initMethod();
  }

  url:string;

  initMethod() {
    this.couchbase.getURL().then((url)=> {
    this.url = url;
    })
  }

  getUrl() {
    return this.url;
}
// DATABASES //
createDatabase(database_name:string) {
    let url = this.getUrl();
    url = url+database_name;
    return this._http
      .put(url)
      .map(data => { this.results = data['results'] })
      .catch((error:any) => {
         return Observable.throw(error.json() || 'Couchbase Lite error');
       })
}
deleteDatabase(database_name:string) {
    let url = this.getUrl();
    url = url+database_name;
    return this._http
      .delete(url)
      .map(data => { this.results = data['results'] })
      .catch((error:any) => {
         return Observable.throw(error.json() || 'Couchbase Lite error');
      })
}
getAllDbs() {
    let url = this.getUrl();
    url = url+'_all_dbs';
    return this._http
      .get(url)
      .map(data => { this.results = data['results'] })
      .catch((error:any) => {
        return Observable.throw(error.json() || 'Couchbase Lite error');
      })
}
// DOCUMENTS //
getAllDocuments(database_name:string){
    let url = this.getUrl();
    // include_docs=true will include a doc inside response, it is false by default
    url = url + database_name + '/_all_docs?include_docs=true';
    return this._http
      .get(url)
      .map(data => { this.results = data['results'] })
      .catch((error:any) => {
        return Observable.throw(error.json() || 'Couchbase Lite error');
      })        .
}
createDocument(database_name:string,document){
    let url = this.getUrl();
    url = url + database_name;
    return this._http
      .post(url,document)
      .map(data => { this.results = data['results'] })
      .catch((error:any) => {
        return Observable.throw(error.json() || 'Couchbase Lite error');
      })        .
}
let document = {
  _id:'You can either specify the document ID (must be string) else couchbase generates one for your doc',
  data:{name:'sandman',age:25,city:pune}
}
createDocument('justbe', document);
// successful response
{ "id": "string","rev": "string","ok": true }
updateDocument(database_name:string,document){
    let url = this.getUrl();
    url = url + database_name + '/' + document._id;
    return this._http
      .put(url,document)
      .map(data => { this.results = data['results'] })
      .catch((error:any) => {
        return Observable.throw(error.json() || 'Couchbase Lite error');
      })        .
}
// for updation of document your document must contain most recent rev(revision) id.
// for each updation of document new rev id is get generated
// successful response
{ "id": "string","rev": "string(new revision id)","ok": true }
deleteDocument(database_name:string,document){
    let url = this.getUrl();
    url = url + database_name + '/' + document._id +'?rev='+doc._rev;
    return this._http
      .delete(url)
      .map(data => { this.results = data['results'] })
      .catch((error:any) => {
        return Observable.throw(error.json() || 'Couchbase Lite error');
      })        .




}
