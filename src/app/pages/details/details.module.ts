import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
//
import { DetailsComponent } from '../details/details.component';
import { DetailPageRoutingModule } from '../details/detail-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, DetailPageRoutingModule],
  declarations: [DetailsComponent],
  providers: []
})
export class DetailsModule {}
