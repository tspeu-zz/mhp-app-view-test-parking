import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  constructor(private _router: Router) {}

  ngOnInit() {}

  onLogout() {
    this._router.navigateByUrl('/login');
    console.log('logout');
  }
}
