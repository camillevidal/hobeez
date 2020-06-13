import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SlideLoisirsPageRoutingModule } from './slide-loisirs-routing.module';

import { SlideLoisirsPage } from './slide-loisirs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SlideLoisirsPageRoutingModule
  ],
  declarations: [SlideLoisirsPage]
})
export class SlideLoisirsPageModule {}
