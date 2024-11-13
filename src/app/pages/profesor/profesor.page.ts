import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.page.html',
  styleUrls: ['./profesor.page.scss'],
})
export class ProfesorPage implements OnInit {

  constructor(private router: Router, private alertController: AlertController) {}

  ngOnInit() {
  }

  goToScan() {
    this.router.navigate(['/generar']);

  }

  goToHistorial() {
    this.router.navigate(['/historialprofe'])
  }

  goToHorario() {
    this.router.navigate(['/horarioprofe'])
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
