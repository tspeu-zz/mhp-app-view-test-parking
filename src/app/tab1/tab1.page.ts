import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.sub = this._router.data
    // .subscribe(v => console.log(v));
    let emailUser = this._activatedRoute.snapshot.paramMap.get('email');
    console.log('---> login por email- ->' + emailUser);
  }

  save() {
    console.log('save');
  }
  /* this.http.get('https://someapi.com/posts').subscribe((response) => {
    console.log(response);
});*/
  onLogout() {
    this._router.navigateByUrl('/login');
    console.log('logout');
  }
}
