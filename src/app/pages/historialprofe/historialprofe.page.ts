import { Component } from '@angular/core';

@Component({
  selector: 'app-historialprofe',
  templateUrl: './historialprofe.page.html',
  styleUrls: ['./historialprofe.page.scss'],
})
export class HistorialprofePage {
  selectedClass: string = '';  
  students: any[] = [];  

  private allStudents = ['Juan Pérez', 'María López', 'Carlos García', 'Ana Martínez', 'Luis Fernández',
    'Sofía Díaz', 'Pedro Gómez', 'Laura Sánchez', 'José Ramírez', 'Carmen Torres', 'Jorge Herrera', 'Isabel Ruiz'];

  constructor() {}

  generateRandomStudents() {
    this.students = []; 

    for (let i = 0; i < 10; i++) {
      const randomStudentIndex = Math.floor(Math.random() * this.allStudents.length);
      const studentName = this.allStudents[randomStudentIndex];

      const totalClasses = 10;
      const attendedClasses = Math.floor(Math.random() * (totalClasses + 1)); 
      const attendancePercentage = ((attendedClasses / totalClasses) * 100).toFixed(2); 

      this.students.push({
        name: studentName,
        attended: attendedClasses,
        totalClasses: totalClasses,
        attendancePercentage: attendancePercentage
      });
    }
  }
}
