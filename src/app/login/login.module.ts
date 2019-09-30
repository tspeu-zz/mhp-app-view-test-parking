import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
//
import { UserService } from '../services/user.service';

import { LoginPage } from './login.component';
import { LoginPageRoutingModule } from './login-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, LoginPageRoutingModule],
  declarations: [LoginPage],
  providers: [UserService]
})
export class LoginModule {}
