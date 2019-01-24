import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfpComponent} from './pdfp.component';

describe('PdfpComponent', () => {
  let component: PdfpComponent;
  let fixture: ComponentFixture<PdfpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
