import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistorialprofePageRoutingModule } from './historialprofe-routing.module';
import { ComponentsModule } from "../../components/components.module";

import { HistorialprofePage } from './historialprofe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistorialprofePageRoutingModule,
    ComponentsModule
  ],
  declarations: [HistorialprofePage]
})
export class HistorialprofePageModule {}
