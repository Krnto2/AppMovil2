import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-horarioprofe',
  templateUrl: './horarioprofe.page.html',
  styleUrls: ['./horarioprofe.page.scss'],
})
export class HorarioprofePage {
  selectedDay: string = 'L'; 

  constructor() {}

  
  onDayChange(event: any) {
    this.selectedDay = event.detail.value; 
  }
}
