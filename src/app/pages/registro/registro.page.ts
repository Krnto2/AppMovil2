import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  public scannedClass: string = 'Clase desconocida'; 
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    
    this.route.queryParams.subscribe(params => {
      this.scannedClass = params['scannedText'] || localStorage.getItem('scannedText') || 'Clase desconocida';
    });
  }
}
