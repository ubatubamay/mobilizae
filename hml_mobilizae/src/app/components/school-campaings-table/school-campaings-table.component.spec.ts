import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolCampaingsTableComponent } from './school-campaings-table.component';

describe('SchoolCampaingsTableComponent', () => {
  let component: SchoolCampaingsTableComponent;
  let fixture: ComponentFixture<SchoolCampaingsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolCampaingsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolCampaingsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
