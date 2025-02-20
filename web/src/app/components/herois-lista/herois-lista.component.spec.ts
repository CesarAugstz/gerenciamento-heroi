import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroisListaComponent } from './herois-lista.component';

describe('HeroisListaComponent', () => {
  let component: HeroisListaComponent;
  let fixture: ComponentFixture<HeroisListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroisListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroisListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
