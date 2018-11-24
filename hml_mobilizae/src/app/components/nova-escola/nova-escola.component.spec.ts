import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaEscolaComponent } from './nova-escola.component';

describe('NovaEscolaComponent', () => {
  let component: NovaEscolaComponent;
  let fixture: ComponentFixture<NovaEscolaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovaEscolaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovaEscolaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
