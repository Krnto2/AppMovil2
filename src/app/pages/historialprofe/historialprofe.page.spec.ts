import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistorialprofePage } from './historialprofe.page';

describe('HistorialprofePage', () => {
  let component: HistorialprofePage;
  let fixture: ComponentFixture<HistorialprofePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialprofePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
