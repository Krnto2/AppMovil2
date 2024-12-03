import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {
  currentUser: string = ''; 

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadCurrentUser(); // cargar el usuario 
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
}
