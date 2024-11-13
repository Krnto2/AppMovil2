import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HorarioprofePage } from './horarioprofe.page';

const routes: Routes = [
  {
    path: '',
    component: HorarioprofePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HorarioprofePageRoutingModule {}
