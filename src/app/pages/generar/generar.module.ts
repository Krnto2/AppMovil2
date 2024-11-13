import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { GenerarPageRoutingModule } from './generar-routing.module';
import { GenerarPage } from './generar.page';
import { QRCodeModule } from 'angularx-qrcode';
import { ComponentsModule } from '../../components/components.module'; // Importa tu módulo de componentes

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GenerarPageRoutingModule,
    QRCodeModule,
    ComponentsModule 
  ],
  declarations: [GenerarPage]
})
export class GenerarPageModule {}
