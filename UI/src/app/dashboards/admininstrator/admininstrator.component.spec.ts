import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmininstratorComponent } from './admininstrator.component';

describe('AdmininstratorComponent', () => {
  let component: AdmininstratorComponent;
  let fixture: ComponentFixture<AdmininstratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmininstratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmininstratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
