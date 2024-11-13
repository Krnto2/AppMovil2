import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-generar',
  templateUrl: './generar.page.html',
  styleUrls: ['./generar.page.scss'],
})
export class GenerarPage {
  selectedClass: string | undefined;
  qrCode: string | null = null; 
  generatedClass: string | null = null;

  constructor(private alertController: AlertController) {}

  async generateQR() {
    if (!this.selectedClass) {
      await this.presentAlert('Clase no seleccionada', 'Por favor, selecciona una clase antes de generar el código QR.');
      return;
    }

    this.qrCode = `assets/qrs/${this.selectedClass.replace('-', '')}.png`;
    this.generatedClass = this.selectedClass;
  }

  async showAttendance() {
    await this.presentAlert('Lista pasada con éxito', 'Asistencia de un 76%');

    this.qrCode = null;
    this.generatedClass = null;
    this.selectedClass = undefined;
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
