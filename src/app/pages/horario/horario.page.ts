import { Component } from '@angular/core';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.page.html',
  styleUrls: ['./horario.page.scss'],
})
export class HorarioPage {
  selectedDay: string = 'L'; 

  constructor() {}

  
  onDayChange(event: any) {
    this.selectedDay = event.detail.value; 
  }
}
