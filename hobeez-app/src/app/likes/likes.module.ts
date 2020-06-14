import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsPageRoutingModule } from './likes-routing.module';

import { LikesPage } from './likes.page';
import { BarRatingModule } from 'ngx-bar-rating';

@NgModule({
  imports: [
    BarRatingModule ,
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsPageRoutingModule
  ],
  declarations: [LikesPage]
})
export class LikesPageModule {}
