import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistorialprofePageRoutingModule } from './historialprofe-routing.module';
import { ComponentsModule } from "../../components/components.module";

import { HistorialProfePage } from './historialprofe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistorialprofePageRoutingModule,
    ComponentsModule
  ],
  declarations: [HistorialProfePage]
})
export class HistorialprofePageModule {}
