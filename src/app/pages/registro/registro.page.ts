import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  scannedClass: string = ''; 
  classStartTime: string = ''; 
  classEndTime: string = ''; 

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // get del qr y los parametros de hora 
    this.route.queryParams.subscribe(params => {
      this.scannedClass = params['className'] || 'Clase desconocida';
      const scannedTime = new Date(params['scannedTime'] || Date.now()); // Obtener hora del QR o la actual

      // calcula el horario (el suma hora y media desde que se scaneo)
      this.classStartTime = scannedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      scannedTime.setMinutes(scannedTime.getMinutes() + 90); 
      this.classEndTime = scannedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    });
  }
}
