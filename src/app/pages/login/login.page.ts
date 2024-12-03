import { Component } from '@angular/core';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';

  constructor(
    private firestore: Firestore,
    private router: Router,
    private alertController: AlertController
  ) {}

  async login() {
    if (!this.username.trim() || !this.password.trim()) {
      this.presentAlert('Error', 'Por favor completa todos los campos.');
      return;
    }

    if (!this.validateEmail(this.username)) {
      this.presentAlert('Error', 'Por favor ingresa un correo válido de Duoc UC.');
      return;
    }

    try {
      const userDocRef = doc(this.firestore, `users/${this.username}`);
      const userSnapshot = await getDoc(userDocRef);

      if (!userSnapshot.exists()) {
        this.presentAlert('Error', 'Usuario no registrado.');
        return;
      }

      const userData = userSnapshot.data();
      if (userData['password'] !== this.password) {
        this.presentAlert('Error', 'Usuario no registrado.');
        return;
      }

      // guarda la sesion en el Local Storage
      localStorage.setItem(
        'loggedInUser',
        JSON.stringify({
          email: this.username,
          userType: userData['userType'],
        })
      );

      if (userData['userType'] === 'alumno') {
        this.router.navigate(['/home']);
      } else if (userData['userType'] === 'profesor') {
        this.router.navigate(['/profesor']);
      } else {
        this.presentAlert('Error', 'Tipo de usuario no reconocido.');
      }
    } catch (error: any) {
      
      if (error.code === 'permission-denied') {
        this.presentAlert('Error', 'No tienes permisos para acceder a esta base de datos.');
      } else {
        console.error('Error al iniciar sesión:', error);
        this.presentAlert('Error', 'Ocurrió un error inesperado. Inténtalo nuevamente.');
      }
    } finally {
      
      this.username = '';
      this.password = '';
    }
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(duocuc\.cl|profesorduocuc\.cl)$/;
    return emailRegex.test(email);
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  goToResetPassword() {
    this.router.navigate(['/contrasena']);
  }
}
