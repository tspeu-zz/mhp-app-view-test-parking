import { Injectable } from '@angular/core';
import * as PouchDB from 'pouchdb';
import cordovaSqlitePlugin from 'pouchdb-adapter-cordova-sqlite';

@Injectable({
  providedIn: 'root'
})
export class DataPounchService {
  public pdb;

  dataDb: any;

  constructor() {}

  createPouchDB() {
    PouchDB.plugin(cordovaSqlitePlugin);
    this.pdb = new PouchDB('parking.db', { adapter: 'cordova-sqlite' });
  }

  create(data) {
    return this.pdb.post(data);
  }

  update(data) {
    return this.pdb.put(data);
  }

  delete(data) {
    return this.pdb.delete(data);
  }

  read() {
    this.pdb.allDocs({ include_docs: true }).then(docs => {
      this.dataDb = docs.rows.map(row => {
        row.doc.Date = new Date(row.doc.Date);
        return row.doc;
      });

      return this.dataDb;
    });

    // this.pdb
    //   .changes({ live: true, since: 'now', include_docs: true })
    //   .on('change', () => {
    //     allDocs().then(emps => {
    //       this.dataDb = emps;
    //     });
    //   });
    // return allDocs();
  }
}
