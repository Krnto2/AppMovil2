import { Injectable } from '@angular/core';
import { QRCodeElementType, QRCodeErrorCorrectionLevel, QRCodeVersion, QRCodeModule } from 'angularx-qrcode';

@Injectable({
  providedIn: 'root'
})
export class QRCodeGeneratorService {

  constructor() { }

  generateQRCode(data: string): string {
    // Configuración de generación de QR
    const qrElementType: QRCodeElementType = 'url'; // Tipo de salida del QR (url, canvas, etc.)
    const qrErrorCorrectionLevel: QRCodeErrorCorrectionLevel = 'M'; // Nivel de corrección de errores
    const qrVersion: QRCodeVersion = 1; // Versión de QR
    
    // Generar código QR como Data URL (reemplaza con tu lógica si usas otro método)
    return `https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=${encodeURIComponent(data)}&chld=${qrErrorCorrectionLevel}|1`;
  }
}
