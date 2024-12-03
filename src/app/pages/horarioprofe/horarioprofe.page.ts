import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-horarioprofe',
  templateUrl: './horarioprofe.page.html',
  styleUrls: ['./horarioprofe.page.scss'],
})
export class HorarioprofePage implements OnInit {
  selectedDay: string = 'L'; 
  currentUser: string = ''; 
  professorName: string = ''; 

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadCurrentUser(); 
  }

  // cargar usuario actual desde el almacenamiento local
  loadCurrentUser() {
    const storedUser = localStorage.getItem('loggedInUser'); 
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      this.currentUser = userData.email; 

      // pone  el nombre del profesor sin el duocuc
      if (this.currentUser.endsWith('@profesorduocuc.cl')) {
        this.professorName = this.currentUser.replace('@profesorduocuc.cl', '');
      } else {
        console.error('El usuario no tiene el formato esperado para un profesor.');
      }

      console.log('Usuario actual cargado:', this.currentUser);
      console.log('Nombre del profesor:', this.professorName);
    } else {
      console.error('No se encontró el usuario actual en el almacenamiento local.');
      this.router.navigate(['/login']); 
    }
  }

  // Cambiar el día seleccionado
  onDayChange(event: any) {
    this.selectedDay = event.detail.value; 
    console.log('Día seleccionado:', this.selectedDay);
  }
}
