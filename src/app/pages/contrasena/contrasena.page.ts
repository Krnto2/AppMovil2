import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-contrasena',
  templateUrl: './contrasena.page.html',
  styleUrls: ['./contrasena.page.scss'],
})
export class ContrasenaPage {
  email: string = ''; 

  constructor(private alertController: AlertController) {}

  async resetPassword() {
    if (this.email.endsWith('@duocuc.cl')) {
      const alert = await this.alertController.create({
        header: 'Éxito',
        message: 'Correo electrónico enviado',
        buttons: ['OK']
      });
      await alert.present();
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Correo inválido',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
}
