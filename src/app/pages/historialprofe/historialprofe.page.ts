import { Component, OnInit } from '@angular/core';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-historialprofe',
  templateUrl: './historialprofe.page.html',
  styleUrls: ['./historialprofe.page.scss'],
})
export class HistorialProfePage implements OnInit {
  classes: string[] = [];
  selectedClass: string = '';
  students: { name: string }[] = []; 
  currentUser: string = '';
  currentDate: string = '';  
  presentCount: number = 0; 

  constructor(
    private firestore: Firestore,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.loadCurrentUser();
    this.loadClasses();

    //  fecha actual en formato legible 
    const today = new Date();
    this.currentDate = today.toISOString().split('T')[0];
  }

  loadCurrentUser() {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      this.currentUser = userData.email;
      console.log('Usuario actual cargado:', this.currentUser);
    }
  }

  // cargar las clases asignadas al usuario desde Firestore
  async loadClasses() {
    if (!this.currentUser) return;

    try {
      const userDocRef = doc(this.firestore, `users/${this.currentUser}`);
      const userSnapshot = await getDoc(userDocRef);

      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        this.classes = userData['classes'] || [];
        this.classes.sort((a: string, b: string) => a.localeCompare(b));
      }
    } catch (error) {
      console.error('Error al cargar las clases:', error);
    }
  }

  // Obtener la asistencia de los alumnos 
  async fetchAttendance() {
    if (!this.selectedClass) return;

    const docId = `${this.selectedClass}_${this.currentDate}`; 
    const qrDocRef = doc(this.firestore, `QR/${docId}`);

    try {
      const qrSnapshot = await getDoc(qrDocRef);

      if (qrSnapshot.exists()) {
        const qrData = qrSnapshot.data();
        const scannedUsers = qrData['scannedUsers'] || [];

        if (scannedUsers.length > 0) {
          // transformar usuarios a un array de objetos y contar los presentes
          this.students = scannedUsers.map((email: string) => ({
            name: email.replace('@duocuc.cl', ''),
          }));
          this.presentCount = this.students.length;
        } else {
          this.students = [];
          this.presentCount = 0;
          await this.presentAlert('Nadie ha escaneado el QR hoy.');
        }
      } else {
        this.students = [];
        this.presentCount = 0;
        await this.presentAlert('La clase no se ha inicializado hoy.');
      }
    } catch (error) {
      console.error('Error al obtener la asistencia:', error);
      await this.presentAlert('Ocurrió un error al obtener la asistencia.');
    }
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Información',
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
