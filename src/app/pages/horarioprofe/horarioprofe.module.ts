import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HorarioprofePageRoutingModule } from './horarioprofe-routing.module';
import { ComponentsModule } from "../../components/components.module";

import { HorarioprofePage } from './horarioprofe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HorarioprofePageRoutingModule,
    ComponentsModule
  ],
  declarations: [HorarioprofePage]
})
export class HorarioprofePageModule {}
