import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScaneoPageRoutingModule } from './scaneo-routing.module';
import { ComponentsModule } from "../../components/components.module";

import { ScaneoPage } from './scaneo.page';
import { QRCodeModule } from 'angularx-qrcode'; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScaneoPageRoutingModule,
    ComponentsModule,
    QRCodeModule 
  ],
  declarations: [ScaneoPage]
})
export class ScaneoPageModule {}
