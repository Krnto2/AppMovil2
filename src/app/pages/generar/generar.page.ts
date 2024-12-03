import { Component } from '@angular/core';
import { Firestore, collection, getDocs, setDoc, doc, getDoc } from '@angular/fire/firestore';
import QRCode from 'qrcode';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-generar',
  templateUrl: './generar.page.html',
  styleUrls: ['./generar.page.scss'],
})
export class GenerarPage {
  classes: string[] = [];
  selectedClass: string = '';
  newClassName: string = '';
  qrCode: string | null = null;
  generatedClass: string = '';
  currentUser: string = ''; 
  professorName: string = ''; 

  constructor(private firestore: Firestore, private alertController: AlertController) {
    this.loadCurrentUser(); 
    this.loadClasses(); 
  }

  loadCurrentUser() {
    const storedUser = localStorage.getItem('loggedInUser'); 
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      this.currentUser = userData.email;

      // extraer el nombre del profesor duoc
      if (this.currentUser.endsWith('@profesorduocuc.cl')) {
        this.professorName = this.currentUser.replace('@profesorduocuc.cl', '');
      } else {
        console.error('El usuario no tiene el formato esperado para un profesor.');
      }
    } else {
      console.error('No se encontró el usuario actual en el almacenamiento local.');
    }
  }

  // cargar clases  del usuario desde Firestore
  async loadClasses() {
    if (!this.currentUser) {
      console.error('Usuario no identificado. No se pueden cargar las clases.');
      return;
    }

    try {
      const userDocRef = doc(this.firestore, `users/${this.currentUser}`);
      const userSnapshot = await getDoc(userDocRef);

      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        this.classes = userData['classes'] || [];
        this.classes.sort((a: string, b: string) => a.localeCompare(b)); // ordena alfabéticamente
        console.log('Clases cargadas para el usuario:', this.classes);
      } else {
        console.error('No se encontró el usuario en la base de datos.');
      }
    } catch (error) {
      console.error('Error al cargar las clases:', error);
    }
  }

  // generar QR para una clase seleccionada
  async generateQR() {
    if (!this.selectedClass) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, selecciona una clase',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    const today = new Date();
    const dateKey = today.toISOString().split('T')[0]; 
    const docId = `${this.selectedClass}_${dateKey}`; 

    try {
      const qrDocRef = doc(this.firestore, `QR/${docId}`);
      const qrSnapshot = await getDoc(qrDocRef);

      if (qrSnapshot.exists()) {
        const qrData = qrSnapshot.data();
        this.qrCode = await QRCode.toDataURL(JSON.stringify(qrData));
        this.generatedClass = `${this.selectedClass} (${dateKey})`;
        console.log('QR cargado desde Firestore:', qrData);
      } else {
        const qrData = {
          class: this.selectedClass,
          professor: this.professorName,
          date: dateKey,
          time: today.toLocaleTimeString(), 
          scanCount: 0, // inicializar el contador de escaneos
          scannedUsers: [], // lista de usuarios que han escaneado
        };
        this.qrCode = await QRCode.toDataURL(JSON.stringify(qrData));
        this.generatedClass = `${this.selectedClass} (${dateKey})`;

        await setDoc(qrDocRef, qrData);
        console.log('QR generado y guardado en la colección "QR".');
      }
    } catch (error) {
      console.error('Error al generar o guardar el QR:', error);
    }
  }

  // mostrar la lista de asistencia y contar alumnos 
  async showAttendance() {
    if (!this.selectedClass) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, selecciona una clase primero.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    const today = new Date();
    const dateKey = today.toISOString().split('T')[0];
    const docId = `${this.selectedClass}_${dateKey}`;
    const qrDocRef = doc(this.firestore, `QR/${docId}`);

    try {
      const qrSnapshot = await getDoc(qrDocRef);

      if (qrSnapshot.exists()) {
        const qrData = qrSnapshot.data();
        const scanCount = qrData['scanCount'] || 0;
        const scannedUsers = qrData['scannedUsers'] || [];

        const userEmails = scannedUsers.map((email: string) =>
          email.replace('@duocuc.cl', '')
        );

        const alert = await this.alertController.create({
          header: 'Lista pasada',
          message: `El QR ha sido escaneado ${scanCount} ${scanCount === 1 ? 'vez' : 'veces'}, Usuarios :${userEmails.join(', ')}`,
          buttons: ['OK'],
        });
        await alert.present();

        this.qrCode = null;
        this.selectedClass = '';
      } else {
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'No hay datos de escaneos para esta clase.',
          buttons: ['OK'],
        });
        await alert.present();
      }
    } catch (error) {
      console.error('Error al mostrar la lista de asistencia:', error);
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Ocurrió un error al obtener la lista de asistencia.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }

  // crear una nueva clase y asociarla al usuario actual
  async createClass() {
    if (!this.newClassName.trim()) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'El nombre de la clase no puede estar vacío',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    if (this.classes.includes(this.newClassName.trim())) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: `La clase "${this.newClassName}" ya existe.`,
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    const confirmAlert = await this.alertController.create({
      header: 'Confirmar creación',
      message: `¿Estás seguro de que deseas crear la clase "${this.newClassName}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Creación cancelada');
          },
        },
        {
          text: 'Confirmar',
          handler: async () => {
            try {
              const userDocRef = doc(this.firestore, `users/${this.currentUser}`);
              const userSnapshot = await getDoc(userDocRef);

              if (userSnapshot.exists()) {
                const userData = userSnapshot.data();
                const userClasses = userData['classes'] || [];
                userClasses.push(this.newClassName.trim());
                userClasses.sort((a: string, b: string) => a.localeCompare(b));

                await setDoc(userDocRef, { ...userData, classes: userClasses });

                const classDocRef = doc(this.firestore, `classes/${this.newClassName.trim()}`);
                await setDoc(classDocRef, {
                  className: this.newClassName.trim(),
                  professor: this.professorName,
                });

                this.classes = userClasses;
                this.newClassName = '';
                console.log('Clase creada y añadida al selector:', this.newClassName);
              } else {
                console.error('No se encontró el usuario para agregar la clase.');
              }
            } catch (error) {
              console.error('Error al crear la clase:', error);
            }
          },
        },
      ],
    });

    await confirmAlert.present();
  }
}
