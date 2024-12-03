import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  currentUser: any = null;

  constructor(private router: Router, private alertController: AlertController) {}

  ngOnInit() {
    this.loadCurrentUser(); 
  }

  // cargar usuario actual desde el localStorage
  loadCurrentUser() {
    const storedUser = localStorage.getItem('loggedInUser'); 
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser); 
      console.log('Usuario actual cargado:', this.currentUser);
    } else {
      console.error('No se encontró el usuario actual en el almacenamiento local.');
      this.router.navigate(['/login']); 
    }
  }

  goToScan() {
    this.router.navigate(['/scaneo']);
  }

  goToHistorial() {
    this.router.navigate(['/historial']);
  }


  goToHorario() {
    this.router.navigate(['/horario']);
  }

  // cerrar sesión
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
            console.log('Cierre de sesión cancelado.');
          },
        },
        {
          text: 'Sí',
          handler: () => {
            this.logout(); 
          },
        },
      ],
    });

    await alert.present();
  }

  // Función para cerrar sesión
  logout() {
    localStorage.removeItem('loggedInUser'); 
    this.router.navigate(['/login']); 
    console.log('Usuario cerrado sesión y redirigido al login.');
  }
}
