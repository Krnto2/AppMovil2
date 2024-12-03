import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.page.html',
  styleUrls: ['./profesor.page.scss'],
})
export class ProfesorPage implements OnInit {
  loggedInUser: any = null; 

  constructor(private router: Router, private alertController: AlertController) {}

  ngOnInit() {
    this.loadUser(); 
  }

  loadUser() {
    const userData = localStorage.getItem('loggedInUser');
    if (userData) {
      this.loggedInUser = JSON.parse(userData);
    } else {
      // Si no hay datos del usuario se va pal login
      this.router.navigate(['/login']);
    }
  }

  goToScan() {
    this.router.navigate(['/generar']);
  }

  goToHistorial() {
    this.router.navigate(['/historialprofe']);
  }

  goToHorario() {
    this.router.navigate(['/horarioprofe']);
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
          handler: () => {},
        },
        {
          text: 'Sí',
          handler: () => {// Llama a la función de cerrar sesión
          },
        },
      ],
    });

    await alert.present();
  }

  logout() {
    localStorage.removeItem('loggedInUser'); // Limpia los datos del usuario
    this.router.navigate(['/login']); 
  }
}
