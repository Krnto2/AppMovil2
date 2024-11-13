import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScaneoPage } from './scaneo.page';

const routes: Routes = [
  {
    path: '',
    component: ScaneoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScaneoPageRoutingModule {}
