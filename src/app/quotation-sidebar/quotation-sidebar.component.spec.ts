import { ComponentFixture, TestBed } from '@angular/core/testing';

import QuotationSidebarComponent from './quotation-sidebar.component';

describe('QuotationSidebarComponent', () => {
  let component: QuotationSidebarComponent;
  let fixture: ComponentFixture<QuotationSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuotationSidebarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuotationSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
