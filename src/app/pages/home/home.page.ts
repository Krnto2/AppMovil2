import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  constructor(private router: Router, private alertController: AlertController) {}

  goToScan() {
    this.router.navigate(['/scaneo']);

  }

  goToHistorial() {
    this.router.navigate(['/historial'])
  }

  goToHorario() {
    this.router.navigate(['/horario'])
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



