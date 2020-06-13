import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SlideLoisirsPage } from './slide-loisirs.page';

const routes: Routes = [
  {
    path: '',
    component: SlideLoisirsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SlideLoisirsPageRoutingModule {}
