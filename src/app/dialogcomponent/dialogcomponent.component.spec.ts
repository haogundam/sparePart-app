import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogcomponentComponent } from './dialogcomponent.component';

describe('DialogcomponentComponent', () => {
  let component: DialogcomponentComponent;
  let fixture: ComponentFixture<DialogcomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogcomponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
