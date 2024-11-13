import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HorarioprofePage } from './horarioprofe.page';

describe('HorarioprofePage', () => {
  let component: HorarioprofePage;
  let fixture: ComponentFixture<HorarioprofePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HorarioprofePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
