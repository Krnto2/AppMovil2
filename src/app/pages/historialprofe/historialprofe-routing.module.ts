import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistorialprofePage } from './historialprofe.page';

const routes: Routes = [
  {
    path: '',
    component: HistorialprofePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistorialprofePageRoutingModule {}
