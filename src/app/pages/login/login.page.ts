import { Component } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';  
  password: string = ''; 

  constructor(private navCtrl: NavController, private alertController: AlertController) {}

  async login() {
    if (this.password.length >= 3) {
      if (this.username.endsWith('@duocuc.cl')) {
        this.navCtrl.navigateRoot('/home'); 
      } else if (this.username.endsWith('@profesorduocuc.cl')) {
        this.navCtrl.navigateRoot('/profesor');  
      } else {
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Usuario no válido',
          buttons: ['OK']
        });
        await alert.present();
      }
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Usuario no válido',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  goToResetPassword() {
    this.navCtrl.navigateForward('/reset-password');
  }
}
