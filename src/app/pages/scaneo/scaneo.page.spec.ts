import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScaneoPage } from './scaneo.page';

describe('ScaneoPage', () => {
  let component: ScaneoPage;
  let fixture: ComponentFixture<ScaneoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ScaneoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
