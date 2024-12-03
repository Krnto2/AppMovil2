import { Injectable } from '@angular/core';
import { QRCodeElementType, QRCodeErrorCorrectionLevel, QRCodeVersion, QRCodeModule } from 'angularx-qrcode';

@Injectable({
  providedIn: 'root'
})
export class QRCodeGeneratorService {

  constructor() { }

  generateQRCode(data: string): string {
    const qrElementType: QRCodeElementType = 'url'; 
    const qrErrorCorrectionLevel: QRCodeErrorCorrectionLevel = 'M'; 
    const qrVersion: QRCodeVersion = 1; 
    
    return `https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=${encodeURIComponent(data)}&chld=${qrErrorCorrectionLevel}|1`;
  }
}
