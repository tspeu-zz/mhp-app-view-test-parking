import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { SigninPage } from './signin.component';
import { SigninPageRoutingModule } from './signin-router.module';

@NgModule({
  imports: [CommonModule, IonicModule, SigninPageRoutingModule],
  declarations: [SigninPage]
})
export class SigninModule {}
