import { Component, OnInit } from '@angular/core';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { Geolocation } from '@capacitor/geolocation';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-scaneo',
  templateUrl: './scaneo.page.html',
  styleUrls: ['./scaneo.page.scss'],
})
export class ScaneoPage implements OnInit {
  isSupported = false;
  isScanning = false;
  barcodes: Barcode[] = [];
  private readonly TARGET_LAT = -36.79533185450432;
  private readonly TARGET_LNG = -73.06280681374281;
  private readonly MAX_DISTANCE_METERS = 500000;
  currentUser: string = ''; // para saber el usuario actual

  constructor(
    private alertController: AlertController,
    private router: Router,
    private platform: Platform,
    private firestore: Firestore
  ) {}

  ngOnInit() {
    this.loadCurrentUser(); // Cargar usuario actual desde localStorage
    this.initializeScanner();
  }

  // Cargar usuario actual desde el almacenamiento local
  loadCurrentUser() {
    const storedUser = localStorage.getItem('loggedInUser'); // get  usuario 
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      this.currentUser = userData.email;
      console.log('Usuario actual cargado:', this.currentUser);
    } else {
      console.error('No se encontró el usuario actual en el almacenamiento local.');
      this.router.navigate(['/login']); // x si no pilla el user te mande al login
    }
  }

  async initializeScanner() {
    if (this.platform.is('android') || this.platform.is('ios')) {
      try {
        const result = await BarcodeScanner.isSupported();
        this.isSupported = result.supported;

        if (this.isSupported) {
          await this.checkAndInstallBarcodeModule();
        }
      } catch (error) {
        const errorMessage = (error as Error).message;
        if (!errorMessage.includes('already installed')) {
          await this.presentAlert(
            'Error de Compatibilidad',
            'Error al verificar compatibilidad con el escáner: ' + errorMessage
          );
        }
      }
    } else {
      console.warn('Barcode scanning is not supported on this platform.');
    }
  }

  async checkAndInstallBarcodeModule() {
    try {
      await BarcodeScanner.installGoogleBarcodeScannerModule();
    } catch (error) {
      const errorMessage = (error as Error).message;
      if (!errorMessage.includes('already installed')) {
        throw error;
      }
    }
  }

  async scan(): Promise<void> {
    if (this.isScanning) {
      await this.presentAlert(
        'Escáner en uso',
        'El escáner ya está activo. Por favor, espere a que termine.'
      );
      return;
    }

    if (!(this.platform.is('android') || this.platform.is('ios'))) {
      await this.presentAlert(
        'Función no disponible',
        'La función de escaneo de códigos solo está disponible en dispositivos móviles.'
      );
      return;
    }

    this.isScanning = true; // poner que el scaner ya esta en uso

    try {
      const withinRange = await this.isWithinRange();
      if (!withinRange) {
        await this.presentAlert(
          'Fuera de rango',
          'Debes estar a menos de 500 km de la ubicación especificada para usar el escáner.'
        );
        this.isScanning = false;
        return;
      }

      const granted = await this.requestPermissions();
      if (!granted) {
        await this.presentAlert(
          'Permiso denegado',
          'Para usar la aplicación, autorizar los permisos de cámara.'
        );
        this.isScanning = false;
        return;
      }

      const { barcodes } = await BarcodeScanner.scan();
      if (barcodes.length > 0) {
        const qrData = barcodes[0].displayValue;

        if (qrData) {
          const parsedData = JSON.parse(qrData); 

          // extraer datos del QR
          const scannedClass = parsedData.class;
          const scannedDate = parsedData.date;

          if (!scannedClass || !scannedDate) {
            await this.presentInvalidQRCodeAlert();
            this.isScanning = false;
            return;
          }

          // buscar en Firebase si el QR ya fue escaneado por el mismito usuario
          const docId = `${scannedClass}_${scannedDate}`;
          const qrDocRef = doc(this.firestore, `QR/${docId}`);
          const qrSnapshot = await getDoc(qrDocRef);

          if (qrSnapshot.exists()) {
            const qrData = qrSnapshot.data();
            const scannedUsers = qrData['scannedUsers'] || [];

            if (scannedUsers.includes(this.currentUser)) {
              await this.presentAlert(
                'QR ya escaneado',
                'Ya has escaneado este QR anteriormente.'
              );
              this.isScanning = false;
              return;
            }

            // actualizar el contador de escaneos y agregar usuario
            scannedUsers.push(this.currentUser);
            const scanCount = (qrData['scanCount'] || 0) + 1;
            await setDoc(qrDocRef, { ...qrData, scannedUsers, scanCount });

            // manda pa /registro con el nombre de la clase
            this.router.navigate(['/registro'], {
              queryParams: {
                className: scannedClass, 
                scannedTime: new Date().toISOString(), // envia hora actual como parámetro
              },
            });
          } else {
            await this.presentAlert(
              'Error',
              'El QR no existe en la base de datos.'
            );
          }
        } else {
          await this.presentInvalidQRCodeAlert();
        }
      }
    } catch (error) {
      const errorMessage = (error as Error).message;
      console.error('Error al escanear el código QR:', errorMessage);
      await this.presentAlert(
        'Error de Escaneo',
        'Ocurrió un error al escanear el código QR: ' + errorMessage
      );
    } finally {
      await BarcodeScanner.stopScan();
      this.isScanning = false;
    }
  }

  async isWithinRange(): Promise<boolean> {
    try {
      const permissions = await Geolocation.requestPermissions();
      if (permissions.location !== 'granted') {
        await this.presentAlert(
          'Permiso de ubicación',
          'Se requiere el permiso de ubicación para determinar su posición.'
        );
        return false;
      }

      const position = await Geolocation.getCurrentPosition();
      const currentLat = position.coords.latitude;
      const currentLng = position.coords.longitude;
      const distance = this.calculateDistance(
        currentLat,
        currentLng,
        this.TARGET_LAT,
        this.TARGET_LNG
      );
      return distance <= this.MAX_DISTANCE_METERS;
    } catch (error) {
      const errorMessage = (error as Error).message;
      await this.presentAlert(
        'Error de Geolocalización',
        'No se pudo determinar la ubicación actual: ' + errorMessage
      );
      return false;
    }
  }

  calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371e3;
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lng2 - lng1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }

  async requestPermissions(): Promise<boolean> {
    try {
      const status = await BarcodeScanner.checkPermissions();

      if (status.camera !== 'granted') {
        const { camera } = await BarcodeScanner.requestPermissions();
        return camera === 'granted' || camera === 'limited';
      }

      return true;
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new Error('Error al verificar o solicitar permisos: ' + errorMessage);
    }
  }

  async presentAlert(header: string, message: string): Promise<void> {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async presentInvalidQRCodeAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Código QR inválido',
      message: 'El código QR escaneado no contiene información válida.',
      buttons: ['OK'],
    });
    await alert.present();
  }
}
