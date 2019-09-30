import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SigninPage } from './signin.component';

const routes: Routes = [
  {
    path: '',
    component: SigninPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SigninPageRoutingModule {}
