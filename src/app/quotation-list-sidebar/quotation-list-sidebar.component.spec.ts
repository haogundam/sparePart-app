import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationListSidebarComponent } from './quotation-list-sidebar.component';

describe('QuotationListSidebarComponent', () => {
  let component: QuotationListSidebarComponent;
  let fixture: ComponentFixture<QuotationListSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuotationListSidebarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuotationListSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
