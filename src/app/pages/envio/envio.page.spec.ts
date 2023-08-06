import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnvioPage } from './envio.page';

describe('EnvioPage', () => {
  let component: EnvioPage;
  let fixture: ComponentFixture<EnvioPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EnvioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
