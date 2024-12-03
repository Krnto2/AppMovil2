import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistorialProfePage } from './historialprofe.page';

const routes: Routes = [
  {
    path: '',
    component: HistorialProfePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistorialprofePageRoutingModule {}
