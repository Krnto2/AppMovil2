import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.page.html',
  styleUrls: ['./horario.page.scss'],
})
export class HorarioPage implements OnInit {
  selectedDay: string = 'L'; 
  currentUser: string = ''; 

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadCurrentUser(); // cargar el usuario desde el almacenamiento local
  }

  // cargar usuario actual desde el almacenamiento local
  loadCurrentUser() {
    const storedUser = localStorage.getItem('loggedInUser'); 
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      this.currentUser = userData.email; 
      console.log('Usuario actual cargado:', this.currentUser);
    } else {
      console.error('No se encontró el usuario actual en el almacenamiento local.');
      this.router.navigate(['/login']); 
    }
  }

  
  onDayChange(event: any) {
    this.selectedDay = event.detail.value; 
    console.log('Día seleccionado:', this.selectedDay);
  }
}
