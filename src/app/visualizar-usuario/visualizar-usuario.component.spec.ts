import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarUsuarioComponent } from './visualizar-usuario.component';

describe('VisualizarUsuarioComponent', () => {
  let component: VisualizarUsuarioComponent;
  let fixture: ComponentFixture<VisualizarUsuarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisualizarUsuarioComponent]
    });
    fixture = TestBed.createComponent(VisualizarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
