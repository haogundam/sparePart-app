import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FailLoginComponent } from './fail-login.component';

describe('FailLoginComponent', () => {
  let component: FailLoginComponent;
  let fixture: ComponentFixture<FailLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FailLoginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FailLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
