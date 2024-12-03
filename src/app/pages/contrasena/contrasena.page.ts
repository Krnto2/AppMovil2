import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Firestore, collection, setDoc, doc } from '@angular/fire/firestore';

@Component({
  selector: 'app-contrasena',
  templateUrl: './contrasena.page.html',
  styleUrls: ['./contrasena.page.scss'],
})
export class ContrasenaPage {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private alertController: AlertController, private firestore: Firestore) {}

  async createUser() {
    if (!this.email && !this.password && !this.confirmPassword) {
      await this.presentAlert('Error', 'Todos los campos están vacíos.');
      return;
    }

    if (!this.validateEmail()) {
      await this.presentAlert(
        'Error',
        'El correo debe terminar en "@duocuc.cl" o "@profesorduocuc.cl".'
      );
      return;
    }

    if (this.password.length < 4) {
      await this.presentAlert('Error', 'La contraseña debe tener al menos 4 caracteres.');
      return;
    }

    if (this.password !== this.confirmPassword) {
      await this.presentAlert('Error', 'Las contraseñas no coinciden.');
      return;
    }

    const userType = this.email.endsWith('@profesorduocuc.cl') ? 'profesor' : 'alumno';
    const userData = {
      email: this.email,
      password: this.password, 
      userType: userType,
    };

    try {
      const usersCollection = collection(this.firestore, 'users');
      const userDoc = doc(usersCollection, this.email);
      await setDoc(userDoc, userData);
      await this.presentAlert('Éxito', 'Usuario creado exitosamente.');
      this.resetForm();
    } catch (error) {
      console.error('Error al crear el usuario:', error);
      await this.presentAlert('Error', 'No se pudo crear el usuario. Inténtalo nuevamente.');
    }
  }

  validateEmail(): boolean {
    return (
      this.email.endsWith('@duocuc.cl') || this.email.endsWith('@profesorduocuc.cl')
    );
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  resetForm() {
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
  }
}
