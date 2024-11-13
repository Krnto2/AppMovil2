import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.scss'],
})
export class EncabezadoComponent {
  @Input() titulo: string | undefined;
 

  constructor(private router: Router, private alertController: AlertController) {}

  goToLogin() {
    this.router.navigate(['/login']);
  }

  async presentLogoutAlert() {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Desea cerrar sesión?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        },
        {
          text: 'Sí',
          handler: () => {
            this.router.navigate(['/login'])
          }
        }
      ]
    });

    await alert.present();
  }

}

